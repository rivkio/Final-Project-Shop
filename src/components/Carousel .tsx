import React from 'react';
import { Carousel } from 'flowbite-react';

const CarouselComponent: React.FC = () => {
    return (
        <div className="h-80 sm:h-86 xl:h-[30rem] 2xl:h-[45rem]">
            <Carousel pauseOnHover>
                <img src="img/Teal Yellow Playful Fashion Kids Discount Facebook Cover.png" alt="Kids Collection Cover" />
            </Carousel>
        </div>
    );
}

export { CarouselComponent };