import type { Control, FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Controller } from 'react-hook-form'

import { Checkbox as CheckboxUi } from '@/components/ui/checkbox'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
import { Field } from 'payload'
import { Label } from '@/components/ui/label'

export type CustomMultiCheckboxesField = {
  blockName?: string
  blockType: 'multiCheckboxes'
  label: string
  name: string
  required?: boolean
  width?: number
  checkboxes: {
    name: string
    label: string
  }[]
} & Partial<Field>

export const CustomMultiCheckboxes: React.FC<
  CustomMultiCheckboxesField & {
    control: Control<FieldValues, any>
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    getValues: any
    register: UseFormRegister<FieldValues>
    setValue: any
  }
> = ({
  name,
  errors,
  label,
  checkboxes,
  register,
  required: requiredFromProps,
  width,
  control,
}) => {
  const { required } = register(name, { required: requiredFromProps })

  return (
    <Width width={width}>
      <Label>{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          const controlledValue = checkboxes.find((t) => t.label === value)
          return (
            <div className="flex flex-col gap-y-2.5 items-start justify-start">
              {checkboxes.map((checkbox, id) => {
                return (
                  <div className="flex items-center gap-2" key={id}>
                    <CheckboxUi
                      id={checkbox.name}
                      checked={checkbox.name === controlledValue?.name}
                      className={errors[name] && 'border-2 !border-error text-error'}
                      onCheckedChange={(checked) => {
                        onChange(checked ? checkbox.label : '')
                      }}
                    />
                    <span className="text-primary text-xs">{checkbox.label}</span>
                  </div>
                )
              })}
            </div>
          )
        }}
        rules={{ required }}
      />
    </Width>
  )
}
