import {
  useFormContext,
  type FieldErrorsImpl,
  type FieldValues,
  type UseFormRegister,
} from 'react-hook-form'

import { Label } from '@/components/ui/label'
import React, { useState } from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
import { Calendar } from '@/components/ui/calendar'
import { Field } from 'payload'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/utilities/cn'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export type CustomDatePickerField = {
  blockName?: string
  blockType: 'datepicker'
  defaultValue?: Date
  label?: string
  name: string
  required?: boolean
  width?: number
} & Partial<Field>

export const CustomDatePicker: React.FC<
  CustomDatePickerField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
    placeholder?: string
  }
> = ({ name, placeholder, errors, label, register, required: requiredFromProps, width }) => {
  const [currentDate, setCurrentDate] = useState<Date>()
  const props = {
    ...register(name, {
      required: requiredFromProps,
    }),
  }

  const { setValue } = useFormContext()

  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-normal  text-left text-sm rounded-[8px] px-4 bg-white relative',
              errors[name] && 'border-error text-error !placeholder-error',
            )}
          >
            {!currentDate && (
              <span className="text-muted-foreground opacity-90 font-sans font-normal">
                {placeholder}
              </span>
            )}
            <CalendarIcon className="mr-2 h-4 w-4 text-secondary float-end absolute top-1/2 -translate-y-1/2 right-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 rounded-2xl">
          <div className="w-max">
            <Calendar
              id={name}
              mode={'single'}
              selected={currentDate}
              onSelect={(day) => {
                setValue(name, new Date(day!).toLocaleDateString())
                setCurrentDate(day)
              }}
              {...props}
            />
          </div>
        </PopoverContent>
      </Popover>
    </Width>
  )
}
