const modalForm = document.querySelector('.modal-form');
const modalFormEmail = document.querySelector('#user-email');
const modalFormUrl = document.querySelector('#user-url');
const modalFormInputs = document.querySelectorAll('input');
const modalFormBtn = document.querySelector('.modal-send-btn');

const handleEmailvalidation = (e) => {
  let isValid = false;
  const emailRegex = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  );
  if (!emailRegex.test(modalFormEmail.value) && modalFormEmail.value !== '') {
    e.target.classList.add('error');
    e.target.nextElementSibling.classList.remove('hide');
    isValid = false;
  } else if (emailRegex.test(modalFormEmail.value)) {
    e.target.classList.remove('error');
    e.target.nextElementSibling.classList.add('hide');
    isValid = true;
  }
  return isValid;
};

const handleUrlvalidation = (e) => {
  let isValid = false;
  const urlRegex = /^https:\/\//;
  if (!urlRegex.test(modalFormUrl.value) && modalFormUrl.value) {
    modalFormUrl.classList.add('error');
    modalFormUrl.nextElementSibling.classList.remove('hide');
    isValid = false;
  } else if (urlRegex.test(modalFormUrl.value)) {
    modalFormUrl.classList.remove('error');
    modalFormUrl.nextElementSibling.classList.add('hide');
    isValid = true;
  }
  return isValid;
};

const activateBtn = (e) => {
  if (handleEmailvalidation(e) && handleUrlvalidation(e) && e.target.value) {
    modalFormBtn.disabled = false;
  } else {
    modalFormBtn.disabled = true;
  }
};

const handleSubmitForm = (e) => {
  e.preventDefault();

  const urlValue = modalFormUrl.value;

  fetch(urlValue, {
    method: 'POST',
    body: new FormData(e.target.form),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = 'https://payproglobal.com';
        e.target.form.reset();
        modalFormEmail.setCustomValidity('');
        modalFormUrl.setCustomValidity('');
        modalFormBtn.disabled = true;
      } else {
        throw new Error('Bad response');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      modalFormBtn.disabled = true;
    });
  modalForm.reset();
};

modalFormInputs.forEach((el) => {
  el.addEventListener('blur', activateBtn);
});

modalFormBtn.addEventListener('click', handleSubmitForm);
