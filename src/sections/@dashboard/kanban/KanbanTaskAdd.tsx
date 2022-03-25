import { format, isSameDay, isSameMonth } from 'date-fns';
import React, { useState } from 'react';
// @mui
import {
  Box,
  Paper,
  Stack,
  Tooltip,
  Checkbox,
  IconButton,
  OutlinedInput,
  ClickAwayListener,
  SxProps,
  TextField,
} from '@mui/material';
import { MobileDateRangePicker } from '@mui/lab';
// utils
import uuidv4 from '../../../utils/uuidv4';
// components
import Iconify from '../../../components/Iconify';
import { RangeInput } from '@mui/lab/DateRangePicker/RangeTypes';

// ----------------------------------------------------------------------

const defaultTask = {
  attachments: [],
  comments: [],
  description: '',
  due: [null, null],
  assignee: [],
};

export interface KanbanTaskAddProps {
  onAddTask?: (task: any) => void;
  onCloseAddTask?: () => void;
}

export default function KanbanTaskAdd({ onAddTask, onCloseAddTask }: KanbanTaskAddProps) {
  const [name, setName] = useState('');
  const [completed, setCompleted] = useState(false);
  const {
    dueDate,
    startTime,
    endTime,
    isSameDays,
    isSameMonths,
    onChangeDueDate,
    openPicker,
    onOpenPicker,
    onClosePicker,
  } = useDatePicker({
    date: [null, null],
  });

  const handleKeyUpAddTask = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (name.trim() !== '' && onAddTask) {
        onAddTask({ ...defaultTask, id: uuidv4(), name, due: dueDate, completed });
      }
    }
  };

  const handleClickAddTask = () => {
    if (name && onAddTask) {
      onAddTask({ ...defaultTask, id: uuidv4(), name, due: dueDate, completed });
    }
    onCloseAddTask ? onCloseAddTask() : null;
  };

  const handleChangeCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(event.target.checked);
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAddTask}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <OutlinedInput
            multiline
            size="small"
            placeholder="Task name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyUp={handleKeyUpAddTask}
            sx={{
              '& input': { p: 0 },
              '& fieldset': { borderColor: 'transparent !important' },
            }}
          />

          <Stack direction="row" justifyContent="space-between">
            <Tooltip title="Mark task complete">
              <Checkbox
                disableRipple
                checked={completed}
                onChange={handleChangeCompleted}
                icon={<Iconify icon={'eva:radio-button-off-outline'} />}
                checkedIcon={<Iconify icon={'eva:checkmark-circle-2-outline'} />}
              />
            </Tooltip>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <Tooltip title="Assign this task">
                <IconButton size="small">
                  <Iconify icon={'eva:people-fill'} width={20} height={20} />
                </IconButton>
              </Tooltip>

              {startTime && endTime ? (
                <DisplayTime
                  startTime={startTime}
                  endTime={endTime}
                  isSameDays={isSameDays}
                  isSameMonths={isSameMonths}
                  onOpenPicker={onOpenPicker}
                />
              ) : (
                <Tooltip title="Add due date">
                  <IconButton size="small" onClick={onOpenPicker}>
                    <Iconify icon={'eva:calendar-fill'} width={20} height={20} />
                  </IconButton>
                </Tooltip>
              )}

              <MobileDateRangePicker
                open={openPicker}
                onClose={onClosePicker}
                onOpen={onOpenPicker}
                value={dueDate}
                onChange={onChangeDueDate}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </React.Fragment>
                )}
              />
            </Stack>
          </Stack>
        </Paper>
      </ClickAwayListener>
    </>
  );
}

// ----------------------------------------------------------------------

export function useDatePicker({ date }: { date: RangeInput<Date> }) {
  const [dueDate, setDueDate] = useState<RangeInput<Date>>(date);

  const [openPicker, setOpenPicker] = useState(false);

  const startTime = dueDate[0] || 0;

  const endTime = dueDate[1] || 0;

  const isSameDays = isSameDay(new Date(startTime), new Date(endTime));

  const isSameMonths = isSameMonth(new Date(startTime), new Date(endTime));

  const handleChangeDueDate = (newValue: RangeInput<Date>) => {
    setDueDate(newValue);
  };

  const handleOpenPicker = () => {
    setOpenPicker(true);
  };

  const handleClosePicker = () => {
    setOpenPicker(false);
  };

  return {
    dueDate,
    startTime,
    endTime,
    isSameDays,
    isSameMonths,
    onChangeDueDate: handleChangeDueDate,
    openPicker,
    onOpenPicker: handleOpenPicker,
    onClosePicker: handleClosePicker,
  };
}

// ----------------------------------------------------------------------

export interface DisplayTimeProps {
  isSameDays?: boolean;
  isSameMonths?: boolean;
  onOpenPicker?: () => void;
  startTime: string | number | Date;
  endTime: string | number | Date;
  sx?: SxProps;
}

export function DisplayTime({ startTime, endTime, isSameDays, isSameMonths, onOpenPicker, sx }: DisplayTimeProps) {
  const style = {
    typography: 'caption',
    cursor: 'pointer',
    '&:hover': { opacity: 0.72 },
  };

  if (isSameMonths) {
    return (
      <Box onClick={onOpenPicker} sx={{ ...style, ...sx }}>
        {isSameDays
          ? format(new Date(endTime), 'dd MMM')
          : `${format(new Date(startTime), 'dd')} - ${format(new Date(endTime), 'dd MMM')}`}
      </Box>
    );
  }
  return (
    <Box onClick={onOpenPicker} sx={{ ...style, ...sx }}>
      {format(new Date(startTime), 'dd MMM')} - {format(new Date(endTime), 'dd MMM')}
    </Box>
  );
}
