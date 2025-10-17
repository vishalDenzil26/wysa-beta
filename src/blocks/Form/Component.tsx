'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'

import { buildInitialFormState } from './buildInitialFormState'
import { fields } from './fields'
import { cn } from '@/utilities/cn'
import { handleSubmitForm } from '@/app/(frontend)/lib/api/form-submissions'

export type Value = unknown

export interface Property {
  [key: string]: Value
}

export interface Data {
  [key: string]: Property | Property[]
}

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  colorVariant: 'primary' | 'secondary'
  enablePrivacyPolicyAgreement: boolean
  beforePrivacyPolicyLink?: string
  introContent?: {
    [k: string]: unknown
  }[]
}

const colorVariants = {
  primary: {
    backgroundColor: 'bg-primary-foreground',
  },
  secondary: {
    backgroundColor: 'bg-secondary-foreground',
  },
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    colorVariant,
  } = props

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: Data) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          // const secrets = await getSecretValue()
          // const req = await fetch(`${secrets.NEXT_PUBLIC_SERVER_URL}/api/form-submissions`, {
          //   body: JSON.stringify({
          //     form: formID,
          //     submissionData: dataToSend,
          //   }),
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   method: 'POST',
          // })
          // const res = await req.json()

          const result = await handleSubmitForm({
            form: formID!,
            submissionData: dataToSend,
          })

          clearTimeout(loadingTimerID)

          // if (req.status >= 400) {
          //   setIsLoading(false)

          //   setError({
          //     message: res.errors?.[0]?.message || 'Internal Server Error',
          //     status: res.status,
          //   })

          //   return
          // }

          if (!result.success) {
            setIsLoading(false)

            setError({
              message: result.errors?.[0]?.message || 'Internal Server Error',
              status: result.status?.toString(),
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          clearTimeout(loadingTimerID)
          setIsLoading(false)
          setError({
            message: 'Form submission failed. Please try again later.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="px-6 lg:px-0">
      <div
        className={cn(
          'container lg:max-w-[48rem] py-12 px-20 rounded-[24px] relative mb-20',
          colorVariants[colorVariant].backgroundColor,
        )}
      >
        <FormProvider {...formMethods}>
          {enableIntro && introContent && !hasSubmitted && (
            <RichText
              className="mb-6 text-primary prose-h3:mb-0 max-w-sm mx-0"
              // @ts-ignore
              data={introContent}
              enableGutter={false}
            />
          )}
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <RichText data={confirmationMessage} />
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6 last:mb-0">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    const Field: React.FC<any> = fields?.[field.blockType]

                    // @ts-expect-error TODO:Add custom types
                    if (Field && field.blockType !== 'customConsent') {
                      return (
                        <div className="mb-6 last:mb-0" key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between w-full">
                <div>
                  {formFromProps &&
                    formFromProps.fields &&
                    formFromProps.fields?.map((field, index) => {
                      const Field: React.FC<any> = fields?.[field.blockType]

                      // @ts-expect-error TODO:Add custom types
                      if (Field && field.blockType === 'customConsent') {
                        return (
                          <div className="mb-6 last:mb-0" key={index}>
                            <Field
                              form={formFromProps}
                              // @ts-expect-error TODO:Add custom types
                              {...field}
                              {...formMethods}
                              control={control}
                              errors={errors}
                              register={register}
                            />
                          </div>
                        )
                      }
                      return null
                    })}
                </div>
                <Button form={formID} type="submit" variant="secondary">
                  {submitButtonLabel}
                </Button>
              </div>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
