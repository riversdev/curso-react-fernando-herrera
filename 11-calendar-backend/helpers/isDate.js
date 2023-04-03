import { isValid } from 'date-fns'

export const isDate = (value, { req, location, path }) => {
    if (!value) return false

    return isValid(new Date(value))
}