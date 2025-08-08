import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Breadcrumb, FullscreenModal, ActionRow, Button, useToggle, Container
} from '@openedx/paragon';
import ReactMarkdown from 'react-markdown';
import './News.scss';
import newsList from './news_list';
import Footer from '@edx/frontend-component-footer';
import Header from '@edx/frontend-component-header';
import NavigationTopBar from '../components/NavigationTopBar/NavigationTopBar';
import './NewsDetailsModal.scss';

const NewsDetailModal = ({slug}) => {
  const [isOpen, open, close] = useToggle(false);
  const [content, setContent] = useState('');

   useEffect(() => {
     const fetchNews = async () => {
       try {
         const module = await import(`!raw-loader!../news/news/${slug}.md`);
         setContent(module.default);
       } catch (err) {
         setError(err.message);
       }
     };
 
     fetchNews();
   }, [slug]);

  return (
    <div className='news-details-modal'>
      <Button variant="outline-primary" onClick={open}>Open fullscreen modal</Button>
      <FullscreenModal
        title=""
        isOpen={isOpen}
        onClose={close}
        // footerNode={(
        //   <ActionRow>
        //     <ActionRow.Spacer />
        //     <Button variant="tertiary" onClick={close}>Cancel</Button>
        //     <Button>Submit</Button>
        //   </ActionRow>
        // )}
        isOverflowVisible={false}
      >
        <Container size="md">
        <ReactMarkdown>{content}</ReactMarkdown>
        </Container>
      </FullscreenModal>
    </div>
  );
};

export default NewsDetailModal;