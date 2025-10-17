import { Field } from 'payload'

export const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
}

export const label: Field = {
  name: 'label',
  type: 'text',
  label: 'Label',
  localized: true,
}

export const required: Field = {
  name: 'required',
  type: 'checkbox',
  label: 'Required',
}

export const width: Field = {
  name: 'width',
  type: 'number',
  label: 'Field Width (percentage)',
}
