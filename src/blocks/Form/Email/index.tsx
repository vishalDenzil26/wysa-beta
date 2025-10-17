import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Width } from '../Width'

export const Email: React.FC<
  EmailField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    placeholder?: string

    register: UseFormRegister<FieldValues>
  }
> = ({
  name,
  defaultValue,
  placeholder,
  errors,
  label,
  register,
  required: requiredFromProps,
  width,
}) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        defaultValue={defaultValue}
        id={name}
        type="text"
        placeholder={placeholder}
        className={errors[name] && 'border-error text-error !placeholder-error'}
        {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required: requiredFromProps })}
      />
    </Width>
  )
}
