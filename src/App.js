import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default function App () {
  const apikey=process.env.REACT_APP_NEWS_API
  const [progress, setProg] = useState(0)
  // const apiKey = process.env.REACT_APP_API_KEY;
  const setProgress =(progress) =>{
    setProg(progress)
  }
  // state={
  //   progress:0,
  // }
  // setProgress = (progress) =>{
  //   this.setState({progress:progress})
  // }
    return (
      <Router>
        <div>
          <Navbar />
          <LoadingBar
          height ={4}
        color='#f11946'
        progress={progress}
      />
          <Routes>
            <Route exact path="/" element={<News  setProgress={setProgress} apikey={apikey} key="1" pageSize={6} country="in" category="general" />} />
            <Route exact path="/business" element={<News  setProgress={setProgress} apikey={apikey} key="2" pageSize={6} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} key="3" pageSize={6} country="in" category="entertainment" />} />
            <Route exact path="/general" element={<News  setProgress={setProgress} apikey={apikey} key="4" pageSize={6} country="in" category="general" />} />
            <Route exact path="/science" element={<News  setProgress={setProgress} apikey={apikey} key="5" pageSize={6} country="in" category="science" />} />
            <Route exact path="/health" element={<News  setProgress={setProgress} apikey={apikey} key="6" pageSize={6} country="in" category="health" />} />
            <Route exact path="/sports" element={<News  setProgress={setProgress} apikey={apikey} key="7" pageSize={6} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News  setProgress={setProgress} apikey={apikey} key="8" pageSize={6} country="in" category="technology" />} />
          </Routes>
        </div>
      </Router>


    )
}

