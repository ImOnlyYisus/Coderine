import Swal from 'sweetalert2';

export const confirmCancel = (title, text) => {
    return Swal.fire({
        title: title,
        text: text,
        imageUrl: '/images/logo-dark.png',
        imageWidth: 400,
        imageAlt: 'Logo coderine',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    });
};

export const saveAlert = (title, text, save) => {
    return Swal.fire({
        title: title,
        text: text,
        imageUrl: '/images/logo-dark.png',
        imageWidth: 400,
        imageAlt: 'Logo coderine',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'On',
        },
        showCancelButton: true,
        confirmButtonText: save,
    });
};
