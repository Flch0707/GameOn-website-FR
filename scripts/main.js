import { validateField, resetFields } from "./form.js";

//Utils
function el(el) {
  return el ? document.querySelector(el) : null;
}
function els(el) {
  return el ? document.querySelectorAll(el) : null;
}
// DOM Elements
const menuIco = el(".icon");
const modalBtn = els(".modal-btn");
const formData = els(".formData");
const modalbg = el("#form-modal");
const modalbgSuccess = el(".success-modal");
const content = el(".content");
const contentSuccess = el(".content-success");
const closeBtn = els(".close");
const form = el('[name="reserve"]');
// modal is closed by default
modalbg.style.display = "none";
// Open menu on mobile
menuIco.addEventListener("click", editNav);
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeFormModal));
// Listen to submit
form.addEventListener("submit", submit);
// Listen to input fields on blur
formData.forEach((el) => {
  const inputFields = el.querySelectorAll("input");
  inputFields[0].addEventListener("blur", function () {
    validateField(inputFields, el);
  });
});
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
//responsive nav bar
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
// launch modal form
function closeFormModal() {
  resetFields(formData);
  content.classList.add("content-close");
  setTimeout(() => {
    content.classList.remove("content-close");
    modalbg.style.display = "none";
  }, 700);
}
// Add FadeOut and close effect
function fadeOut(element) {
  let opacity = 1;
  const fadeEffect = setInterval(() => {
    if (opacity <= 0.1) {
      clearInterval(fadeEffect);
      contentSuccess.classList.add("content-close");
      element.style.display = "none";
    } else {
      element.style.opacity = opacity;
      opacity -= 0.1;
    }
  }, 70);
}

//Submit form valition
function submit(event) {
  let hasError = 0;
  event.preventDefault();
  //Loop through all div with a class formData
  formData.forEach((wrapperDiv) => {
    // get all the inputs inside the current div
    const inputFields = wrapperDiv.querySelectorAll("input");
    // Check for field validation
    const isFieldValid = validateField(inputFields, wrapperDiv);
    if (!isFieldValid) {
      hasError += 1;
    }
  });
  if (hasError === 0) {
    // reset form values
    resetFields(formData);
    // close form modal
    closeFormModal();
    //display success modal
    modalbgSuccess.style.display = "block";
    modalbgSuccess.style.opacity = 1;
    //close success modal after 3s
    setTimeout(() => {
      fadeOut(modalbgSuccess);
    }, 3000);
  }
}
