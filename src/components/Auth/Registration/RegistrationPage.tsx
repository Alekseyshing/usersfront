import { useStore } from "effector-react";
import { MutableRefObject, useRef, useState } from "react"
import { register } from "../../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { handleAlertMessage } from "../../../utils/Auth";
import { validationRegistrationInputs } from "../../../utils/validationRegidtration";
import { Alert } from "../../Alert/Alert";
import { $alert } from "../../../Context/alert";
import { Spinner } from "../../Spinner/Spinner";

export const RegistrationPage = () => {
  const [spinner, setSpinner] = useState(false);
  const firstNameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const lastNameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const userEmailRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordConfirmRef = useRef() as MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();
  const alert = useStore($alert);

  const handleRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!validationRegistrationInputs(
      firstNameRef,
      lastNameRef,
      userEmailRef,
      passwordRef,
      passwordConfirmRef
    )) {
      return;
    }

    setSpinner(true);
    try {
      console.log('Attempting registration with:', {
        email: userEmailRef.current.value,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value
      });

      const result = await register(
        userEmailRef.current.value,
        passwordRef.current.value,
        firstNameRef.current.value,
        lastNameRef.current.value
      );

      console.log('Registration response:', result);

      if (result.token) {
        localStorage.setItem('token', result.token);
        handleRegistrationResponse(true, '/login', 'Регистрация успешна');
      } else {
        handleRegistrationResponse(false, '', 'Ошибка регистрации');
      }
    } catch (error: any) {
      console.error('Registration failed:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      handleRegistrationResponse(false, '', 'Ошибка регистрации');
    }
  };

  const handleRegistrationResponse = (
    result: boolean,
    navigatePath: string,
    alertText: string
  ) => {
    if (!result) {
      setSpinner(false);
      return;
    }

    setSpinner(false);
    navigate(navigatePath);
    handleAlertMessage({ alertText, alertStatus: 'success' });
  };

  return (
    <div className="flex flex-col fixed top-0 left-0 w-full h-full bg-[var(--background-color)]">
      {alert.alertText && <Alert props={alert} />}
      <div className="flex flex-col gap-[16px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] p-[16px] w-[375px] md:w-[500px] rounded-[16px] shadow-[0_4px_20px_0px_rgba(0,0,0,0.08)] bg-white">
        <h2 className="text-xl font-bold">Регистрация</h2>
        <form onSubmit={handleRegistration} className="flex flex-col items-center gap-[16px]">
          <label className="flex flex-col items-left gap-[8px] w-full">
            <span className="text-base">Имя</span>
            <input
              ref={firstNameRef}
              type="text"
              className="p-[16px] bg-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
              required
            />
          </label>

          <label className="flex flex-col items-left gap-[8px] w-full">
            <span className="text-base">Фамилия</span>
            <input
              ref={lastNameRef}
              type="text"
              className="p-[16px] bg-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
              required
            />
          </label>

          <label className="flex flex-col items-left gap-[8px] w-full">
            <span className="text-base">Email</span>
            <input
              ref={userEmailRef}
              type="email"
              className="p-[16px] bg-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
              required
            />
          </label>

          <label className="flex flex-col items-left gap-[8px] w-full">
            <span className="text-base">Пароль</span>
            <input
              ref={passwordRef}
              type="password"
              className="p-[16px] bg-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
              required
            />
          </label>

          <label className="flex flex-col items-left gap-[8px] w-full">
            <span className="text-base">Подтверждение пароля</span>
            <input
              ref={passwordConfirmRef}
              type="password"
              className="p-[16px] bg-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full sm:min-h-[48px] flex items-center justify-center relative bg-[var(--main-color)] text-white text-base py-[13px] rounded-[8px] transition-all ease-in-out duration-75 active:bg-[var(--active-color)] hover:bg-[#8025f7]"
            disabled={spinner}
          >
            {spinner ? <Spinner top={10} left={50} /> : 'Зарегистрироваться'}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/login" className="text-[var(--main-color)] hover:text-[#8025f7]">
            Уже есть аккаунт? Войти
          </Link>
        </div>
      </div>
    </div>
  );
};
