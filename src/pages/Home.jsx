import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../Requests'

const Home = () => {
  return (
    <>
        <Main/>
        <Row rowId='1' title='Top rated' fetchURL={requests.requestTopRated}/>
        <Row rowId='2' title='Popular' fetchURL={requests.requestPopular}/>
        <Row rowId='3' title='Trending' fetchURL={requests.requestTrending}/>
        <Row rowId='4' title='Up Coming' fetchURL={requests.requestUpcoming}/>
        <Row rowId='5' title='Horor' fetchURL={requests.requestHorror}/>
        
    </>
  )
}

export default Home