// BootstrapCarousel.js
import React from 'react';
import { Carousel } from 'react-bootstrap';

const BootstrapCarousel = ({ images }) => {
  return (
    <Carousel>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img className="d-blok m-auto w-50" src={image} alt={`slide-${index}`} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default BootstrapCarousel;
