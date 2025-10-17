import { Checkbox } from './Checkbox'
import { CustomConsent } from './Consent'
import { Country } from './Country'
import { CustomDatePicker } from './DatePicker'
import { Email } from './Email'
import { Message } from './Message'
import { CustomMultiCheckboxes } from './MultiCheckboxes'
import { Number } from './Number'
import { Select } from './Select'
import { State } from './State'
import { Text } from './Text'
import { Textarea } from './Textarea'
import { Tel } from './Tel'

export const fields = {
  checkbox: Checkbox,
  country: Country,
  email: Email,
  message: Message,
  number: Number,
  select: Select,
  state: State,
  text: Text,
  textarea: Textarea,
  // CUSTOM BUILD FIELDS
  customDatePicker: CustomDatePicker,
  customConsent: CustomConsent,
  customMultiCheckboxes: CustomMultiCheckboxes,
  tel: Tel,
}
