import React, {useState, useEffect} from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Navbar, Nav, Form, Button, Dropdown,
} from '@openedx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { Helmet } from 'react-helmet';
import messages from '../../messages/messages';
import { getCookie, setCookie } from '../../homepage/data/cookies';
import './NavigationTopBar.scss';

const NavigationTopBar = () => {
  // const cdn = "https://d10g66pf9vjy7h.cloudfront.net";
  const cdn = "https://hutech-media.goamazing.org/hutech-statics";

  const { formatMessage } = useIntl();
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

  const [position, setPosition] = useState(window.pageYOffset)
  const [visible, setVisible] = useState(true) 
  useEffect(()=> {
      const handleScroll = () => {
         let moving = window.pageYOffset
         
         setVisible(position > moving);
         setPosition(moving)
      };
      window.addEventListener("scroll", handleScroll);
      return(() => {
         window.removeEventListener("scroll", handleScroll);
      })
  })

  const cls = visible ? "visible" : "hidden";
  const scroll_class = cls + " px-4 px-lg-5 nav-wrapper w-100 shadow-none border-bottom border-light"
  
  return (
    <>
      <Helmet htmlAttributes={{ lang: languageCode }} />
      <Navbar expand="lg" className={scroll_class}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Brand href="#home">
          <img src={cdn + "/media/home-page-resources/header_logo_full.png"} alt="top logo" className="logo" />
        </Navbar.Brand>
        <Button href="/authn/login?next" size="sm" variant="danger" className="d-lg-none red-btn mobile-login">{formatMessage(messages.login)}</Button>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="/">{formatMessage(messages.home)}</Nav.Link>
            <Nav.Link href="/courses/">{formatMessage(messages.Courses)}</Nav.Link>
            {/* <Nav.Link href="/">Giáo dục & Công nghệ</Nav.Link> */}
            <Nav.Link href="https://www.hutech.edu.vn/dayhocso" className="/*d-lg-none*/">{formatMessage(messages.contact)}</Nav.Link>
            <Nav.Link href="https://apps.lms.hutech.edu.vn/home/faq?role=student" className="/*d-lg-none*/">FAQ</Nav.Link>
            {/* <Nav.Link href="/authn/login?next" className="d-lg-none">{formatMessage(messages.login)}</Nav.Link> */}
          </Nav>
          <Form inline className="fw-600 right-box-faq">
            {/* <Button href="https://apps.lms.hutech.edu.vn/home/faq?role=student" variant="danger" className="mx-1 d-none d-lg-block red-btn">FAQ</Button> */}
            <Nav.Link href="/authn/login?next" className="d-none d-lg-block text-white">{formatMessage(messages.login)}</Nav.Link>
            <Form.Label className="d-lg-none language">{formatMessage(messages.language)}</Form.Label>
            <Dropdown onSelect={handleSelect}>
              <Dropdown.Toggle className="btn-transparent text-white" id="dropdown-basic">
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

export default NavigationTopBar;
