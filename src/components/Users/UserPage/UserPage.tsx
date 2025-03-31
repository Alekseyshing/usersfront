import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchUser } from "../../../store/reducers/ActionsCreators";
import { User } from "../User/User";

export const UserPage = () => {
  const { user } = useAppSelector(state => state.userReducer)
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.userId) {
      dispatch(fetchUser(params.userId));
    }
  }, [dispatch, params.userId])

  const email = user?.email || '';
  const firstName = user?.firstName || '';
  const lastName = user?.lastName || '';
  const avatar = user?.avatar || '';

  return (
    <div>
      <User email={email} first_name={firstName} avatar={avatar} last_name={lastName} />
    </div>
  )
}