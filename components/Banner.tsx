/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

type Props = {}

const Banner = (props: Props) => {
  return (
    <div className="relative w-full z-0">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={5000}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}>
        <div>
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/61DUO0NqyyL._SX3000_.jpg"
            alt="carousel"
          />
        </div>

        <div>
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/71qid7QFWJL._SX3000_.jpg"
            alt="carousel"
          />
        </div>

        <div>
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/71tIrZqybrL._SX3000_.jpg"
            alt="carousel"
          />
        </div>

        <div>
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/61TD5JLGhIL._SX3000_.jpg"
            alt="carousel"
          />
        </div>

        <div>
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/61jovjd+f9L._SX3000_.jpg"
            alt="carousel"
          />
        </div>
      </Carousel>
    </div>
  )
}

export default Banner
