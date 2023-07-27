import { useState } from 'react';
import CollectionListEntry from './CollectionListEntry.jsx'

const CollectionList = ({ collectionList }) => {
  return (
    <div>
      {collectionList.map((news, index) => {
        return <CollectionListEntry news={news} key={index} />
      })}
    </div>
  );
};

export default CollectionList;