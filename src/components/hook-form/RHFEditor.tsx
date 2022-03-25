// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText } from '@mui/material';
//
import Editor, { EditorProps } from '../editor';

// ----------------------------------------------------------------------

export interface RHFEditorProps extends EditorProps {
  name: string;
  [key: string]: any;
};

export default function RHFEditor({ name, ...other }: RHFEditorProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Editor
          onChange={field.onChange}
          error={!!error}
          helperText={
            <FormHelperText error sx={{ px: 2, textTransform: 'capitalize' }}>
              {error?.message}
            </FormHelperText>
          }
          {...other}
          id={name}
          value={field.value}
        />
      )}
    />
  );
}
