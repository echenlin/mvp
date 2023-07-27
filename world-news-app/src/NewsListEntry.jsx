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
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className='news-list-entry'>
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
      <button onClick={() => handleClick(articleTitle, articleLink)}>add to collection</button>

    </div>
  );
};

export default NewsListEntry;