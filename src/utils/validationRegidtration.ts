import { MutableRefObject } from "react";
import { handleAlertMessage } from "./Auth";
import validator from "validator";

export const validationRegistrationInputs = (
  firstNameRef: MutableRefObject<HTMLInputElement>,
  lastNameRef: MutableRefObject<HTMLInputElement>,
  emailRef: MutableRefObject<HTMLInputElement>,
  passwordRef: MutableRefObject<HTMLInputElement>,
  passwordConfirmRef: MutableRefObject<HTMLInputElement>
) => {
  const firstName = firstNameRef.current.value;
  const lastName = lastNameRef.current.value;
  const email = emailRef.current.value;
  const password = passwordRef.current.value;
  const passwordConfirm = passwordConfirmRef.current.value;

  const inputs = [
    firstNameRef.current,
    lastNameRef.current,
    emailRef.current,
    passwordRef.current,
    passwordConfirmRef.current,
  ];

  const addDangerBorderByCondition = () => {
    inputs.forEach(input => input.value.length
      ? input.classList.remove('border-danger')
      : input.classList.add('border-danger'));
  };

  if (!firstName || !lastName || !email || !password || !passwordConfirm) {
    handleAlertMessage({ alertText: 'Заполните все поля', alertStatus: 'warning' });
    addDangerBorderByCondition();
    return false;
  }

  if (!validator.isEmail(email)) {
    handleAlertMessage({ alertText: "Введите корректный Email!", alertStatus: 'warning' });
    emailRef.current.classList.add('border-danger');
    return false;
  }

  if (password.length < 4) {
    handleAlertMessage({ alertText: 'Пароль должен содержать более 4-х символов', alertStatus: 'warning' });
    passwordRef.current.classList.add('border-danger');
    return false;
  }

  if (password !== passwordConfirm) {
    handleAlertMessage({ alertText: 'Пароли должны совпадать', alertStatus: 'warning' });
    passwordConfirmRef.current.classList.add('border-danger');
    return false;
  }

  inputs.forEach(input => input.classList.remove('border-danger'));
  return true;
};