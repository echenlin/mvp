import { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Annotation, ZoomableGroup, Sphere, Graticule } from 'react-simple-maps';

const geoUrl = '/features.json';
// const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';


const Map = () => {
  const [position, setPosition] = useState({
    coordinates: [0, 0],
    zoom: 1
  });

  const handleMoveEnd = (position) => {
    setPosition(position)
  }

  return (
    <div className='map'>
      <div style={{width:'50vw', height:'50vh'}}>

        <ComposableMap
          projectionConfig={{
            scale: 147
          }}>

          <ZoomableGroup
            zoom={position.zoom}
            cernter={position.coordinates}
            onMoveEnd={handleMoveEnd}
            >
            {/* <Sphere stroke='#000' strokeWidth={0.3}/> */}
            {/* <Graticule strok='#000' strokeWidth={0.3}/> */}
            <Geographies geography={geoUrl}>
              {({geographies}) => (
                geographies.map((geo) => {
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={'#000'}
                    />
                  )
                })
              )}

            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  )
};

export default Map;