import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const delayInput = form.querySelector('[name="delay"]');
    const stateInputs = form.querySelectorAll('[name="state"]');
    const selectedState = [...stateInputs].find(input => input.checked);

    const delay = parseInt(delayInput.value, 10);

    const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (selectedState.value === 'fulfilled') {
          resolve(`✅ Fulfilled promise in ${delay}ms`);
        } else {
          reject(`❌ Rejected promise in ${delay}ms`);
        }
      }, delay);
    });

    promise
      .then(result => {
        iziToast.success({
          icon: null,
          position: 'topRight',
          message: result,
          messageColor: 'white',
          backgroundColor: '#59A10D',
        });
      })
      .catch(error => {
        iziToast.error({
          icon: null,
          position: 'topRight',
          message: error,
          messageColor: 'white',
          backgroundColor: '#EF4040',
        });
      });
  });
});
