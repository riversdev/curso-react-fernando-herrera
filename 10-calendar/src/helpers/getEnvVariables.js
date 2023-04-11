// export const getEnvVariables = () => {
//     import.meta.env

//     return {
//         ...import.meta.env
//     }
// }

export const getEnvVariables = () => ({
    VITE_API_URL: import.meta.env.VITE_API_URL
})