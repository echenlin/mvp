import { useState } from 'react';
import NewsListEntry from './NewsListEntry.jsx'

const NewsList = ({ newsList, collectionList, setCollectionList }) => {
  return (
    <div>
      {newsList.map((news, index) => {
        return <NewsListEntry key={index} news={news} collectionList={collectionList} setCollectionList={setCollectionList} />
      })}
    </div>
  );
};

export default NewsList;