import React, { useState, useEffect } from 'react';
import { injectIntl, intlShape, FormattedMessage } from '@edx/frontend-platform/i18n';
import { Clear } from '@openedx/paragon/icons';
import { OverlayTrigger, Popover, Icon } from '@openedx/paragon';
import './chat-bot.scss';

export const ChatBot = ({ intl }) => {
  const [loaded, setLoaded] = useState(false);
  const [opened, setOpened] = useState(false);
  const [popoutOpened, setPopoutOpened] = useState(true);

  const init = () => {
    setOpened(true);
    if (loaded) {
      return;
    }

    window.addEventListener('message', (event) => {
      if (event.origin !== 'https://learner-help-bot.goamazing.org') {
        return;
      }

      if (event.data && !event.data.isBotOpen) {
        setOpened(false);
      }
    }, false);

    setLoaded(true);
  };

  const showPopout = (show) => {
    setPopoutOpened(show);
  };

  useEffect(() => {
    setTimeout(() => {
      showPopout(true);
      setTimeout(() => {
        showPopout(false);
      }, 8000);
    }, 3000);
  }, []);

  return (
    <div className={`ga-chat-bot-wrapper ${opened ? 'opened' : ''}`}>
      <div id="ga-chat-bot">
        {!opened
        && (
        <OverlayTrigger
          key="top-basic"
          placement="top"
          show={popoutOpened}
          overlay={(
            <Popover className="popover-positioned-top">
              <Popover.Content>
                <div className="chat-popout">
                  <div>
                    <FormattedMessage
                      id="chatbot.popoutMessage"
                      defaultMessage="Hi! 👋 I&rsquo;m an AI assistant that helps you find information."
                    />
                  </div>
                  <div className="close-popout-btn"><Icon onClick={() => showPopout(false)} src={Clear} /></div>
                </div>
              </Popover.Content>
            </Popover>
          )}
        >
          <div className="ga-chat-bot-icon" onClick={init}>
            <img alt="chat bot icon" style={{ height: '60px', width: '60px', color: '#36c' }} src="https://hutech-media.goamazing.org/hutech-statics/media/images/hutech_chatbot_icon.png" />
          </div>
        </OverlayTrigger>
        )}
        {
            loaded
            && (
            <div className="ga-chat-body" style={{ display: opened ? 'block' : 'none' }}>
              <iframe title="AI assistant" style={{ border: '0' }} src="https://learner-help-bot.goamazing.org?languageCode=vi&allowOpenPostInNewWindow=yes&initState=opened" height="100%" width="100%" allow="fullscreen *" />
            </div>
            )
        }
      </div>
    </div>
  );
};

ChatBot.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ChatBot);
