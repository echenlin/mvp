import Globe from 'react-globe.gl';
import { useState, useEffect } from 'React';


const MyGlobe = ({ handleClick }) => {
  const [countries, setCountries] = useState({ features: []});

  useEffect(() => {
    // load data
    fetch('./ne_110m_admin_0_countries.geojson').then(res => {
       return res.json()}).then(setCountries);
  }, []);


  return (
    <div className='page-body'>
      <div className='map' style={{width:'80vw', height: 'auto'}}>
        <Globe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          polygonsData={countries.features}
          polygonCapColor	={() => `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(1, '0')}`}
          polygonLabel={({ properties: d }) => `<b>${d.ADMIN}</b>`}
          onPolygonClick={handleClick}
        />
      </div>
    </div>
  )
};

export default MyGlobe;
