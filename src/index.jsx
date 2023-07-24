import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {
  getConfig,
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';
import messages from './i18n';
// import { UnAuthOnlyRoute } from './components';
import Homepage from './homepage/Homepage';
import FAQPage from './FQAPage/FAQPage';
import UnAuthOnlyRoute from './components/UnAuthOnlyRoute';
import './index.scss';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <Helmet>
        <link rel="shortcut icon" href={getConfig().FAVICON_URL} type="image/x-icon" />
      </Helmet>
      <UnAuthOnlyRoute exact path="/" render={() => <Homepage />} />
      <Switch>
        <Route exact path="/faq" component={FAQPage} />
      </Switch>
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
