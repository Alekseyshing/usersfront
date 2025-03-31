import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { usersSlice } from "../../../store/reducers/UsersSlice";
import { BtnBack } from "../../Buttons/BtnBack/BtnBack";
import { BtnExit } from "../../Buttons/BtnExit/BtnExit"
import { EmailIcon } from "../../Icons/EmailIcon/EmailIcon";
import { PhoneIcon } from "../../Icons/PhoneIcon/PhoneIcon";

interface IUserInterface {
  email: string,
  first_name: string,
  last_name: string,
  avatar: string,
}

export const User = ({ email, first_name, last_name, avatar }: IUserInterface) => {
  const dispatch = useAppDispatch();
  const { isLoggedSuccess } = usersSlice.actions;
  const navigate = useNavigate();

  const handleExit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem('token');
    dispatch(isLoggedSuccess(false));
    navigate('/login')
  }

  const handleBackBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/users');
  }

  return (
    <div>
      <header className=" bg-[var(--main-color)] mb-[48px]">
        <div
          className="flex flex-row justify-between sm:justify-start max-w-[1480px] m-auto 
          tems-center px-[20px] pt-[23px] sm:pt-[32px] pb-[48px] sm:pb-[32px] 
        bg-[var(--main-color)]"
        >
          <button
            onClick={handleBackBtn}
            className="outline-none rounded-[8px] self-start focus:outline-none p-[11px] 
            sm:px-[16px] sm:py-[8px] sm:border-[var(--border-color)] sm:mr-[29px] transition-all ease-in-out 
            duration-75 active:bg-[var(--active-color)] hover:bg-[var(--hover-color)]"
          >
            <span
              className="text-white text-[16px] leading-[22px] hidden sm:block 
            display-none transition-all ease-in-out duration-75 "
            >
              Назад
            </span>
            <BtnBack />
          </button>
          <div
            className="flex flex-col-reverse items-center text-center sm:text-start gap-[16px] sm:[gap-0] sm:flex-row 
          pt-[64px] sm:pt-0 "
          >
            <img
              src={avatar}
              alt={'User avatar'}
              className="rounded-[50%] w-[187px] h-[187px] sm:mr-[32px]"
            />
            <div className="flex flex-col gap-[16px] sm:text-start">
              <h1
                className="text-white text-[36px] leading-[42px] lg:text-[64px] 
              lg:leading-[75px]"
              >
                {first_name}&nbsp;{last_name}</h1>
              <p
                className=" text-white text-[20px] leading-[23px] lg:text-[32px] 
              lg:leading-[38px]"
              >
                Партнер</p>
            </div>
          </div>
          <button
            onClick={handleExit}
            className="outline-none rounded-[8px] focus:outline-none p-[11px] sm:px-[16px] 
            sm:py-[8px] sm:border-[var(--border-color)] sm:ml-auto sm:mr-[3px] self-start 
            transition-all ease-in-out 
            duration-75 active:bg-[var(--active-color)] hover:bg-[var(--hover-color)]"
          >
            <span
              className="text-white text-[16px] leading-[22px] hidden sm:block display-none 
            transition-all ease-in-out duration-75 "
            >
              Выход
            </span>
            <BtnExit />
          </button>
        </div>
      </header>
      <main
        className="flex flex-col-reverse sm:flex-row px-[10px] gap-[34px] items-center justify-center 
      sm:gap-[130px] "
      >
        <div className="max-w-[630px] sm:max-h-[396px] text-[16px] leading-[22px] mb-[32px]">
          Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов,
          включая такие аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты.
          Он помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать процессы за счет
          применения новейших технологий и увеличивать продажи, используя самые современные аналитические
          инструменты.
          <br></br>
          <br></br>
          В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с трудностями.
          Не менее важно уделять внимание обмену знаниями: &ldquo;Один из самых позитивных моментов — это осознание того,
          что ты помог клиенту перейти на совершенно новый уровень компетентности, уверенность в том, что после
          окончания проекта у клиента есть все необходимое, чтобы дальше развиваться самостоятельно&rdquo;.
          <br></br>
          <br></br>
          Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную предпринимательскую
          деятельность. Он является совладельцем сети клиник эстетической медицины в Швейцарии, предлагающей
          инновационный подход к красоте, а также инвестором других бизнес-проектов.
        </div>
        <div className="flex flex-col gap-[25px] self-start">
          <div className="flex items-center gap-[10px]">
            <PhoneIcon />
            <a href="tel:+7 (954) 333-44-55" className="text-[16px] leading-[22px]">+7 (954) 333-44-55</a>
          </div>
          <div className="flex items-center gap-[10px]">
            <EmailIcon />
            <a href={`mailto:${email}`} className="text-[16px] leading-[22px]">{email}</a>
          </div>
        </div>
      </main>
    </div>
  )
}

