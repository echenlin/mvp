import Globe from 'react-globe.gl';
import { useState, useEffect } from 'react';


const MyGlobe = ({ handleClick }) => {
  const [countries, setCountries] = useState({ features: []});

  useEffect(() => {
    // load data
    fetch('./ne_110m_admin_0_countries.geojson').then(res => {
      return res.json()}).then(setCountries);
  }, []);


  return (
    <Globe
      width='700'
      height='600'
      // backgroundColor='white'
      // globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      // backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      backgroundColor='rgb(0,0,0,0)'
      polygonsData={countries.features}
      polygonCapColor	={() => `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(1, '0')}`}
      polygonLabel={({ properties: d }) => `<b>${d.ADMIN}</b>`}
      onPolygonClick={handleClick}
    />
  )
};

export default MyGlobe;
