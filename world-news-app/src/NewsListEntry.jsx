import './NewsListEntry.css';
import axios from 'axios';

const NewsListEntry = ({ news, collectionList, setCollectionList  }) => {
  //TODO: the news time is hardcoded
  const articleTitle = news.getElementsByClassName('arttitle')[0].innerHTML;
  const articleLink = news.getAttribute('href');
  const sourceInfo = news.getElementsByClassName('sourceinfo')[0].textContent.split('(')[0].trim('');

  const handleClick = (articleTitle, articleLink) => {
    const data = {title: articleTitle, link: articleLink}
    setCollectionList([...collectionList, data]);
    axios.post('http://localhost:5173/news', data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div id='news-list-entry' className='list-entry text-white text-xl bg-blue-900 bg-opacity-50 p-4 rounded-2xl p-5 m-10'>
      <a href={articleLink}>
        <img className='thumbimg'
          src={
            news.getElementsByClassName('thumbimg').length !== 0 ?
            news.getElementsByClassName('thumbimg')[0].getAttribute('src') :
            null
          }
          />
        <span className='article-title'>{articleTitle}</span><br/>
        <span
          className='source-info'>
            {
              sourceInfo.split(' ')[0]
            }
            <br/>
            {
              sourceInfo.split(' ').slice(1).join(' ').trim()
            }
        </span>
      </a>
      <br/>
      <button
        className='mt-2 bg-transparent hover:bg-blue-500 text-blue-300 hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded'
        onClick={() => handleClick(articleTitle, articleLink)}>
        collect
      </button>

    </div>
  );
};

export default NewsListEntry;