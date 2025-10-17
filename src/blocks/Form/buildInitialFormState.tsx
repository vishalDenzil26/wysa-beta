import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'
import type { CustomDatePickerField } from './DatePicker'
import { CustomConsentField } from './Consent'
import { CustomMultiCheckboxesField } from './MultiCheckboxes'
import { TelFieldBlock } from './Tel'

type ModifiedFormFieldBlock =
  | CustomDatePickerField
  | CustomConsentField
  | CustomMultiCheckboxesField
  | FormFieldBlock
  | TelFieldBlock

export const buildInitialFormState = (fields: ModifiedFormFieldBlock[]) => {
  return fields?.reduce((initialSchema, field) => {
    if (field.blockType === 'checkbox') {
      return {
        ...initialSchema,
        [field.name]: field.defaultValue,
      }
    }
    if (field.blockType === 'country') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'email') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'text') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'select') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'state') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'datepicker') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'consent') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'multiCheckboxes') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'tel') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
  }, {})
}
