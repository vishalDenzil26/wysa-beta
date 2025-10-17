import type { TextField } from '@payloadcms/plugin-form-builder/types'
import { Field } from 'payload'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export type TelFieldBlock = {
  blockName?: string
  blockType: 'tel'
  label: string
  name: string
  required?: boolean
  width?: number
  placeholder?: string
  defaultValue?: string
} & Partial<Field>

export const Tel: React.FC<
  TelFieldBlock & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required: requiredFromProps,
  width,
  placeholder,
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
        type="number"
        placeholder={placeholder}
        className={`${errors[name] && 'border-error text-error !placeholder-error'} no-spinner`}
        {...register(name, {
          required: requiredFromProps,
          pattern: {
            value: /^\+?[1-9]\d{6,14}$/,
            message: 'Please enter a valid mobile number',
          },
        })}
      />
    </Width>
  )
}
