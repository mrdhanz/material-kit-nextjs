// @mui
import { Box, Paper, PaperProps, FormControlLabel, Switch, IconButton } from '@mui/material';
// components
import Iconify from '../../../../../components/Iconify';
import React from 'react';

// ----------------------------------------------------------------------

interface ToolbarProps extends PaperProps {
  isText?: boolean;
  isMulti?: boolean;
  onChangeText?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean)=> void;
  onChangeMulti?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean)=> void;
  onRefresh?: () => void;
  [key: string]: any;
};

export default function Toolbar({ isText, isMulti, onChangeText, onChangeMulti, onRefresh, ...other }: ToolbarProps) {
  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      {...other}
    >
      <FormControlLabel control={<Switch checked={isText} onChange={onChangeText} />} label="Text Object" />

      <Box sx={{ flexGrow: 1 }} />

      {!isText && (
        <FormControlLabel control={<Switch checked={isMulti} onChange={onChangeMulti} />} label="Multi Item" />
      )}

      <IconButton onClick={onRefresh}>
        <Iconify icon={'eva:refresh-fill'} width={20} height={20} />
      </IconButton>
    </Paper>
  );
}
