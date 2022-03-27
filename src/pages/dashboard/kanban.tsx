import React, { useEffect } from 'react';
// @mui
import { Container, Stack } from '@mui/material';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBoard, persistColumn, persistCard, KanbanResponse } from '../../redux/slices/kanban';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { SkeletonKanbanColumn } from '../../components/skeleton';
// sections
import { KanbanColumn, KanbanColumnAdd } from '../../sections/@dashboard/kanban';

// ----------------------------------------------------------------------

Kanban.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Kanban() {
  const dispatch = useDispatch();
  //@ts-ignore
  const { board } = useSelector((state) => state.kanban as KanbanResponse);

  useEffect(() => {
    dispatch(getBoard());
  }, [dispatch]);

  const onDragEnd = (result: DropResult) => {
    // Reorder card
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    if (type === 'column') {
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      dispatch(persistColumn(newColumnOrder));
      return;
    }

    const start = board.columns[parseInt(source.droppableId)];
    const finish = board.columns[parseInt(destination.droppableId)];

    if (start.id === finish.id) {
      const updatedCardIds = [...start.cardIds];
      updatedCardIds.splice(source.index, 1);
      updatedCardIds.splice(destination.index, 0, draggableId);

      const updatedColumn = {
        ...start,
        cardIds: updatedCardIds,
      };

      dispatch(
        persistCard({
          ...board.columns,
          [updatedColumn.id]: updatedColumn,
        })
      );
      return;
    }

    const startCardIds = [...start.cardIds];
    startCardIds.splice(source.index, 1);
    const updatedStart = {
      ...start,
      cardIds: startCardIds,
    };

    const finishCardIds = [...finish.cardIds];
    finishCardIds.splice(destination.index, 0, draggableId);
    const updatedFinish = {
      ...finish,
      cardIds: finishCardIds,
    };

    dispatch(
      persistCard({
        ...board.columns,
        [updatedStart.id]: updatedStart,
        [updatedFinish.id]: updatedFinish,
      })
    );
  };

  return (
    <Page title="Kanban" sx={{ height: 1 }}>
      <Container maxWidth={false} sx={{ height: 1 }}>
        <HeaderBreadcrumbs
          heading="Kanban"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            { name: 'Kanban' },
          ]}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
              <Stack
                {...provided.droppableProps}
                ref={provided.innerRef}
                direction="row"
                alignItems="flex-start"
                spacing={3}
                sx={{ height: 'calc(100% - 32px)', overflowY: 'hidden' }}
              >
                {!board.columnOrder.length ? (
                  <SkeletonKanbanColumn />
                ) : (
                  board.columnOrder.map((columnId, index) => (
                    <KanbanColumn index={index} key={columnId} column={board.columns[parseInt(columnId)]} />
                  ))
                )}

                {provided.placeholder}
                <KanbanColumnAdd />
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </Page>
  );
}
