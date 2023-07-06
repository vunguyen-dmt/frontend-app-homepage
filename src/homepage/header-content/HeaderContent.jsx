import React, { useEffect } from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Button } from '@edx/paragon';
import AOS from 'aos';
import { NavigationTopBar } from '../../components';
import messages from '../messages';
import IMAGES from '../../images/images';
import './HeaderContent.scss';

const HeaderContent = ({ intl }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <NavigationTopBar />
      <header>
        <div className="banner container">
          <div className="text-over" data-aos="fade-up">
            <div className="text-wrapper">
              <div className="text-title">{intl.formatMessage(messages.learning)}</div>
              <div className="text-title margin-bottom-20">{intl.formatMessage(messages.managementSystem)}</div>
              <div className="text-name">HUTECH</div>
              <div className="sign-in">
                <Button href="/authn/login?next" variant="danger" className="shadow red-btn">{intl.formatMessage(messages.login)}</Button>
              </div>
            </div>
          </div>
          <img src={IMAGES.banner} />
        </div>
      </header>
    </>
  );
};

HeaderContent.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(HeaderContent);
