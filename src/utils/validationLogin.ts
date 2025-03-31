import { MutableRefObject } from "react";
import { handleAlertMessage } from "./Auth";
import validator from "validator";

export const validationLoginInputs = (
  emailInput: MutableRefObject<HTMLInputElement>,
  passwordInput: MutableRefObject<HTMLInputElement>,
) => {
  const emailInputValue = emailInput.current.value;
  const passwordInputValue = passwordInput.current.value;

  const inputs = [
    emailInput.current,
    passwordInput.current,
  ]

  const addDangerBorderByCondition = () => {
    inputs.forEach(input => input.value.length
      ? input.classList.remove('border-danger')
      : input.classList.add('border-danger'))
  }

  if (!emailInputValue || !passwordInputValue) {
    handleAlertMessage({ alertText: 'Заполните все поля', alertStatus: 'warning' });
    addDangerBorderByCondition();
    return false
  }

  if (!validator.isEmail(emailInputValue)) {
    handleAlertMessage({ alertText: "Введите Email!", alertStatus: 'warning' });
    addDangerBorderByCondition();
    emailInput.current.classList.add('border-danger');
    return false
  }

  inputs.forEach(input => input.classList.remove('border-danger'));

  return true
}