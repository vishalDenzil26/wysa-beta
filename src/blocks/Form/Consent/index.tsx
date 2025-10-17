import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { useFormContext } from 'react-hook-form'

import { Checkbox as CheckboxUi } from '@/components/ui/checkbox'
import React from 'react'
import { Width } from '../Width'
import { Page } from '@/payload-types'
import { Field } from 'payload'
import { CMSLink } from '@/components/Link'

export type CustomConsentField = {
  blockName?: string
  blockType: 'consent'
  label: string
  name: string
  required?: boolean
  width?: number
  consentURL?: {
    link: {
      type?: ('reference' | 'custom') | null
      newTab?: boolean | null
      reference?: {
        relationTo: 'pages'
        value: string | Page
      } | null
      url?: string | null
      label?: string | null
      appearance?: 'secondary' | null
    }
  }
} & Partial<Field>

export const CustomConsent: React.FC<
  CustomConsentField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    getValues: any
    register: UseFormRegister<FieldValues>
    setValue: any
  }
> = ({ name, label, consentURL, register, required: requiredFromProps, width, errors }) => {
  const { setValue } = useFormContext()

  const props = register(name, {
    required: requiredFromProps ? 'This consent is required' : false,
    validate: requiredFromProps
      ? (value) => value === true || 'This consent is required'
      : undefined,
  })

  return (
    <Width width={width}>
      <div className="flex items-center gap-2">
        <CheckboxUi
          id={name}
          {...props}
          className={errors[name] && 'border-error text-error !placeholder-error'}
          onCheckedChange={(checked) => {
            setValue(name, checked, { shouldValidate: true })
          }}
        />
        <div className="flex items-center gap-x-1">
          <span className="text-muted-foreground text-xs">{label}</span>
          {consentURL && consentURL.link && <CMSLink {...consentURL.link} />}
        </div>
      </div>
    </Width>
  )
}
