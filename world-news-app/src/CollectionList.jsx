import { useState } from 'react';
import CollectionListEntry from './CollectionListEntry.jsx'

const CollectionList = ({ collectionList, setCollectionList }) => {
  return (
    <div>
      {collectionList.map((news, index) => {
        return <CollectionListEntry key={index} news={news} collectionList={collectionList} setCollectionList={setCollectionList} />
      })}
    </div>
  );
};

export default CollectionList;