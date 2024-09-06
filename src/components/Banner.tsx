import React,  { useState, useEffect } from "react";

/*
 * Banner: pulls an image url from api.nasa.gov and displays the site banner
 */
const Banner: React.FC = () => {
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [hdImgUrl, setHdImgUrl] = useState<string | null>(null);
    const [currentImgUrl, setCurrentImgUrl] = useState<string | null>(null);
    const [copyright, setCopyright] = useState<string | null>(null);

    useEffect(() => {
        const fetchImg = async () => {
            // Error handling
            try {
                const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
                if (!res.ok) {
                    throw new Error('Failed to fetch image');
                }
                const data = await res.json();
                setImgUrl(data.url);
                setHdImgUrl(data.hdurl);
                setCurrentImgUrl(window.innerWidth > 800? data.hdurl : data.url);
                setCopyright(data.copyright);
            } catch (error) {
                console.error("Error fetching the banner image:", error);
                setCurrentImgUrl(null);
            }
        };

    fetchImg();
}, []);


    useEffect(() => {
        const handleResize = () => {
            const bannerElement = document.querySelector('.banner');
            bannerElement?.setAttribute('style', `background-image: url(${window.innerWidth > 800 ? hdImgUrl : imgUrl})`);
        };

        window.addEventListener('resize', handleResize);

        // Call handleResize once to set the image on first render
        handleResize();

        return () => window.removeEventListener('resize', handleResize);  // Clean up event listener on unmount
    }, [hdImgUrl, imgUrl]);  // Depend on hdImgUrl and imgUrl

    if (!currentImgUrl) {
        return <p>Banner Loading...</p>;
    }

    return (
        <div className="banner" style={{ backgroundImage: `url(${currentImgUrl})` }}>
            <h1>To Do List</h1>
            {copyright && (
                <p className="copyright">{copyright}©</p>
            )}
        </div>
    );
}

export default Banner;