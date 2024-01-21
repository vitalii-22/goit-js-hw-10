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
  const promise = () => {
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
        message: 'Please choose a date in the future',
        color: '#EF4040',
        position: 'topRight',
        messageSize: '16px',
        messageColor: '#FFF',
        messageLineHeight: '24px',
      });
    })
    .catch(error => {
      console.log(error);
    });
});

form.addEventListener('change', event => {
  state = event.currentTarget.elements.state.value;
});
