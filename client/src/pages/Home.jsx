import React from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import JobListing from '../Components/JobListing'
import Footer from '../Components/Footer'
import Carousel from '../Components/Carousel'

function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <JobListing />
      <Footer />
    </div>
  )
}

export default Home
