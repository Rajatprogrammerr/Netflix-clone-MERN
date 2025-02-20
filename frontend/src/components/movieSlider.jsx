import { useContentStore } from '../store/content';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { SMALL_IMG_BASE_URL } from '../utils/constant';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MovieSlider = ({ category }) => {
    const { contentType } = useContentStore();
    const [content, setContent] = useState([]);
    const sliderRef = useRef(null);

    const formattedCategory = category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
    const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

    useEffect(() => {
        const getContent = async () => {
            const res = await axios.get(`/api/${contentType}/${category}`);
            setContent(res.data.content);
        };

        getContent();
    }, [contentType, category]);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth / 1.5, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth / 1.5, behavior: "smooth" });
    };

    return (
        <div className="relative my-8 px-4 md:px-8 lg:px-16">
            <h2 className="text-2xl md:text-3xl text-white mb-4">
                {formattedCategory} {formattedContentType}
            </h2>

            <div className="relative">
                <div
                    ref={sliderRef}
                    className="flex space-x-4 overflow-x-scroll scroll-smooth md:no-scrollbar snap-x snap-mandatory"
                >
                    {content.map((item) => (
                        <Link
                            to={`/watch/${item.id}`}
                            className="min-w-[150px] sm:min-w-[200px] md:min-w-[250px] lg:min-w-[280px] xl:min-w-[300px] relative group snap-start"
                            key={item.id}
                        >
                            <div className="rounded-lg overflow-hidden">
                                <img
                                    src={SMALL_IMG_BASE_URL + item.backdrop_path}
                                    alt={item.title || item.name}
                                    className="transition-transform duration-300 ease-in-out group-hover:scale-110 w-full h-auto object-cover"
                                />
                            </div>
                            <p className="text-center text-sm sm:text-md md:text-lg text-white mt-2">{item.title || item.name}</p>
                        </Link>
                    ))}
                </div>

                {/* Navigation Arrows - Only Show on Large Screens */}
                <button
                    className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-2 md:left-5 lg:left-8 xl:left-12 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
                    onClick={scrollLeft}
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-2 md:right-5 lg:right-8 xl:right-12 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
                    onClick={scrollRight}
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default MovieSlider;
