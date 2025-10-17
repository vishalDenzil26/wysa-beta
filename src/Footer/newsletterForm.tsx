'use client'
import { RightArrow } from '@/components/icons/right-arrow'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/cn'
// import { getSecretValue } from '@/utilities/secrets'
import type { EmailField, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import {
  FieldErrorsImpl,
  FieldValues,
  FormProvider,
  useForm,
  UseFormRegister,
} from 'react-hook-form'

const Email: React.FC<
  EmailField & {
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
    <>
      <Label className="text-muted-foreground" htmlFor={name}>
        {label}
      </Label>
      <div className="w-full min-w-2xl relative">
        <Input
          defaultValue={defaultValue}
          id={name}
          type="text"
          placeholder={placeholder}
          className={cn(
            errors[name] && 'border-error text-error !placeholder-error',
            'bg-muted rounded-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-0 placeholder:text-muted-foreground/50',
          )}
          {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required: requiredFromProps })}
        />
      </div>
    </>
  )
}

const fields = {
  email: Email,
}

interface Property {
  [key: string]: unknown
}

interface Data {
  [key: string]: Property | Property[]
}

type Props = {
  form: FormType
}

export const NewsLetterForm: React.FC<
  {
    id?: string
  } & Props
> = (props) => {
  const {
    form: formFromProps,
    form: { id: formID, confirmationType, redirect, submitButtonLabel, confirmationMessage } = {},
  } = props

  const formMethods = useForm()
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
        // const secrets = await getSecretValue()

        try {
          // test code start .......
          console.log(dataToSend)
          const getRandomInteger = () => {
            setHasSubmitted(false)
            return new Promise<number>((resolve) => {
              setTimeout(() => {
                const randomInt = Math.floor(Math.random() * 10) + 1
                resolve(randomInt)
              }, 2000) // 2-second delay
            })
          }

          const integer = await getRandomInteger()
          console.log(integer)
          clearTimeout(loadingTimerID)

          if (integer % 2 === 0) {
            setIsLoading(false)

            setError({
              message: 'Internal Server Error',
              status: '500',
            })

            return
          }
          // test code end .......

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

          // clearTimeout(loadingTimerID)

          // if (req.status >= 400) {
          //   setIsLoading(false)

          //   setError({
          //     message: res.errors?.[0]?.message || 'Internal Server Error',
          //     status: res.status,
          //   })

          //   return
          // }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className={cn()}>
      <FormProvider {...formMethods}>
        {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
        {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
        {hasSubmitted && !error && confirmationType === 'message' && (
          <RichText data={confirmationMessage} />
        )}
        <form
          id={formID}
          onSubmit={handleSubmit(onSubmit)}
          className="flex relative items-center border-b border-b-primary gap-x-3"
        >
          <div className="mb-0 flex-1">
            {formFromProps?.fields?.map((field) => {
              const Field: React.FC<any> = fields?.[field.blockType]
              if (Field) {
                return (
                  <div className="mb-6 last:mb-0" key={field.blockType}>
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
          <Button form={formID} type="submit" variant="secondary-ghost" className="space-x-2 mt-4">
            <span>{submitButtonLabel}</span>
            <RightArrow />
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
