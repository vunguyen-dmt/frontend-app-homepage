import React, { forwardRef, useImperativeHandle, useState, useEffect, } from 'react';
import {
  StandardModal, useToggle, Container
} from '@openedx/paragon';
import './News.scss';
import './NewsDetailsModal.scss';
import NewsBody from './NewsBody';

const NewsDetailModal = forwardRef(({base}, ref) => {
  const [isOpen, open, close] = useToggle(false);
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  

  useImperativeHandle(ref, () => ({
    openModal(openSlug) {
      window.history.replaceState({}, '', `/home/news/${openSlug}`);
      setSlug(openSlug)
      open();
    },
  }));

  const onClose = () => {
    window.history.replaceState({}, '', `${base}`);
    close();
  }

  const fetchNews = async () => {
    try {
      const module = await import(`!raw-loader!../news/news/${slug}.md`);
      setContent(module.default);
    } catch (err) {
    console.log(err)
    }
  };

   useEffect(() => {
     fetchNews();
     console.log(slug)
   }, [slug]);

  return (
    <div >
      <StandardModal
        className='news-details-modal'
        title=""
        isOpen={isOpen}
        onClose={onClose}
        isOverflowVisible={false}
      >
        <Container size="md"><NewsBody content={content} /></Container>
      </StandardModal>
    </div>
  );
});

export default NewsDetailModal;