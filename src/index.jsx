// import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';
import {
  Route, Routes,
} from 'react-router-dom';
import messages from './i18n';
import Homepage from './homepage/Homepage';
import FAQPage from './FAQPage/FAQPage';
import NewsDetail from './news/NewsDetail';
import News from './news/News';
import Head from './Head';
import './index.scss';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <Head />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/faq" element={<FAQPage/>} />
        <Route exact path="/news" element={<News/>} />
        <Route path="/news/:slug" element={<NewsDetail/>} />
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
