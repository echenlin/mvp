import Globe from 'react-globe.gl';

import axios from 'axios';
import NewsList from './NewsList.jsx';
import CollectionList from './CollectionList.jsx';

import { useState, useEffect } from 'React';

const MyGlobe = () => {
  const [countries, setCountries] = useState({ features: []});
  const [countryLookup, setCountryLookup] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [collectionList, setCollectionList] = useState([]);
  const [currentCountry, setCurrentCountry] = useState('US');
  const [currentTab, setCurrentTab] = useState(1);
  const [position, setPosition] = useState({
    coordinates: [0, 0],
    zoom: 1
  });

  const handleMoveEnd = (position) => {
    setPosition(position)
  }

  useEffect(() => {
    axios.get('/country-lookup.json')
      .then((response) => {
        setCountryLookup(response.data)
      })

    axios.get(`https://api.gdeltproject.org/api/v2/doc/doc?query=%20sourcecountry:US&mode=ArtList&maxrecords=3&sort=DateDesc&timespan=1d`)
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

  useEffect(() => {
    // load data
    fetch('./ne_110m_admin_0_countries.geojson').then(res => {
      console.log(res.body)
       return res.json()}).then((g) => {
        console.log('d', g)
        setCountries(g)
       });
  }, []);

  const handleClick = ({ properties: d }) => {
    console.log(`${d.ADMIN}`)
    const name = `${d.ADMIN}`;
    setCurrentCountry(name);
    if (countryLookup[name] === undefined) {
      console.log('not in list: ', name)
      return;
    }
    axios.get(`https://api.gdeltproject.org/api/v2/doc/doc?query=%20sourcecountry:${countryLookup[name]}&mode=ArtList&maxrecords=3&sort=DateDesc&timespan=1d`)
      .then((htmlString) => {
        const dom = new DOMParser().parseFromString(htmlString.data, 'text/html');
        const myElements = dom.getElementById('maincontent').querySelectorAll('a');
        // convert nodeList to array
        setNewsList(Array.from(myElements));
      })
  }


  return (
  <div className='page-body'>
  <div className='map' style={{width:'80vw', height: 'auto'}}>
  <Globe
    globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
    backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
    polygonsData={countries.features}
    polygonCapColor	={() => `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(1, '0')}`}
    polygonLabel={({ properties: d }) => `
    <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
    Population: <i>${d.POP_EST}</i>
    `}
    onPolygonClick={handleClick}
    />
  </div>
  <div id='news'>
    <div id='bloc-tabs'>
      <div
        className={currentTab === 1? 'active-tab' : 'tabs'}
        onClick={() => toggleTab(1)}>
        <h2>{currentCountry} NEWS</h2>
      </div>
      <div
        className={currentTab === 2? 'active-tab' : 'tabs'}
        onClick={() => toggleTab(2)}>
        <h2>COLLECTION</h2>
      </div>
    </div>
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
</div>
  )
};


export default MyGlobe;
