import React from "react";
import { NavigationTopBar } from "../../components";
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import messages from "../messages";
import IMAGES from '../../images/images';
import './HeaderContent.scss';

function HeaderContent({intl}) {
    return (
        <>
            <NavigationTopBar />
            <header>
                <div className="banner container">
                    <div className="text-over">
                        <div className="text-wrapper">
                            <div className="text-title">{intl.formatMessage(messages.learning)}</div>
                            <div className="text-title margin-bottom-20">{intl.formatMessage(messages.managementSystem)}</div>
                            <div className="text-name">HUTECH</div>
                        </div>
                    </div>
                    <img src={IMAGES.banner} />
                </div>
            </header>
        </>
    )
}

HeaderContent.propTypes = {
    intl: intlShape.isRequired,
};

export default injectIntl(HeaderContent);
