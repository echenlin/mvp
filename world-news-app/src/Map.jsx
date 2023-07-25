import { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Annotation, ZoomableGroup, Sphere, Graticule, Marker } from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';

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
      <div style={{width:'100vw', height: 'auto'}}>

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
                  // get the centroid of the country
                  const centroid = geoCentroid(geo);
                  const { name } = geo.properties
                  return (
                    <>
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={'#000'}
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
    </div>
  )
};

export default Map;