import React from 'react';
// form
import { FormProvider as Form, FormProviderProps as FPProps } from 'react-hook-form';

// ----------------------------------------------------------------------

export interface FormProviderProps {
  children: React.ReactNode;
  methods: FPProps;
  onSubmit: React.FormEventHandler;
}

export default function FormProvider({ children, onSubmit, methods }: FormProviderProps) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
