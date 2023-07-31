import './App.css'
// import Map from './Map.jsx'
import MyGlobe from './MyGlobe.jsx'
import axios from 'axios';
import NewsList from './NewsList.jsx';
import CollectionList from './CollectionList.jsx';
import { useState, useEffect } from 'react';


const App = () => {
  const [countryLookup, setCountryLookup] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [collectionList, setCollectionList] = useState([]);
  const [currentCountry, setCurrentCountry] = useState('US');
  const [currentTab, setCurrentTab] = useState(1);
  const [dataSort, setDataSort] = useState('DateDesc');
  const [queryCount, setQueryCount] = useState(50);
  const [pageColor, setPageColor] = useState(true);

  const gdeltApi = 'https://api.gdeltproject.org/api/v2/doc/doc?query=%20';

  useEffect(() => {
    if (pageColor) {
      document.body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1620646233562-f2a31ad24425?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)'
    } else {
      document.body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1611416457332-946853cc75d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1571&q=80)'
    }
  }, [pageColor]);


  useEffect(() => {
    axios.get('/country-lookup.json')
      .then((response) => {
        setCountryLookup(response.data)
      })
    axios.get(`${gdeltApi}sourcecountry:US&mode=ArtList&maxrecords=${queryCount}&sort=DateDesc&timespan=1d`)
      .then((htmlString) => {
        const dom = new DOMParser().parseFromString(htmlString.data, 'text/html');
        const myElements = dom.getElementById('maincontent').querySelectorAll('a');
        // convert nodeList to array
        setNewsList(Array.from(myElements));
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('http://localhost:5173/news')
      .then((response) => {
        setCollectionList(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const toggleTab = (tab) => {
    setCurrentTab(tab);
  }

  const handleClick = ({ properties: d }) => {
    console.log(`${d.ADMIN}`)
    const name = `${d.ADMIN}`;
    setCurrentCountry(name);
    if (countryLookup[name] === undefined) {
      console.log('not in list: ', name)
      return;
    }
    console.log('url', `${gdeltApi}sourcecountry:${countryLookup[name]}&mode=ArtList&maxrecords=${queryCount}&sort=${dataSort}&timespan=1d`)
    axios.get(`${gdeltApi}sourcecountry:${countryLookup[name]}&mode=ArtList&maxrecords=${queryCount}&sort=${dataSort}&timespan=1d`)
      .then((htmlString) => {
        const dom = new DOMParser().parseFromString(htmlString.data, 'text/html');
        const myElements = dom.getElementById('maincontent').querySelectorAll('a');
        // convert nodeList to array
        setNewsList(Array.from(myElements));
      })
  }

  return (
    <>
      <div id='page-header'>
        {/* <div id='title'>
          <h1>WORLD NEWS</h1>
        </div> */}
        <div id='bloc-tabs'>
          <div
            id='news-tab'
            className={currentTab === 1? 'active-tab' : 'tabs'}
            onClick={() => toggleTab(1)}>
            <h1>WORLD NEWS - {currentCountry}</h1>
          </div>
          <div
            id='collection-tab'
            className={currentTab === 2? 'active-tab' : 'tabs'}
            onClick={() => toggleTab(2)}>
            <h2>COLLECTION</h2>
          </div>
        </div>
      </div>
      <div id='data-queries'>
        <label for='data-sort'>
          sort by:
          <select name='data-sort' id='data-sort'
            onChange={(e) => {
              console.log(e.target.value)
              setDataSort(e.target.value)
            }}
            defaultValue={dataSort} >
            <option value='DateDesc'>date-desc</option>
            <option value='DateAsc'>date-asc</option>
            {/* <option value='ToneDesc'>tone-desc</option>
            <option value='ToneAsc'>tone-asc</option> */}
          </select>
        </label>
        <div>
          <button onClick={() => setQueryCount(queryCount - 1)}>-</button>
          <span>{queryCount}</span>
          <button onClick={() => setQueryCount(queryCount + 1)}>+</button>
        </div>
      <div className='background-toggle'>
        <label className="switch">
          <input type="checkbox" onClick={() => {
            setPageColor(!pageColor);
          }
          } />
          <span className="slider round"></span>
        </label>
      </div>
      </div>
      <div id='page-content'>
        <div id='news'>
          <div id='news-list' className={currentTab === 1? 'active-content' : 'content'}>
            <NewsList
              newsList={newsList}
              collectionList={collectionList}
              setCollectionList={setCollectionList} />
          </div>
          <div id='news-collection' className={currentTab === 2? 'active-content' : 'content'}>
            <CollectionList
              collectionList={collectionList}
              setCollectionList={setCollectionList}/>
          </div>
        </div>
        <div id='globe'>
          <MyGlobe handleClick={handleClick}/>
        </div>
      </div>
    </>
  )
}

export default App
