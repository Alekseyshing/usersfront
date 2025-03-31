import { IUser } from "../../../models/IUser";
import { generateRandomString } from "../../../utils/generateRandomIndex";
import "./styles.css";
import { Link } from "react-router-dom"
import { useState } from "react";

export const UserCard = ({ firstName, lastName, id, like }: IUser) => {
  const [isLiked, setIsLiked] = useState(like);
  
  const handleLike = (id: string) => {
    setIsLiked(!isLiked);
  }

  return (
    <article className="flex flex-col gap-[16px] items-center justify-center">
      <div className="w-[124px] h-[124px] rounded-[50%] bg-[var(--border-color)] flex items-center justify-center">
        <span className="text-2xl text-[var(--main-color)]">
          {firstName[0]}{lastName[0]}
        </span>
      </div>
      <Link to={`${id}`} className="text-[var(--main-color)] hover:text-[var(--active-color)]">
        {firstName}&nbsp;{lastName}
      </Link>
      <button
        onClick={() => handleLike(id)}
        className="p-[8px] bg-[var(--border-color)] rounded-[4px] outline-0 focus:outline-0 border-none 
        hover:bg-white active:bg-[var(--active-color)]"
      >
        <svg width="16" height="14" className={`${!isLiked ? 'icon' : 'icon-violet'}`} viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.85 1C2.72375 1 1 2.72173 1 4.84548C1 8.69096 5.55 12.1869 8 13C10.45 12.1869 15 8.69096 15 4.84548C15 2.72173 13.2762 1 11.15 1C9.848 1 8.6965 1.64569 8 2.63398C7.64499 2.1289 7.17336 1.71669 6.62504 1.43226C6.07672 1.14784 5.46785 0.999565 4.85 1Z" />
        </svg>
      </button>
    </article>
  )
}