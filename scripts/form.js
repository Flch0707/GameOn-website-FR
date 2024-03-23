//Error messsages
 const ERRORS = {
  MIN_CHAR_FILED_ERROR:
    "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  CHOOSE_OPTION_ERROR: "Vous devez choisir une option",
  CHECK_GENERAL_CONDITIONS_ERRROR:
    "Vous devez vérifier que vous acceptez les termes et conditions.",
  BIRTH_DATE_ERROR: "Vous devez entrer une date de naissance valide.",
  EMPTY_FIELD_ERROR: "Veuillez renseigner ce champ",
  EMAIL_ERROR: "Veuillez renseigner un email valide",
  NUMBER_RANGE_ERROR: "Veuillez renseigner nombre entre 0 et 99",
};

// Set validation attributes
 function setErrorField(error, el) {
  el.setAttribute("data-error", error);
  el.setAttribute("data-error-visible", true);
}

 function setValidField(el) {
  el.setAttribute("data-valid-visible", true);
}

 function resetFieldState(el) {
  el.setAttribute("data-error", "");
  el.setAttribute("data-error-visible", false);
  el.setAttribute("data-valid-visible", false);
}

export function resetFields(form) {
  form.forEach((el) => {
    const inputFields = el.querySelectorAll("input");
    resetFieldState(el);
    for (const item of inputFields) {
      if (item.type === "checkbox" || item.type === "radio") {
        item.checked = false;
      } else {
        item.value = "";
      }
    }
  });
}

 function isFilledUp(value, el) {
  if (value.trim() === "") {
    setErrorField(ERRORS.EMPTY_FIELD_ERROR, el);
    return false;
  }
  return true;
}

 function isMin2Char(value, el) {
  if (value && value.trim().length < 2) {
    setErrorField(ERRORS.MIN_CHAR_FILED_ERROR, el);
    return false;
  }
  setValidField(el);
  return true;
}

 function isEmailValid(value, el) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value)) {
    setErrorField(ERRORS.EMAIL_ERROR, el);
    return false;
  }
  setValidField(el);
  return true;
}

 function isDateValid(value, el) {
  const date = new Date(value);
  if (date > new Date() || isNaN(date.getTime())) {
    setErrorField(ERRORS.BIRTH_DATE_ERROR, el);
    return false;
  }
  setValidField(el);
  return true;
}

 function isNumberBetween0And99(number, el) {
  if (isNaN(number) || number <= 0 || number > 99) {
    setErrorField(ERRORS.NUMBER_RANGE_ERROR, el);
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
  setErrorField(ERRORS.CHOOSE_OPTION_ERROR, el);
  return false;
}

 function isCheckBoxSelected(field, el) {
  if (field.checked) {
    return true;
  }
  setErrorField(ERRORS.CHECK_GENERAL_CONDITIONS_ERRROR, el);
  return false;
}

//Validate field 
export function validateField(inputFields, wrapperDiv) {
  // reset form validation
  resetFieldState(wrapperDiv);
// Check common empty field errors
if (!isFilledUp(inputFields[0].value, wrapperDiv)) {
return false;
}
// Check specific field errors
switch (inputFields[0].name) {
case "first":
case "last":
  return isMin2Char(inputFields[0].value, wrapperDiv);
case "email":
  return isEmailValid(inputFields[0].value, wrapperDiv);
case "birthdate":
  return isDateValid(inputFields[0].value, wrapperDiv);
case "quantity":
  return isNumberBetween0And99(inputFields[0].value, wrapperDiv);
case "location":
  return isRadioButtonSelected(inputFields, wrapperDiv);
case "cgu":
  return isCheckBoxSelected(inputFields[0], wrapperDiv);
  default: return true
}
}
