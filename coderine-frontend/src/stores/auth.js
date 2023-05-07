import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'

import InvalidCredentialsException from '../exceptions/invalid-credentials.exception'
import InvalidFieldsException from '../exceptions/invalid-fields.exception'

export const useAuthStore = defineStore('user', () => {
    const user = ref('')
    const token = ref('')
    const isAutheticated = ref(false)

    const getAuthUser = () => {
        if (!token.value) return

        fetch('http://localhost:8000/api/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token.value}`
            },
            credentials: 'include'
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const register = (user, t) => {
        return fetch('http://localhost:8000/sanctum/csrf-cookie', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            credentials: 'include'
        }).then(() => {
            return fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(user)
            })
                .then((response) => {
                    
                    return response.json()
                })
                .then(({errors}) => {
                    if(errors){
                        throw new InvalidFieldsException(t("errors.wrong-fields"))
                    }

                    router.push('/login')
                })
                .catch((error) => {
                    throw new InvalidFieldsException(error.message)
                })
        })
    }

    const login = (email, password) => {
        return fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then((response) => {
            if(response.status === 401){
                throw new InvalidCredentialsException('Invalid credentials')
            }
            return response.json()
        })
        .then(({ data }) => {
            const { user: userApi, token: tokenApi } = data
            user.value = userApi
            token.value = tokenApi
            isAutheticated.value = true
            router.push('/')
        })
        .catch(() => {
            throw new InvalidCredentialsException('Invalid credentials')
        })
    }

    const logout = () => {
        fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token.value}`
            },
            credentials: 'include'
        })
            .then((response) => {
                return response.json()
            })
            .then(() => {
                user.value = ''
                token.value = ''
                isAutheticated.value = false
                router.push('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return { user, token, isAutheticated, login, logout, register, getAuthUser }
})
