// @mui
import { alpha } from '@mui/material/styles';
import { Box, Paper, Typography } from '@mui/material';
// utils
import { fData } from '../../utils/formatNumber';
import { FileRejection } from 'react-dropzone';

// ----------------------------------------------------------------------

export interface RejectionFilesProps {
  fileRejections?: FileRejection[];
}

export default function RejectionFiles({ fileRejections = [] }: RejectionFilesProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: 'error.light',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { webkitRelativePath, size } = file;

        return (
          <Box key={webkitRelativePath} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {webkitRelativePath} - {fData(size)}
            </Typography>

            {errors.map((error) => (
              <Typography key={error.code} variant="caption" component="p">
                - {error.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );
}
