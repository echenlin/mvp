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
    <div id='collection-list-entry' className='list-entry text-white text-xl bg-blue-900 bg-opacity-50 p-4 rounded-2xl p-5 m-10'>
      <a href={news.link}>
        <span>{news.title}</span>
      </a>
      <br/>
      <button
        className='mt-2 bg-transparent hover:bg-blue-500 text-blue-300 hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded'
        onClick={() => handleClick(news)}>
        remove
      </button>
    </div>
  );
};

export default CollectionListEntry;