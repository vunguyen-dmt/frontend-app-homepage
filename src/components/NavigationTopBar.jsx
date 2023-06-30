import React, { useState } from "react";
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import messages from './messages';
import IMAGES from '../images/images';
import { Navbar, Nav, Form, Button, Dropdown } from "@edx/paragon";
import { getCookie, setCookie } from '../homepage/data/cookies'
import { getConfig } from '@edx/frontend-platform';
import { Helmet } from "react-helmet";
import './NavigationTopBar.scss';

function NavigationTopBar({intl}) {

  // set expiry to exactly 7 days from now
  const changeLanguageTimestamp = (new Date()).getTime();
  const cookieExpiry = new Date(changeLanguageTimestamp + 7 * 864e5);
  const [currentLang, setCurrentLang] = useState(getCookie(getConfig().LANGUAGE_PREFERENCE_COOKIE_NAME) ?? 'en');
  
  const handleSelect = (lang) => {
    setCurrentLang(lang)
    window.location.reload(false);
  }

  setCookie(getConfig().LANGUAGE_PREFERENCE_COOKIE_NAME, currentLang, cookieExpiry);
  
  return (
    <>
      <Helmet htmlAttributes={{ lang : currentLang }}/>
      <Navbar expand="lg" className="px-4">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Brand href="#home" className="mx-auto">
            <img src={IMAGES.header_logo} alt='top logo' className="logo"/>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="/">{intl.formatMessage(messages.home)}</Nav.Link>
            <Nav.Link href="https://lms.hutech.edu.vn/about">{intl.formatMessage(messages.aboutUs)}</Nav.Link>
            <Nav.Link href="https://learner-help.goamazing.org" className="d-lg-none">FAQ</Nav.Link>
            <Nav.Link href="/authn/login?next" className="d-lg-none">{intl.formatMessage(messages.login)}</Nav.Link>
          </Nav>
          <Form inline>
            <Button href="https://learner-help.goamazing.org" variant="danger" className="mx-1 d-none d-lg-block red-btn">FAQ</Button>
            <Button href="/authn/login?next" variant="danger" className="mx-1 d-none d-lg-block red-btn">{intl.formatMessage(messages.login)}</Button>
            <Form.Label className="d-lg-none language">{intl.formatMessage(messages.language)}</Form.Label>
            <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle className="btn-transparent" id="dropdown-basic">
                  {currentLang == "en" ? 'English' : 'Tiếng Việt'} 
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
  )
}
NavigationTopBar.prototype = {
  intl: intlShape.isRequired,
}

export default injectIntl(NavigationTopBar);