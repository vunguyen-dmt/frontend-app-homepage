import React from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import {
  Navbar, Nav, Form, Button, Dropdown,
} from '@edx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { Helmet } from 'react-helmet';
import messages from '../../messages/messages';
import { getCookie, setCookie } from '../../homepage/data/cookies';
import './NavigationTopBar.scss';

const NavigationTopBar = ({ intl }) => {
  const defaultLanguageCode = 'vi';
  // set expiry to exactly 30 days from now
  const changeLanguageTimestamp = (new Date()).getTime();
  const cookieExpiry = new Date(changeLanguageTimestamp + 30 * 864e5);

  const languageCode = getCookie(getConfig().LANGUAGE_PREFERENCE_COOKIE_NAME);

  const handleSelect = (lang) => {
    setCookie(getConfig().LANGUAGE_PREFERENCE_COOKIE_NAME, lang, cookieExpiry);
    window.location.reload(false);
  };

  if (!languageCode) {
    handleSelect(defaultLanguageCode);
  }

  return (
    <>
      <Helmet htmlAttributes={{ lang: languageCode }} />
      <Navbar expand="lg" className="px-4 nav-wrapper">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Brand href="#home">
          <img src="https://d10g66pf9vjy7h.cloudfront.net/media/home-page-resources/header_logo_full.png" alt="top logo" className="logo" />
        </Navbar.Brand>
        <Button href="/authn/login?next" size="sm" variant="danger" className="d-lg-none red-btn mobile-login">{intl.formatMessage(messages.login)}</Button>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="/">{intl.formatMessage(messages.home)}</Nav.Link>
            <Nav.Link href="/courses">{intl.formatMessage(messages.Courses)}</Nav.Link>
            <Nav.Link href="https://www.hutech.edu.vn/dayhocso">{intl.formatMessage(messages.aboutUs)}</Nav.Link>
            <Nav.Link href="https://apps.lms.hutech.edu.vn/home/faq?role=student" className="d-lg-none">FAQ</Nav.Link>
            <Nav.Link href="/authn/login?next" className="d-lg-none">{intl.formatMessage(messages.login)}</Nav.Link>
          </Nav>
          <Form inline className="fw-600 right-box-faq">
            <Button href="https://apps.lms.hutech.edu.vn/home/faq?role=student" variant="danger" className="mx-1 d-none d-lg-block red-btn">FAQ</Button>
            <Button href="/authn/login?next" variant="danger" className="mx-3 d-none d-lg-block red-btn">{intl.formatMessage(messages.login)}</Button>
            <Form.Label className="d-lg-none language">{intl.formatMessage(messages.language)}</Form.Label>
            <Dropdown onSelect={handleSelect}>
              <Dropdown.Toggle className="btn-transparent" id="dropdown-basic">
                {languageCode === 'en' ? 'English' : 'Tiếng Việt'}
              </Dropdown.Toggle>
              <Dropdown.Menu className="shadow">
                <Dropdown.Item eventKey="en">English</Dropdown.Item>
                <Dropdown.Item eventKey="vi">Tiếng Việt</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

NavigationTopBar.prototype = {
  intl: intlShape.isRequired,
};

export default injectIntl(NavigationTopBar);
