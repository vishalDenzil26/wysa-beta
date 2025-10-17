'use server'

import { getSecretValue } from '@/utilities/secrets'
export interface FormSubmissionData {
  field: string
  value: any
}

interface FormSubmissionRequest {
  form: string
  submissionData: FormSubmissionData[]
}

export async function handleSubmitForm(data: FormSubmissionRequest) {
  try {
    if (!data.form) {
      return {
        success: false,
        errors: [{ message: 'Form ID is required' }],
        status: 400,
      }
    }

    const secrets = await getSecretValue()

    const submission = await fetch(`${secrets.NEXT_PUBLIC_SERVER_URL}/api/form-submissions`, {
      body: JSON.stringify({
        form: data.form,
        submissionData: data.submissionData,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    return {
      success: true,
      message: 'Form submitted successfully',
      //   submission,
      status: 201,
    }
  } catch (error) {
    console.error('Error processing form submission:', error)

    return {
      success: false,
      errors: [{ message: 'Internal server error' }],
      status: 500,
    }
  }
}
