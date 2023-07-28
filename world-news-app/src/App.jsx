// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Map from './Map.jsx'
// import Globe from 'react-globe.gl';
import MyGlobe from './MyGlobe.jsx'



const App = () => {
  return (
    <>
      <div id='page-header'>
        <h1>World News</h1>
      </div>
      <MyGlobe />
      {/* <Map /> */}
      </>
  )
}

export default App
