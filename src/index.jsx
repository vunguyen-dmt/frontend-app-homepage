// import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {
  getConfig,
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import {
  Route, Routes,
} from 'react-router-dom';
import messages from './i18n';
// import { UnAuthOnlyRoute } from './components';
import Homepage from './homepage/Homepage';
import FAQPage from './FQAPage/FAQPage';
import UnAuthOnlyRoute from './components/UnAuthOnlyRoute';
import Head from './Head';
import './index.scss';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <Head />
      {/* <UnAuthOnlyRoute exact path="/" render={() => <Homepage />} /> */}
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/faq" element={<FAQPage/>} />
      </Routes>
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages,
});
