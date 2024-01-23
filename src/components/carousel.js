import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'

const Carousel = () => {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);
    const [listed, setListed] = useState(3);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [favoriteImages, setFavoriteImages] = useState([]);
    const [autoPlay, setAutoPlay] = useState(false)


    useEffect(() => {
        getPhotos();
    }, []);


    const handleAutoPlay = () => {
        setAutoPlay((prevAutoPlay) => !prevAutoPlay); // Toggle autoPlayActive state
    };

    useEffect(() => {
        let intervalId;

        if (autoPlay) {
            intervalId = setInterval(() => {
                handleNext(); // Move to the next photo
            }, 2000);
        } else {
            clearInterval(intervalId); // Clear the interval when auto play is deactivated
        }

        return () => {
            clearInterval(intervalId); // Cleanup interval on component unmount or state change
        };
    }, [autoPlay, currentIndex]);


    const getPhotos = async () => {
        try {
            let response = await fetch('https://jsonplaceholder.typicode.com/photos');
            if (response.ok) {
                let images = await response.json();
                setPhotos(images);
            }
        } catch (e) {
            console.error("NO PHOTO CLAIMED");
        }
    }

    const handleNext = () => {
        const temp = (currentIndex + 1) % photos.length;
        setCurrentIndex(temp);
    }

    const handlePrev = () => {
        const temp = (currentIndex - 1 + photos.length) % photos.length;
        setCurrentIndex(temp);
    }

    const handleAddToFavorites = (id) => {
        const isFavorite = favoriteImages.includes(id);
        if (isFavorite) {
            setFavoriteImages((prevFavorites) =>
                prevFavorites.filter((favId) => favId !== id)
            );
        } else {
            setFavoriteImages((prevFavorites) => [...prevFavorites, id]);
        }
    };

    const visibleFavorites = () => {
        return favoriteImages.map((id) => {
            const photo = photos.find((p) => p.id === id);
            return <li key={id}>{photo.title}</li>;
        });
    }

    const visiblePhotos = () => {
        const start = currentIndex;
        const end = start + listed;
        return photos.slice(start, end).map((photo) => (
            <div key={photo.id}>
                <img
                    src={photo.url}
                    alt={photo.title}
                    onClick={() => handleAddToFavorites(photo.id)}
                    className={favoriteImages.includes(photo.id) ? 'favorite' : ''}
                />
            </div>
        ));
    };

    return (
        <div>
            <div>
                <button onClick={() => navigate("/")}>Home</button>
                <button onClick={() => navigate("/nasa")}>Nasa</button>
            </div>
            <div>
                <div className="pics">
                    <button onClick={handlePrev}>Previous</button>
                    <button onClick={handleNext}>Next</button>
                    <button onClick={handleAutoPlay}>Auto Play</button>
                    <label>
                        <br />
                        Display Count:{" "}
                        <input
                            type="number"
                            value={listed}
                            onChange={(e) => setListed(Number(e.target.value))}
                            max={photos.length}
                            min={1}
                        />
                    </label>
                </div>
                <div className="pics">
                    {visiblePhotos()}
                </div>
            </div>
            <div>
                Favorite Images :
                <ul>
                    {visibleFavorites()}
                </ul>
            </div>
        </div>
    )
}

export default Carousel;
// create and image carousel to display photos start by displaying 3
// buttons to cycle through photos. next and previous
// button to cycle through photos automatically
// ability to select number of display photos
// ability to favorite images shown in a list below carousel
// carousel, carousel controls, favorite images list
