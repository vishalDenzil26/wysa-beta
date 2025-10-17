import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Width } from '../Width'

export const Text: React.FC<
  TextField & {
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
      <div className="flex items-center justify-between w-full mb-1">
        <Label htmlFor={name}>{label}</Label>
        {!requiredFromProps && <span className="text-primary text-xs">Optional</span>}
      </div>
      <Input
        defaultValue={defaultValue}
        id={name}
        type="text"
        placeholder={placeholder}
        className={errors[name] && 'border-error text-error !placeholder-error'}
        {...register(name, { required: requiredFromProps })}
      />
    </Width>
  )
}
