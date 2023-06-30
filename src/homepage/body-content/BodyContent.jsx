import React from "react";
import { VideoPlayer } from "../../components";
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n'
import messages from '../messages';

function BodyContent({intl}) {
    return (
        <div className="body-content-wrapper">
            <div className="body-content">
                <div className="pl-lg-4 guide">{intl.formatMessage(messages.guide)}</div>
                <div className="d-flex flex-wrap justify-content-center justify-content-lg-between px-4 py-3">
                    <VideoPlayer 
                        source="https://hutech-statics.s3.ap-southeast-1.amazonaws.com/media/videos/huong-dan-dang-nhap.mp4" 
                        title="Cách đăng nhập HUTECH eLearning" 
                        />
                    <VideoPlayer 
                        source="https://hutech-statics.s3.ap-southeast-1.amazonaws.com/media/videos/huongdantracnghiemtuluan-26-05-fix.mp4" 
                        title="Cách làm bài tập HUTECH eLearning"
                    />
                </div>
            </div>
        </div>
    )
}

BodyContent.prototype = {
    intl: intlShape.isRequired,
};

export default injectIntl(BodyContent);