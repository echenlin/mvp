import Globe from 'react-globe.gl';
import { useState, useEffect } from 'react';


const MyGlobe = ({ handleClick }) => {
  const [countries, setCountries] = useState({ features: []});
  const [hoverD, setHoverD] = useState();

  useEffect(() => {
    // load data
    fetch('./ne_110m_admin_0_countries.geojson').then(res => {
      return res.json()}).then(setCountries);
  }, []);

  return (
    <Globe
      width='700'
      height='600'
      backgroundColor="rgba(0,0,0,0)"
      showGlobe={false}
      showAtmosphere={false}
      polygonsData={countries.features}
      polygonAltitude={d => d === hoverD ? 0.12 : 0.06}
      // polygonCapColor={d => d === hoverD ? 'white' : 'lavender'}
      polygonCapColor={d => d === hoverD ? 'white' : 'lightsteelblue'}
      polygonSideColor={() => "rgba(0,0,0,0)"}
      polygonStrokeColor={() => '#111'}
      polygonLabel={({ properties: d }) => `<b>${d.ADMIN}</b>`}
      onPolygonClick={handleClick}
      onPolygonHover={setHoverD}
      polygonsTransitionDuration={30}
    />
  )
};

export default MyGlobe;
