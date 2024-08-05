import React from 'react';
import { Carousel } from 'flowbite-react';
import './Carousel.scss';

const CarouselComponent: React.FC = () => {
    return (
        <div className="custom-carousel-container h-60 sm:h-86 xl:h-[30rem] 2xl:h-[30rem] mx-auto">
            <Carousel pauseOnHover>
                <img src="img/Teal Yellow Playful Fashion Kids Discount Facebook Cover.png" alt="Kids Collection Cover" />
            </Carousel>
        </div>
    );
}

export { CarouselComponent };
