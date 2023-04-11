import { useEffect, useMemo, useState } from 'react'

export const useForm = (initialForm = {}, formValidations = {}) => {
    const [formState, setFormState] = useState(initialForm)
    const [formValidation, setFormValidation] = useState({})
    const isFormValid = useMemo(() => {
        for (const key in formValidation) {
            if (formValidation[key] !== null) return false
        }

        return true
    }, [formValidation])

    const handleInputChange = ({ target: { type, name, value, checked } }) => setFormState({ ...formState, [name]: type === 'checkbox' ? checked : value })

    const resetForm = () => setFormState(initialForm)

    const createValidators = () => {
        const formCheckedValues = {}

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage = 'Este campo es requerido !'] = formValidations[formField]

            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage
        }

        setFormValidation(formCheckedValues)
    }

    useEffect(() => {
        createValidators()
    }, [formState])

    useEffect(() => {
        setFormState(initialForm)
    }, [initialForm])

    return {
        ...formState,
        formState,
        handleInputChange,
        resetForm,
        ...formValidation,
        isFormValid,
    }
}