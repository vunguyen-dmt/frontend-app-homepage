import React from "react";
import { NavigationTopBar } from "../../components";
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import messages from "../messages";

function HeaderContent({intl}) {
    return (
        <>
            <NavigationTopBar />
            <header className="background_wrapper">
                <div className="outer-wrapper container">
                    <div className="text-over">
                        <div className="text-wrapper">
                            <div className="text-title">{intl.formatMessage(messages.learning)}</div>
                            <div className="text-title margin-bottom-20">{intl.formatMessage(messages.managementSystem)}</div>
                            <div className="text-name">HUTECH</div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

HeaderContent.propTypes = {
    intl: intlShape.isRequired,
};

export default injectIntl(HeaderContent);
