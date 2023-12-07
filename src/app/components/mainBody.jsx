'use client'
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import BeaconCarousel from './Beacon/beaconCarousel';

export default function MainBody({session}) {
   const [carouselIndex, setCarouselIndex] = useState(null);
   
   //const index = urlParams.get('i')
      return (
         <main>
            <Navbar session={session} setCarouselIndex ={setCarouselIndex} />
            <BeaconCarousel session={session} carouselIndex={carouselIndex}/>
         </main>
      );
}
