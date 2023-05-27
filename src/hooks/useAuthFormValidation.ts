import { useState } from 'react'

type FormValues<T> = {
  [K in keyof T]: string
}

type FormErrors<T> = Partial<FormValues<T>>

type ValidationRules<T> = {
  [K in keyof T]: (value: string) => string | null
}

const useAuthFormValidation = <T>(validationRules: ValidationRules<T>) => {
  const [formValues, setFormValues] = useState<FormValues<T>>(
    {} as FormValues<T>
  )
  const [errors, setErrors] = useState<FormErrors<T>>({} as FormErrors<T>)

  const handleChange = (fieldName: keyof T) => (value: string) => {
    setFormValues((prevValues) => ({ ...prevValues, [fieldName]: value }))
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: undefined }))
  }

  const validateForm = () => {
    let formIsValid = true
    const newErrors: FormErrors<T> = {} as FormErrors<T>

    for (const fieldName in validationRules) {
      const validationRule = validationRules[fieldName]
      const value = formValues[fieldName]
      const error = validationRule(value)

      if (error) {
        newErrors[fieldName] = error
        formIsValid = false
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }))
    return formIsValid
  }

  return {
    formValues,
    errors,
    handleChange,
    validateForm,
  }
}

export default useAuthFormValidation
