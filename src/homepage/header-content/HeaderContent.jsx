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
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <>
      <NavigationTopBar />
      <header>
        <div className="banner container">
          <div className="text-over">
            <div className="text-wrapper">
              <div data-aos="slide-right" data-aos-easing="ease-in-out" data-aos-duration="800" className="text-title">{intl.formatMessage(messages.learning)}</div>
              <div data-aos="slide-right" data-aos-easing="ease-in-out" data-aos-duration="800" data-aos-delay="50" className="text-title margin-bottom-20">{intl.formatMessage(messages.managementSystem)}</div>
              <div className="text-name" data-aos="slide-right" data-aos-easing="ease-in-out" data-aos-duration="800" data-aos-delay="100">HUTECH</div>
              <div className="sign-in">
                <Button href="/authn/login?next" variant="danger" className="shadow red-btn">{intl.formatMessage(messages.login)}</Button>
              </div>
            </div>
          </div>
          <img data-aos="slide-left" data-aos-easing="ease-in-out" data-aos-duration="900" src={IMAGES.banner} />
        </div>
      </header>
    </>
  );
};

HeaderContent.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(HeaderContent);
