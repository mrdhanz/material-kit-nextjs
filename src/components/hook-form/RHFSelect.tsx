// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, StandardTextFieldProps } from '@mui/material';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

export interface RHFSelectProps extends StandardTextFieldProps {
  name: string;
  children?: ReactNode;
  [key: string]: any;
}

export default function RHFSelect({ name, children, ...other }: RHFSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          {...other}
          select
        >
          {children}
        </TextField>
      )}
    />
  );
}
