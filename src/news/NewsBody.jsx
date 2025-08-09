import React from 'react';
import ReactMarkdown from 'react-markdown';
import './NewsBody.scss';

const NewsBody = ({content}) => {
  return <div className='news-body'><ReactMarkdown>{content}</ReactMarkdown></div>;
};

export default NewsBody;