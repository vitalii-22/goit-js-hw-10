import iziToast from 'izitoast';

const form = document.querySelector('.form');
const input = document.querySelector('input');
const button = document.querySelector('button');

let formTime = 0;
let state = '';

form.addEventListener('input', event => {
  formTime = event.currentTarget.elements.delay.value;
});

form.addEventListener('submit', event => {
  event.preventDefault();
  input.value = '';
  const promise = time => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(`✅ Fulfilled promise in ${formTime}ms`);
        } else {
          reject(`❌ Rejected promise in ${formTime}ms`);
        }
      }, `${formTime}`);
    });
  };

  promise(formTime)
    .then(value => {
      iziToast.show({
        message: `✅ OK Fulfilled promise in ${formTime}ms`,
        color: '#59A10D',
        position: 'topRight',
        messageSize: '16px',
        messageColor: '#FFF',
        messageLineHeight: '24px',
      });
    })
    .catch(error => {
      iziToast.show({
        message: `❌ Error Rejected promise in ${formTime}ms`,
        color: '#EF4040',
        position: 'topRight',
        messageSize: '16px',
        messageColor: '#FFF',
        messageLineHeight: '24px',
      });
    });
});

form.addEventListener('change', event => {
  state = event.currentTarget.elements.state.value;
});
