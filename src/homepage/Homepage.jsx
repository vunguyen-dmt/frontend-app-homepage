import Footer from '@edx/frontend-component-footer';
import React, { useEffect, useState } from 'react';
import { getConfig } from '@edx/frontend-platform';
import { fetchAuthenticatedUser, getAuthenticatedUser } from '@edx/frontend-platform/auth';
import HeaderContent from './header-content/HeaderContent';
import BodyContent from './body-content/BodyContent';
import { DEFAULT_REDIRECT_URL } from '../components/data/constants';

const Homepage = () => {
  useEffect(() => {
    fetchAuthenticatedUser({ forceRefresh: !!getAuthenticatedUser() }).then((authenticatedUser) => {
      if (authenticatedUser && authenticatedUser.username) {
        global.location.href = getConfig().LMS_BASE_URL.concat(DEFAULT_REDIRECT_URL);
        return null;
      }
    }).catch(error => {
      console.log(error)
    });
  }, []);
  return <main>
    <HeaderContent />
    <BodyContent />
    <Footer />
  </main>
};

export default Homepage;
