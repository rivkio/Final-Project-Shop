"use client";

import { Carousel } from "flowbite-react";

const CarouselComponent: React.FC = () => {
    return (
        <div className="h-80 sm:h-86 xl:h-[30rem] 2xl:h-[45rem]">
            <Carousel pauseOnHover>
                <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
            </Carousel>
        </div>
    );
}

export { CarouselComponent };