import axios from 'axios';

const CollectionListEntry = ({ news, collectionList, setCollectionList }) => {
  const handleClick = (news) => {
    // remove news from collectionList
    collectionList.splice(collectionList.indexOf(news), 1);
    setCollectionList([...collectionList]);

    // delete news from db
    axios.delete('http://localhost:5173/news', { data: {title: news.title, link: news.link} })
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }


  return (
    <div id='collection-list-entry' className='list-entry'>
      <a href={news.link}>
        <span>{news.title}</span>
      </a>
      <br/>
      <button onClick={() => handleClick(news)}>remove</button>
    </div>
  );
};

export default CollectionListEntry;