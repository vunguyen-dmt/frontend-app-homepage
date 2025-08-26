import React, { useEffect, useState } from 'react';
import Footer from '@edx/frontend-component-footer';
import {
  Collapsible, Breadcrumb,
} from '@openedx/paragon';
import { Helmet } from 'react-helmet';
import { useIntl } from '@edx/frontend-platform/i18n';
import * as qs from 'qs';
import './FAQPage.scss';
import NavigationTopBar from '../components/NavigationTopBar/NavigationTopBar';
import messages from '../messages/messages';

const FAQPage = () => {
  const { formatMessage } = useIntl();
  const [FAQList, setFAQList] = useState([]);
  const roles = ['student', 'instructor'];
  const parseRole = () => {
    const { role } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    return roles.includes(role) ? role : 'student';
  };

  useEffect(() => {
    const url = `https://hutech-media.goamazing.org/hutech-statics/media/home-page-resources/${parseRole()}-faq.json?t=${+new Date()}`;
    fetch(url).then(response => response.json())
      .then(data => {
        setFAQList(data.data);
      }).catch(err => {
        console.log(`error loading faq: ${err}`);
      });
  }, []);

  return (
    <div>
      <Helmet><title>FAQ | HUTECH eLearning</title></Helmet>
      {/* <Header /> */}
      <NavigationTopBar />
      <div className="faq-wrapper mx-auto container-mw-lg">
        <Breadcrumb
          ariaLabel="Breadcrumb is active"
          links={[
            { label: formatMessage(messages.home), href: '/home/' },
          ]}
          activeLabel="FAQ"
        />
        <div className="font-weight-bold py-3 text-center tl">{formatMessage(messages.faqFrequentlyAskedQuestions)}</div>
        {
            FAQList.map(item => (
              <Collapsible
                className="collapsible-card"
                title={item.question}
              >
                <div dangerouslySetInnerHTML={{ __html: item.answer }} />
              </Collapsible>
            ))
        }
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;
