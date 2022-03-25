// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Switch, FormControlLabel, FormControlLabelProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface RHFSwitchProps extends FormControlLabelProps {
  name: string;
  [key: string]: any;
}

export default function RHFSwitch({ name, ...other }: RHFSwitchProps) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      {...other}
      control={
        <Controller name={name} control={control} render={({ field }) => <Switch {...field} checked={field.value} />} />
      }
    />
  );
}
