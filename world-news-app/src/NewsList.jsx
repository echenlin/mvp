import { useState } from 'react';
import NewsListEntry from './NewsListEntry.jsx'

const NewsList = ({ newsList }) => {
  return (
    <div>
      NEWS
      {newsList.map((news, index) => {
        return <NewsListEntry news={news} key={index} />
      })}
    </div>
  );
};

export default NewsList;