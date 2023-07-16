import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('input');
const textareaEl = document.querySelector('textarea');

formEl.addEventListener('input', throttle(onInput, 500));
formEl.addEventListener('submit', onSubmit);

if (localStorage.getItem('feedback-form-state')) {
    const { email, message } = JSON.parse(
        localStorage.getItem('feedback-form-state')
    );

    inputEl.value = email;
    textareaEl.value = message;
}

function onInput(e) {
    const userData = { email: '', message: '' };
    if (e.target.nodeName === 'INPUT') {
        userData.email = e.target.value;
        userData.message = textareaEl.value;
    } else {
        userData.message = e.target.value;
        userData.email = inputEl.value;
    }

    localStorage.setItem('feedback-form-state', JSON.stringify(userData));
}

function onSubmit(e) {
    e.preventDefault();

    const { email, message } = e.currentTarget.elements;

    if (!email.value || !message.value) {
        alert('Всі поля повинні бути заповнені!');
        return;
    }

    console.log(JSON.parse(localStorage.getItem('feedback-form-state')));

    formEl.reset();

    localStorage.clear();
    // localStorage.removeItem('feedback-form-state');
}
