import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputDatePickerRef = document.querySelector('#datetime-picker');
const btnStartRef = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

let timeDifference = 0;
let timerId = null;
let formatDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handleDateSelection(selectedDates[0]);
  },
};

btnStartRef.setAttribute('disabled', true);
flatpickr(inputDatePickerRef, options);
btnStartRef.addEventListener('click', startTimer);
window.addEventListener('keydown', handleResetTimer);

function handleDateSelection(selectedDate) {
  const currentDate = Date.now();
  if (selectedDate.getTime() < currentDate) {
    btnStartRef.setAttribute('disabled', true);
    return iziToast.error({
      title: 'Error',
      titleColor: 'white',
      message: 'Please choose a date in the future',
      backgroundColor: '#EF4040',
      messageColor: 'white',
      position: 'topRight',
    });
  }

  timeDifference = selectedDate.getTime() - currentDate;
  formatDate = convertMs(timeDifference);

  renderDate();
  btnStartRef.removeAttribute('disabled');
}

function startTimer() {
  btnStartRef.setAttribute('disabled', true);
  inputDatePickerRef.setAttribute('disabled', true);

  timerId = setInterval(() => {
    timeDifference -= 1000;

    if (timeDifference <= 0) {
      clearInterval(timerId);
      iziToast.success({ title: 'Success', message: 'Time end' });
    } else {
      formatDate = convertMs(timeDifference);
      renderDate();
    }
  }, 1000);
}

function handleResetTimer(e) {
  if (e.code === 'Escape' && timerId) {
    clearInterval(timerId);
    inputDatePickerRef.removeAttribute('disabled');
    btnStartRef.setAttribute('disabled', true);
    secondsRef.textContent = '00';
    minutesRef.textContent = '00';
    hoursRef.textContent = '00';
    daysRef.textContent = '00';
  }
}

function renderDate() {
  secondsRef.textContent = addLeadingZero(formatDate.seconds);
  minutesRef.textContent = addLeadingZero(formatDate.minutes);
  hoursRef.textContent = addLeadingZero(formatDate.hours);
  daysRef.textContent = addLeadingZero(formatDate.days);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}
