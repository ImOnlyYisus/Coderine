import { defineStore } from 'pinia';
import { useAuthStore } from './auth';
import { ref } from 'vue';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useComponentsStore = defineStore('components', () => {
    const uuid = ref('');
    const allComponents = ref([]);

    const saveComponent = (component) => {
        return fetch(`${BACKEND_URL}/api/components`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${useAuthStore().token}`,
            },
            credentials: 'include',
            body: JSON.stringify(component),
        })
            .then((response) => {
                if (response.status === 500) {
                    throw new Error('Validation failed');
                }
                return response.json();
            })
            .then((data) => {
                getAllComponents();
                if (data.errors) {
                    throw new Error(data.errors);
                }
            })
            .catch((error) => {
                throw new Error(error);
            });
    };

    const updateComponent = (component) => {
        return fetch(`${BACKEND_URL}/api/components/${component.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${useAuthStore().token}`,
            },
            credentials: 'include',
            body: JSON.stringify(component),
        })
            .then((response) => {
                return response.json();
            })
            .then(() => {
                getAllComponents();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getComponentById = (id) => {
        uuid.value = id;
        return fetch(`${BACKEND_URL}/api/components${uuid.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${useAuthStore().token}`,
            },
            credentials: 'include',
        })
            .then((response) => {
                if (response.status === 404) {
                    throw new Error('Validation failed');
                }
                return response.json();
            })
            .then(({ data }) => {
                return data.component;
            })
            .catch((error) => {
                throw new Error(error);
            });
    };

    const getAllComponents = () => {
        return fetch(`${BACKEND_URL}/api/components`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${useAuthStore().token}`,
            },
            credentials: 'include',
        })
            .then((response) => {
                return response.json();
            })
            .then(({ data }) => {
                allComponents.value = data.components;
                return data.components;
            })
            .catch((error) => {
                throw new Error(error);
            });
    };

    const likeComponent = (likeComponent) => {
        return fetch(`${BACKEND_URL}/api/components/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${useAuthStore().token}`,
            },
            credentials: 'include',
            body: JSON.stringify(likeComponent),
        })
            .then((response) => {
                return response.json();
            })
            .then(({ data }) => {
                return data.component;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const postComment = (newMessage) => {
        return fetch(`${BACKEND_URL}/api/components/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${useAuthStore().token}`,
            },
            credentials: 'include',
            body: JSON.stringify(newMessage),
        })
            .then((response) => {
                return response.json();
            })
            .then(({ data }) => {
                return data.component;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return {
        saveComponent,
        getComponentById,
        updateComponent,
        getAllComponents,
        allComponents,
        likeComponent,
        postComment,
    };
});
