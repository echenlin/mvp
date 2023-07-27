import './NewsListEntry.css'

const NewsListEntry = ({ news }) => {
  //TODO: the news time is hardcoded
  return (
    <div className='news-list-entry'>
      <a href={news.getAttribute('href')}>
        <img className='thumbimg'
          src={
            news.getElementsByClassName('thumbimg').length !== 0 ?
            news.getElementsByClassName('thumbimg')[0].getAttribute('src') :
            null
          }
          />
        <span className='article-title'>{news.getElementsByClassName('arttitle')[0].innerHTML}</span><br/>
        <span className='source-info'>{news.getElementsByClassName('sourceinfo')[0].textContent.split('(')[0].trim('')}</span>
      </a>

    </div>
  );
};

export default NewsListEntry;