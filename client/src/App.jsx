import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CoursePage from './components/CoursePage';
import BranchPage from './components/BranchPage';
import SemesterPage from './components/SemesterPage';
import SubjectPage from './components/SubjectPage';
import NotesPage from './components/NotesPage';
import ContributePage from './components/ContributePage';
import QuotePage from './components/QuotePage';
import ServicesPage from './components/ServicesPage';
import HomePage from './components/HomePage';
import ContactUsPage from './components/ContactUsPage';
import Signup from './components/Pages/Auth/Signup'
import Login from './components/Pages/Auth/Login'
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/branch/:courseId" element={<BranchPage />} />
        <Route path="/semester/:branchId" element={<SemesterPage />} />
        <Route path="/subject/:semesterId" element={<SubjectPage />} />
        <Route path="/notes/:subjectId" element={<NotesPage />} />
        <Route path="/contribute" element={<ContributePage />} />
        <Route path="/quotepage" element={<QuotePage />} />
        <Route path="/servicespage" element={<ServicesPage/>} />
        <Route path="/contactuspage" element={<ContactUsPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default App;