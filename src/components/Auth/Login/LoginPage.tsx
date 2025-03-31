import { MutableRefObject, useRef, useState } from "react";
import { useStore } from "effector-react";
import { login } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { usersSlice } from "../../../store/reducers/UsersSlice";
import { handleAlertMessage } from "../../../utils/Auth";
import { Spinner } from "../../Spinner/Spinner";
import { validationLoginInputs } from "../../../utils/validationLogin";
import { $alert } from "../../../Context/alert";
import { Alert } from "../../Alert/Alert";

export const LoginPage = () => {
  const userEmailLoginRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordLoginRef = useRef() as MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const { isLogged } = useAppSelector(state => state.usersReducer)
  const { isLoggedSuccess } = usersSlice.actions;
  const dispatch = useAppDispatch();
  const alert = useStore($alert);

  const handleAuth = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin(userEmailLoginRef.current.value, passwordLoginRef.current.value);
  }

  const handleLoginResponse = (
    result: boolean | undefined,
    navigatePath: string,
    alertText: string
  ) => {
    if (!result) {
      setSpinner(false);
      handleAlertMessage({ alertText: 'Введены неверные данные', alertStatus: 'warning' });
      return;
    }

    setSpinner(false);
    navigate(navigatePath);
    handleAlertMessage({ alertText, alertStatus: 'success' });
  }

  const handleLogin = async (email: string, password: string) => {
    setSpinner(true);

    if (!validationLoginInputs(userEmailLoginRef, passwordLoginRef)) {
      setSpinner(false);
      return;
    }

    try {
      const result = await login(email, password);
      if (result.token) {
        localStorage.setItem('token', result.token);
        dispatch(isLoggedSuccess(!isLogged));
        handleLoginResponse(true, '/users', 'Вход выполнен');
      } else {
        handleLoginResponse(false, '', 'Ошибка входа');
      }
    } catch (error) {
      console.error('Login error:', error);
      handleLoginResponse(false, '', 'Ошибка входа');
    }
  }

  return (
    <div className="flex flex-col fixed top-0 left-0 w-full h-full">
      {alert.alertText && <Alert props={alert} />}
      <div className="flex flex-col gap-[16px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] p-[16px] w-[375px] md:w-[500px] rounded-[16px] shadow-[0_4px_20px_0px_rgba(0,0,0,0.08)]">
        <h2 className="text-xl">Авторизация</h2>
        <form
          className="flex flex-col items-center gap-[16px]"
          onSubmit={handleAuth}>

          <label className="flex flex-col items-left gap-[8px] w-full">
            <span className="text-base">Электронная почта</span>
            <input 
              ref={userEmailLoginRef} 
              type="email" 
              className="p-[16px] bg-[var(--border-color)] rounded-lg" 
              placeholder="example@mail.ru" 
              required
            />
          </label>

          <label className="flex flex-col items-left gap-[8px] w-full">
            <span className="text-base">Пароль</span>
            <input 
              ref={passwordLoginRef} 
              type="password" 
              className="p-[16px] bg-[var(--border-color)] rounded-lg" 
              placeholder="******" 
              required
            />
          </label>

          <button 
            type="submit"
            className="w-full sm:min-h-[48px] flex items-center justify-center relative bg-[var(--main-color)] text-white text-base py-[13px] rounded-[8px] transition-all ease-in-out duration-75 active:bg-[var(--active-color)] hover:bg-[#8025f7]"
            disabled={spinner}
          >
            {spinner ? <Spinner top={10} left={50} /> : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  )
}


