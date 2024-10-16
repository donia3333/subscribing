import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import EmailVerification from './components/EmailVerification.tsx';
import LoginForm from './components/login.tsx';
import SignupForm from './components/SignUp.tsx';
import User from './components/user.tsx';
import UsersList from './components/usersList.tsx';
import Home from './pages/Home.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/userslist" element={<UsersList />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/user" element={<User />} />


      </Routes>
    </Router>
  );
};

export default App;
