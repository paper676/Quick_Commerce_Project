import React, { useEffect, useRef, useState } from 'react';

const images = [
    'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide1.png',
    'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide2.png',
    'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide3.png',
    'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide4.png',
    'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide5.png',
];

function ImageGallery() {
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const goToSlide = (index) => {
        if (sliderRef.current) {
            const slideWidth = sliderRef.current.offsetWidth;
            sliderRef.current.scrollTo({
                left: index * slideWidth,
                behavior: 'smooth',
            });
            setCurrentSlide(index);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => {
                const nextSlide = (prev + 1) % images.length;
                goToSlide(nextSlide);
                return nextSlide;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='w-full pt-2 flex flex-col items-center'>
            <div
                ref={sliderRef}
                className="w-full max-w-6xl h-[30rem] overflow-hidden relative scroll-smooth border border-white rounded-md"
            >
                <div className='flex w-full h-full'>
                    {images.map((src, idx) => (
                        <div key={idx} className='w-full flex-shrink-0 h-full'>
                            <img
                                src={src}
                                alt={`Slide ${idx + 1}`}
                                className='w-full h-full object-cover'
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex items-center mt-5 space-x-2'>
                {images.map((_, idx) => (
                    <span
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`w-3 h-3 rounded-full cursor-pointer ${currentSlide === idx ? 'bg-black' : 'bg-black/20'
                            }`}
                    ></span>
                ))}
            </div>
        </div>
    );
}

export default ImageGallery;