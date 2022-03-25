// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText } from '@mui/material';
//
import { UploadAvatar, UploadSingleFile, UploadMultiFile } from '../upload';
import { UploadSingleFileProps } from '../upload/UploadSingleFile';
import { UploadMultiFileProps } from '../upload/UploadMultiFile';

// ----------------------------------------------------------------------

export interface RHFUploadAvatarProps {
  name: string;
  [key: string]: any;
}

export function RHFUploadAvatar({ name, ...other }: RHFUploadAvatarProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <div>
            <UploadAvatar error={checkError} {...other} file={field.value} />
            {checkError && (
              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {error.message}
              </FormHelperText>
            )}
          </div>
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

export interface RHFUploadSingleFileProps extends UploadSingleFileProps {
  name: string;
  [key: string]: any;
}

export function RHFUploadSingleFile({ name, ...other }: RHFUploadSingleFileProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <UploadSingleFile
            accept="image/*"
            file={field.value}
            error={checkError}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

export interface RHFUploadMultiFileProps extends UploadMultiFileProps {
  name: string;
}

export function RHFUploadMultiFile({ name, ...other }: RHFUploadMultiFileProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && field.value?.length === 0;

        return (
          <UploadMultiFile
            accept="image/*"
            files={field.value}
            error={checkError}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error?.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    />
  );
}
