import React, { useState, useEffect } from 'react';
import { injectIntl, intlShape, FormattedMessage } from '@edx/frontend-platform/i18n';
import { Clear } from '@openedx/paragon/icons';
import { OverlayTrigger, Popover, Icon } from '@openedx/paragon';
import './chat-bot.scss';

export const ChatBot = ({ intl }) => {
  const [loaded, setLoaded] = useState(false);
  const [opened, setOpened] = useState(false);
  const [popoutOpened, setPopoutOpened] = useState(false);

  const init = () => {
    setOpened(true);
    if (loaded) {
      return;
    }

    window.addEventListener('message', (event) => {
      if (event.origin !== 'https://learner-help-bot.goamazing.org') {
        return;
      }

      if (event.data && event.data.isBotOpen === false) {
        setOpened(false);
      }
    }, false);

    setLoaded(true);
  };

  const showPopout = (show) => {
    setPopoutOpened(show);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const localStorageKey = 'show_chatbot_popout';
      const now = Date.now(); // Use timestamp directly
      const storedExpiry = localStorage.getItem(localStorageKey);

      let shouldShowPopout = true;

      if (storedExpiry && now < Number(storedExpiry)) {
      // Popout is still within the cooldown period
        shouldShowPopout = false;
      } else {
      // Set a new 30-day expiry
        const expiry = now + 30 * 24 * 60 * 60 * 1000; // 30 days
        localStorage.setItem(localStorageKey, expiry.toString());
      }

      if (shouldShowPopout) {
        showPopout(true);

        // Auto-hide popout after 8 seconds
        setTimeout(() => {
          showPopout(false);
        }, 8000);
      }
    }, 5000); // Wait 3 seconds before checking

    return () => clearTimeout(timeoutId); // Cleanup on unmount
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
