import { useAuthStore } from '@/stores/auth';
import { getStorage } from '../plugins/storage';

export default function checkStorage() {
    const token = getStorage('token');
    const user = getStorage('user');

    if (token && user) {
        useAuthStore().token = token;
        useAuthStore().user = user;
        useAuthStore().isAutheticated = true;
    }
}
