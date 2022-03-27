// @mui
import { Paper, PaperProps, IconButton } from '@mui/material';
// components
import Iconify from '../../../../../components/Iconify';

// ----------------------------------------------------------------------

interface ToolbarProps extends PaperProps {
  onRefresh?: () => void;
  [key: string]: any;
}

export default function Toolbar({ onRefresh, ...other }: ToolbarProps) {
  return (
    <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} {...other}>
      <IconButton onClick={onRefresh}>
        <Iconify icon={'eva:refresh-fill'} width={20} height={20} />
      </IconButton>
    </Paper>
  );
}
