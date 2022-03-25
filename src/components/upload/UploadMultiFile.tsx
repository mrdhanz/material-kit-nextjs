import { useDropzone, DropzoneOptions } from 'react-dropzone';
// @mui
import { styled } from '@mui/material/styles';
import { Box, SxProps } from '@mui/material';
//
import BlockContent from './BlockContent';
import RejectionFiles from './RejectionFiles';
import MultiFilePreview from './MultiFilePreview';
import { FileUpload } from './types';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
}));

// ----------------------------------------------------------------------

export interface UploadMultiFileProps extends DropzoneOptions {
  error?: boolean;
  showPreview?: boolean;
  files?: (string | FileUpload)[];
  onRemove?: (value: string | FileUpload) => void;
  onRemoveAll?: () => void;
  helperText?: ReactNode;
  sx: SxProps;
  [key: string]: any;
}

export default function UploadMultiFile({
  error,
  showPreview = false,
  files = [],
  onRemove,
  onRemoveAll,
  helperText,
  sx,
  ...other
}: UploadMultiFileProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    ...other,
  });

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter',
          }),
        }}
      >
        <input {...getInputProps()} />

        <BlockContent />
      </DropZoneStyle>

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

      <MultiFilePreview files={files} showPreview={showPreview} onRemove={onRemove} onRemoveAll={onRemoveAll} />

      {helperText && helperText}
    </Box>
  );
}
