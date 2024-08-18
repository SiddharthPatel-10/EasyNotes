import React from 'react';
import CoursePage from './CoursePage';
import ContributePage from './ContributePage';
import ServicesPage from './ServicesPage';
import QuotePage from './QuotePage';
import ContactUsPage from './ContactUsPage';
import Footer from './Footer';
import Header from './Header';

const HomePage = () => {
  return (
    <>
    {/* <Header/> */}
    <CoursePage/>
    <ContributePage/>
    <ServicesPage/>
    <QuotePage/>
    <ContactUsPage/>
    <Footer/>
    </>
  );
};

export default HomePage;
