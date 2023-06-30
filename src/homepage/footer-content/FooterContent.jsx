import React from "react";
import { IconInfo } from "../../components";
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import messages from "../messages";
import IMAGES from "../../images/images";

function FooterContent({intl}) {
    const connectFlexCss = "d-flex flex-nowrap align-items-center";
    const connectPaddingCss = "px-1 px-lg-0";

    return (
        <footer className="text-white px4 footer-content-wrapper">
            <div className="container">
                <div className="px-3 px-lg-0 py-4">
                    <img className="mx-auto d-block mx-lg-0" src={IMAGES.footer_logo} alt='bottom logo'/>
                </div>
                <div className="d-flex flex-column flex-lg-row justify-content-between text-center text-lg-left">
                    <div>
                        <div className="d-none d-lg-block">{intl.formatMessage(messages.info)}</div>
                        <IconInfo imageSource={IMAGES.home_light} textInfo={intl.formatMessage(messages.name)} uppercase={true} />
                        <IconInfo imageSource={IMAGES.pin_light} textInfo={intl.formatMessage(messages.address)} />
                        <IconInfo imageSource={IMAGES.phone_light} textInfo="(+84) 28 5445 9998" />
                        <IconInfo imageSource={IMAGES.message_light} textInfo="dayhocso@hutech.edu.vn" />
                    </div>
                    <div className="d-flex flex-row flex-lg-column align-items-center align-items-lg-baseline justify-content-center justify-content-lg-start px-3">
                        <div className="d-none d-lg-block">{intl.formatMessage(messages.connect)}</div>
                        <a href="https://www.facebook.com/hutechuniversity" target='_blank'>
                            <IconInfo imageSource={IMAGES.facebook} textInfo="Facebook" flex={connectFlexCss} padding={connectPaddingCss}/>
                        </a>
                        <a href="https://www.youtube.com/c/HUTECHChannel" target='_blank'>
                            <IconInfo imageSource={IMAGES.youtube} textInfo="Youtube" flex={connectFlexCss} padding={connectPaddingCss}/>
                        </a>
                        <a href="https://www.instagram.com/hutechuniversity" target='_blank'>
                            <IconInfo imageSource={IMAGES.instagram} textInfo="Instagram" flex={connectFlexCss} padding={connectPaddingCss}/>
                        </a>
                    </div>
                    <div className="py-2 py-lg-0">
                        <div className="d-none d-lg-block">{intl.formatMessage(messages.download)}</div>
                        <div className="d-flex justify-content-center justify-content-lg-start">
                            <div className="d-flex flex-column pr-2 /*stores*/">
                                <a href="https://apps.apple.com/us/app/hutech-x/id1632853626" target="_blank">
                                    <img src={IMAGES.appstore} className="pb-2"/>
                                </a>
                                <a href="https://play.google.com/store/apps/details?id=vn.edu.hutech.lms" target="_blank">
                                    <img src={IMAGES.googleplay}/>
                                </a>
                            </div>
                            <div>
                                <img src={IMAGES.qr_code}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-3 pb-lg-2 text-center text-lg-right">© 2022 HUTECH. All rights reserved.</div>
            </div>
        </footer>
    )
}
FooterContent.prototype = {
    intl: intlShape.isRequired,
}

export default injectIntl(FooterContent);