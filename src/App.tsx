import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "./components/Auth/Login/LoginPage";
import { RegistrationPage } from "./components/Auth/Registration/RegistrationPage";
import { UserPage } from "./components/Users/UserPage/UserPage";
import { UsersPage } from "./components/Users/UsersPage/UsersPage";
import { useAppSelector } from "./hooks/redux";

function App() {
  const isLoggedIn = useAppSelector(state => state.usersReducer).isLogged;

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to='/users' /> : <Navigate to="registration" />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:userId" element={<UserPage />} />
      </Routes>
    </Router>
  )
}
export default App
