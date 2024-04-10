// TODO: Add integration to podcast platforms to embed motivational podcasts etc.
// TODO: Refine webpage CSS to make it look more appealing/modern
// TODO: Investigate unintended carousel behavior caused by window resizing

import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios'; // for making HTTP requests
import Slider from 'react-slick'; // Import react-slick
import 'slick-carousel/slick/slick.css'; // Import slick carousel CSS
import 'slick-carousel/slick/slick-theme.css'; // Import slick carousel theme CSS

const CuratedGallery = () => {
  const [videoData, setVideoData] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('motivational');

  useEffect(() => {
    // Function to fetch video data from JSON file
    const fetchVideoData = async () => {
      try {
        const response = await axios.get('/curated-content/videos.json');
        setVideoData(response.data);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoData();
  }, []);

  const handleClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div style={styles.container}>
      {/* Title Container */}
      <div style={styles.titleContainer}>
        <h1 style={styles.title}>Curated Content Gallery</h1>
        <h4 style={styles.subtitle}>Hand selected with care by our site's administrators!</h4>
        <h4 style={styles.subtitle}>~New videos and podcasts updated every week~</h4>
      </div>

      {/* Category Toggle */}
      <div style={styles.toggleContainer}>
        <label style={styles.toggleLabel}>
          <input
            type="radio"
            value="motivational"
            checked={selectedCategory === 'motivational'}
            onChange={() => handleCategoryChange('motivational')}
          />
          Motivational
        </label>
        <label style={styles.toggleLabel}>
          <input
            type="radio"
            value="educational"
            checked={selectedCategory === 'educational'}
            onChange={() => handleCategoryChange('educational')}
          />
          Educational
        </label>
        <label style={styles.toggleLabel}>
          <input
            type="radio"
            value="lighthearted"
            checked={selectedCategory === 'lighthearted'}
            onChange={() => handleCategoryChange('lighthearted')}
          />
          Lighthearted
        </label>
      </div>

      {/* Selected video */}
      {selectedVideo && (
        <div style={styles.videoContainer}>
          <ReactPlayer
            url={selectedVideo}
            controls
            width="100%"
            height="100%"
          />
        </div>
      )}

      {/* Carousel */}
      <div style={styles.carouselContainer}>
        <h2 style={styles.carouselHeader}>Featured Videos</h2>
        {videoData && (
          <Slider {...carouselSettings}>
            {videoData[selectedCategory].map((videoUrl, index) => (
              <div key={index} style={styles.thumbnailContainer}>
                <img
                  src={`https://img.youtube.com/vi/${videoUrl.split('v=')[1]}/0.jpg`}
                  alt={`Thumbnail ${index}`}
                  onClick={() => handleClick(videoUrl)}
                  style={styles.thumbnail}
                />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default CuratedGallery;

const carouselSettings = {
  dots: false,
  infinite: true,
  speed: 3000,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: 'linear',
  pauseOnHover: false,
  swipeToSlide: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const styles = {
  container: {
    position: 'relative', // Make sure the title container is positioned relative to this container
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '2px solid #ccc',
    padding: '20px',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
  },
  titleContainer: {
    position: 'absolute',
    top: '-65px', // Adjust position relative to the outer container
    left: '20px',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0',
    color: '#333',
    textDecoration: 'underline'
  },
  subtitle: {
    fontSize: '16px',
    margin: '0',
    color: '#666',
  },
  toggleContainer: {
    marginBottom: '20px',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '4px',
  },
  toggleLabel: {
    marginRight: '10px', // Add space between radio menu entries
  },
  videoContainer: {
    marginTop: '20px',
    marginBottom: '20px',
    width: '57%', // Should look into adjusting this value to change the size of the embeded video (make it to a set px val rather than scaling?)
    height: '500px',
    textAlign: 'center',
    backgroundColor: '#f7f7f7',
    border: '2px solid #ccc',
    borderRadius: '8px',
  },
  carouselContainer: {
    width: '100%',
    maxWidth: '800px',
    padding: '40px',
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
  },
  carouselHeader: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
    textDecoration: 'underline',
  },
  thumbnailContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  thumbnail: {
    width: '90%',
    cursor: 'pointer',
    borderRadius: '4px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    margin: '0 10px',
  },
};
