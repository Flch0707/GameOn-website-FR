function el(el) {
  return el ? document.querySelector(el) : null
}
function els(el) {
  return el ? document.querySelectorAll(el) : null
}

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
//Error messsages
const MIN_CHAR_FILED_ERROR = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
const CHOOSE_OPTION_ERROR = "Vous devez choisir une option";
const CHECK_GENERAL_CONDITIONS_ERRROR = "Vous devez vérifier que vous acceptez les termes et conditions.";
const BIRTH_DATE_ERROR = "Vous devez entrer votre date de naissance valide.";
const EMPTY_FIELD_ERROR = "Veuillez renseigner ce champ";
const EMAIL_ERROR = "Veuillez renseigner un email valide";
const NUMBER_RANGE_ERROR = "Veuillez renseigner nombre entre 0 et 99"
// DOM Elements
const modalBtn = els(".modal-btn");
const formData = els(".formData");
const modalbg = el("#form-modal");
const modalbgSuccess = el(".success-modal");
const content = el(".content");
const contentSuccess = el(".content-success");
const closeBtn = els('.close');
const form = el('[name="reserve"]');
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeFormModal));
// Listen to submit
form.addEventListener('submit', submit)

// Add error attribute
function setErrorField(error, el) {
  el.setAttribute('data-error', error);
  el.setAttribute('data-error-visible', true);
}

function setValidField(el) {
  el.setAttribute('data-valid-visible', true);
}

function resetFieldState(el) {
  el.setAttribute('data-error', '');
  el.setAttribute('data-error-visible', false);
  el.setAttribute('data-valid-visible', false);
}

function resetFields(form) {
  form.forEach((el) => {
    const inputFields = el.querySelectorAll('input');
    resetFieldState(el)
        for (const item of inputFields) {
          if (item.type === 'checkbox' || item.type === 'radio') {
            item.checked = false
          }else{
            item.value = ''
          }
        
        }
  });
}
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// launch modal form
function closeFormModal() {
  resetFields(formData)
  content.classList.add("content-close")
  setTimeout(() => {
    content.classList.remove("content-close")
    modalbg.style.display = "none";
  }, 700)
}

function fadeOut(element) {
  let opacity = 1;
    const fadeEffect = setInterval(() => {
       if (opacity <= 0.1) {
        clearInterval(fadeEffect);
        contentSuccess.classList.add('content-close')
         element.style.display = 'none';

      }  else {
        element.style.opacity = opacity;
        opacity -= 0.1;
      }
    }, 70);
}


function isFilledUp(value, el) {
  if (value.trim() === '') {
    setErrorField(EMPTY_FIELD_ERROR, el)
    return false
  }
  return true
}

function isMin2Char(value, el) {
  if (value && value.trim().length < 2) {
    setErrorField(MIN_CHAR_FILED_ERROR, el);
    return false
  }
  setValidField(el)
  return true
}

function isEmailValid(value, el) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value)) {
    setErrorField(EMAIL_ERROR, el);
    return false
  }
  setValidField(el)
  return true
}

function isDateValid(value, el) {
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    setErrorField(BIRTH_DATE_ERROR, el);
    return false;
  }
  setValidField(el);
  return true;
}

function isNumberBetween0And99(number, el) {
  // Check if the number is a valid number and is between 0 and 99
  if (isNaN(number) || number <= 0 || number > 99) {
    setErrorField(NUMBER_RANGE_ERROR, el);
    return false;
  }
  setValidField(el);
  return true;
}

function isRadioButtonSelected(fields, el) {
  for (const item of fields) {
    if (item.checked) {
      return true;
    }
  }
  setErrorField(CHOOSE_OPTION_ERROR, el);
  return false;
}

function isCheckBoxSelected(field, el) {
  if (field.checked) {
    return true;
  }
  setErrorField(CHECK_GENERAL_CONDITIONS_ERRROR, el);
  return false;
}

function submit(event) {
  let hasError = 0
  event.preventDefault()
  formData.forEach((el) => {
    const inputFields = el.querySelectorAll('input');
    // reset form validation
    resetFieldState(el)
    // Check common empty field errors
    if (!isFilledUp(inputFields[0].value, el)) {
      return (hasError += 1);
    }
    // Check specific field errors
    switch (inputFields[0].name) {
      case 'first':
      case 'last':
        !isMin2Char(inputFields[0].value, el) && (hasError += 1);
        return
      case 'email':
        !isEmailValid(inputFields[0].value, el) && (hasError += 1);
        return
      case 'birthdate':
        !isDateValid(inputFields[0].value, el) && (hasError += 1);
        return
      case 'quantity':
        !isNumberBetween0And99(inputFields[0].value, el) && (hasError += 1);
        return
      case 'location':
        !isRadioButtonSelected(inputFields, el) && (hasError += 1);
        return
      case 'cgu':
        !isCheckBoxSelected(inputFields[0], el) && (hasError += 1);
        return
    }
  });
  if (hasError === 0) {
    // reset form values
    resetFields(formData)
    // close form modal
    closeFormModal()
    //display success modal
    modalbgSuccess.style.display = 'block'
    modalbgSuccess.style.opacity = 1
    //close success modal
    setTimeout(()=>{
      fadeOut(modalbgSuccess)
    },3000)
  }
}

