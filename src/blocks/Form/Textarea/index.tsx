import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    placeholder?: string
    register: UseFormRegister<FieldValues>
    rows?: number
  }
> = ({
  name,
  defaultValue,
  placeholder,
  errors,
  label,
  register,
  required: requiredFromProps,
  rows = 7,
  width,
}) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>

      <TextAreaComponent
        defaultValue={defaultValue}
        id={name}
        placeholder={placeholder}
        rows={rows}
        className={errors[name] && 'border-error text-error !placeholder-error'}
        {...register(name, { required: requiredFromProps })}
      />
    </Width>
  )
}
