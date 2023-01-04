import { useState } from 'react'

export const useForm = (initialForm = {}) => {
    const [formState, setFormState] = useState(initialForm)

    const handleInputChange = ({ target: { type, name, value, checked } }) => setFormState({ ...formState, [name]: type === 'checkbox' ? checked : value })

    const resetForm = () => setFormState(initialForm)

    return {
        ...formState,
        formState,
        handleInputChange,
        resetForm,
    }
}