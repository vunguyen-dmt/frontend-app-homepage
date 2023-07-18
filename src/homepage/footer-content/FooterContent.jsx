import React from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import IconInfo from '../../components/IconInfo/IconInfo';
import messages from '../../messages/messages';
import IMAGES from '../../images/images';
import './FooterContent.scss';

const FooterContent = ({ intl }) => {
  const connectFlexCss = 'd-flex flex-nowrap align-items-center';
  const connectPaddingCss = 'px-1 px-lg-0';

  return (
    <footer className="text-white px-3 footer-content-wrapper">
      <div className="container">
        <div className="px-3 px-lg-0 py-4">
          <img className="mx-auto d-block mx-lg-0" src={IMAGES.footer_logo} alt="bottom logo" />
        </div>
        <div className="d-flex flex-column flex-lg-row justify-content-between text-center text-lg-left">
          <div className="footer-info">
            <div className="font-weight-bold mb-2 text-left">{intl.formatMessage(messages.info)}</div>
            <IconInfo imageSource={IMAGES.home_light} textInfo={intl.formatMessage(messages.name)} uppercase />
            <IconInfo imageSource={IMAGES.pin_light} textInfo={intl.formatMessage(messages.address)} />
            <IconInfo imageSource={IMAGES.phone_light} textInfo="(028) 5449 9998" />
            <IconInfo imageSource={IMAGES.message_light} textInfo="dayhocso@hutech.edu.vn" />
          </div>
          <div className="footer-connect">
            <div className="font-weight-bold mb-2 text-left">{intl.formatMessage(messages.connect)}</div>
            <a href="https://www.facebook.com/profile.php?id=100092564956873" target="_blank" rel="noreferrer">
              <IconInfo imageSource={IMAGES.facebook} textInfo="Facebook" flex={connectFlexCss} padding={connectPaddingCss} />
            </a>
            <a href="https://www.youtube.com/c/HUTECHChannel" target="_blank" rel="noreferrer">
              <IconInfo imageSource={IMAGES.youtube} textInfo="Youtube" flex={connectFlexCss} padding={connectPaddingCss} />
            </a>
            <a href="https://www.instagram.com/hutechuniversity" target="_blank" rel="noreferrer">
              <IconInfo imageSource={IMAGES.instagram} textInfo="Instagram" flex={connectFlexCss} padding={connectPaddingCss} />
            </a>
          </div>
          <div className="py-2 py-lg-0 download">
            <div className="font-weight-bold mb-2 text-left">{intl.formatMessage(messages.download)}</div>
            <div className="d-flex justify-content-center justify-content-lg-start">
              <div className="d-flex flex-column pr-2 /*stores*/">
                <a href="https://apps.apple.com/us/app/hutech-x/id1632853626" target="_blank" rel="noreferrer">
                  <img src={IMAGES.appstore} className="pb-2" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=vn.edu.hutech.lms" target="_blank" rel="noreferrer">
                  <img src={IMAGES.googleplay} />
                </a>
              </div>
              <div>
                <img src={IMAGES.qr_code} />
              </div>
            </div>
          </div>
        </div>
        <div className="py-3 pb-lg-2 text-center text-lg-right">© 2022 HUTECH. All rights reserved.</div>
      </div>
    </footer>
  );
};
FooterContent.prototype = {
  intl: intlShape.isRequired,
};

export default injectIntl(FooterContent);
