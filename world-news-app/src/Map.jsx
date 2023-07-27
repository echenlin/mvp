import { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Annotation, ZoomableGroup, Sphere, Graticule, Marker } from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import axios from 'axios';
import NewsList from './NewsList.jsx';
import CollectionList from './CollectionList.jsx';
import './map.css';


const geoUrl = '/features.json';
// const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';


const Map = () => {
  const [countryLookup, setCountryLookup] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [collectionList, setCollectionList] = useState([]);
  const [currentCountry, setCurrentCountry] = useState('US');
  const [position, setPosition] = useState({
    coordinates: [0, 0],
    zoom: 1
  });

  const handleMoveEnd = (position) => {
    setPosition(position)
  }

  const handleClick = (name) => {
    console.log(name,'clicked!');
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
  }, [])

  return (
    <div className='page-body'>
      <div className='map' style={{width:'80vw', height: 'auto'}}>
        <ComposableMap
          projectionConfig={{
            scale: 147
          }}>

          <ZoomableGroup
            zoom={position.zoom}
            cernter={position.coordinates}
            onMoveEnd={handleMoveEnd}
            >
            <Sphere stroke='#000' strokeWidth={0.3}/>
            <Graticule strok='#000' strokeWidth={0.3}/>
            <Geographies geography={geoUrl}>
              {({geographies}) => (
                geographies.map((geo) => {
                  // get the centroid of the country
                  const centroid = geoCentroid(geo);
                  const { name } = geo.properties
                  // if (countryLookup[name] === undefined) {
                  //   console.log('not in list: ', name)
                  // }
                  return (
                    <>
                      <Geography
                        key={geo.rsmKey}
                        name={name}
                        geography={geo}
                        fill={'#415a77'}
                        onClick={() => handleClick(name)}
                      />
                      <Marker key={name} coordinates={centroid}>
                        <text
                          textAnchor="middle"
                          style={{ fontFamily: "system-ui", fill: "#F0F8FF", fontSize: '6px' }} >
                          {name}
                        </text>
                      </Marker>
                    </>
                  )
                })
              )}

            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      <div id='news'>
        <div id='news-list'>
          <h2>{currentCountry} NEWS</h2>
          <NewsList newsList={newsList} collectionList={collectionList} setCollectionList={setCollectionList} />
        </div>
        <div id='news-collection'>
          <h2>COLLECTION</h2>
          <CollectionList collectionList={collectionList} setCollectionList={setCollectionList}/>
        </div>
      </div>
    </div>
  )
};

export default Map;