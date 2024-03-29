import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const button = document.querySelector('button[data-start]');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');
const input = document.querySelector('#datetime-picker');

let userSelectedDate = 0;
button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = new Date();
    if (date > selectedDates[0]) {
      iziToast.show({
        message: 'Please choose a date in the future',
        color: '#EF4040',
        position: 'topRight',
        messageSize: '16px',
        messageColor: '#FFF',
        messageLineHeight: '24px',
      });

      button.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      button.disabled = false;
    }
  },
};

flatpickr('#datetime-picker[type = text]', options);

function start() {
  const intervalId = setInterval(() => {
    input.disabled = true;
    button.disabled = true;
    const startTime = new Date();
    const diff = userSelectedDate - startTime;
    const time = convertMs(diff);

    function onTick({ days, hours, minutes, seconds }) {
      spanDays.textContent = addLeadingZero(days);
      spanHours.textContent = addLeadingZero(hours);
      spanMinutes.textContent = addLeadingZero(minutes);
      spanSeconds.textContent = addLeadingZero(seconds);
    }
    onTick(time);

    if (diff < 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
}

button.addEventListener('click', start);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

console.log(convertMs(0));
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
