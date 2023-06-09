import Toastify from 'toastify-js';

export const toastify = (message, type = 'success', duration = 3000) => {
    Toastify({
        text: message,
        duration: duration,
        close: true,
        gravity: 'top',
        position: 'center',
        style: {
            background: type === 'success' ? '#00b09b' : '#f44336',
            color: '#fff',
        },
        stopOnFocus: true,
        className: 'toastify',
    }).showToast();
};
