import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import HomePage from './components/Home/HomePage';
import LoginPage from './components/Auth/LoginPage';
import CreateProjectForm from './components/ProjectIdeas/CreateProjectForm';
import ProfilePage from './components/Profile/ProfilePage';
import UserListPage from './components/Users/UserListPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="create" element={<CreateProjectForm />} />
            <Route path="profile" element={<ProfilePage/>} />
            <Route path="profile/:userId" element={<ProfilePage/>} />
            <Route path="user-list" element={<UserListPage/>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;