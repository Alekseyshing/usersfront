import { GenericList } from "../../GenericList/GenericList";
import { useMediaQuery } from 'react-responsive';
import { merge } from "../../../services/ts/merge";
import { generateId, generateRandomString } from "../../../utils/generateRandomIndex";
import { BtnExit } from "../../Buttons/BtnExit/BtnExit"
import { UserCard } from "../UserCard/UserCard";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { usersSlice } from "../../../store/reducers/UsersSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUsers } from "../../../store/reducers/ActionsCreators";
import useToken from "../../../hooks/useToken";
import { IUser } from "../../../models/IUser";
import './styles.css';

export const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector(state => state.usersReducer)
  const { isLoggedSuccess } = usersSlice.actions;
  const navigate = useNavigate();
  const { token } = useToken();
  const [showMore, setShowMore] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 630px)' });
  const numberOfUsers = showMore ? users.length : 8;
  const numberOfUsersMobile = showMore ? users.length : 4;

  console.log('UsersPage render:', { users, isLoading, error, token });

  const handleExit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem('token');
    dispatch(isLoggedSuccess(false));
    navigate('/login');
  }

  const handleShowMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowMore(true);
  }

  useEffect(() => {
    console.log('useEffect triggered with token:', token);
    if (token) {
      dispatch(fetchUsers(token));
    }
  }, [dispatch, token])

  const displayedUsers = users?.slice(0, !isMobile ? numberOfUsers : numberOfUsersMobile);
  console.log('Displayed users:', displayedUsers);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!users || users.length === 0) {
    return <div className="flex justify-center items-center h-screen">No users found</div>;
  }

  return (
    <div>
      <header className="bg-[var(--main-color)] mb-[48px]">
        <div className="flex flex-row justify-between sm:justify-start max-w-[1480px] m-auto items-center px-[20px] pt-[23px] sm:pt-[32px] pb-[48px] sm:pb-[32px] bg-[var(--main-color)]">
          <h1 className="text-white text-[36px] leading-[42px] lg:text-[64px] lg:leading-[75px]">Наша команда</h1>
          <button
            onClick={handleExit}
            className="outline-none rounded-[8px] focus:outline-none p-[11px] sm:px-[16px] sm:py-[8px] sm:border-[var(--border-color)] sm:ml-auto sm:mr-[3px] self-start transition-all ease-in-out duration-75 active:bg-[var(--active-color)] hover:bg-[var(--hover-color)]"
          >
            <span className="text-white text-[16px] leading-[22px] hidden sm:block display-none transition-all ease-in-out duration-75">
              Выход
            </span>
            <BtnExit />
          </button>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center px-[10px] gap-[34px] sm:gap-[130px]">
        <div className="max-w-[630px] sm:max-h-[396px] text-[16px] leading-[22px] mb-[32px]">
          {error}
        </div>
        <div className="flex flex-col gap-[16px] sm:gap-[20px]">
          <GenericList<IUser>
            items={displayedUsers || []}
            renderItem={(user) => (
              <UserCard
                key={user.id}
                id={user.id}
                email={user.email}
                firstName={user.firstName}
                lastName={user.lastName}
                isAdmin={user.isAdmin}
                createdAt={user.createdAt}
                like={user.like}
              />
            )}
            className="flex flex-col gap-[16px] sm:gap-[20px]"
          />
          {!showMore && users.length > (isMobile ? 4 : 8) && (
            <button
              onClick={handleShowMore}
              className="text-[var(--main-color)] text-[16px] leading-[22px] self-center"
            >
              Показать еще
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
