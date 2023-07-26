import { useState } from 'react';

const NewsList = ({ news }) => {
  console.log('news', news);
  const test = news.getElementById('maincontent');
  return (
    <div>
      NEWS
      {test}
    </div>
  );
};

export default NewsList;