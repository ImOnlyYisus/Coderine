import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'

export const useAuthStore = defineStore('user', () => {
    const user = ref('')
    const token = ref('')

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

    const register = (email: string, password: string) => {
        fetch('http://localhost:8000/sanctum/csrf-cookie', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            credentials: 'include'
        }).then(() => {
            fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            })
                .then((response) => {
                    console.log(response)
                    router.push('/login')
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    }

    const login = (email: string, password: string) => {
        fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then((response) => {
                return response.json()
            })
            .then(({ data }) => {
                const { user: userApi, token: tokenApi } = data
                user.value = userApi
                token.value = tokenApi

                //router.push('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const logout = () => {}

    return { user, token, login, logout, register, getAuthUser }
})
