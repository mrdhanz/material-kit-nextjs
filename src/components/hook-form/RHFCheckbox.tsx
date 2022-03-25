// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Checkbox, FormGroup, FormControlLabel, FormControlLabelProps } from '@mui/material';
import React from 'react';

// ----------------------------------------------------------------------

export interface RHFCheckboxProps extends FormControlLabelProps{
  name: string;
  [key: string]: any;
};

export function RHFCheckbox({ name, ...other }: RHFCheckboxProps) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      {...other}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Checkbox {...field} checked={field.value} />}
        />
      }
    />
  );
}

// ----------------------------------------------------------------------

export interface RHFMultiCheckboxProps {
  name: string;
  options: (string | number | React.ReactElement<any, string | React.JSXElementConstructor<any>>)[];
  [key: string]: any;
};

export function RHFMultiCheckbox({ name, options, ...other }: RHFMultiCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option : string | number | React.ReactElement<any, string | React.JSXElementConstructor<any>>) =>
          field.value.includes(option) ? field.value.filter((value: string | number | React.ReactElement<any, string | React.JSXElementConstructor<any>>) => value !== option) : [...field.value, option];

        return (
          <FormGroup>
            {options.map((option, key) => (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    checked={field.value.includes(option)}
                    onChange={() => field.onChange(onSelected(option))}
                  />
                }
                label={option}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}
