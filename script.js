const apiKey = import.meta.env.VITE_API_ACCESS_KEY;

// Constants
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const numImgs = 10;
const collection = 'travel';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${numImgs}`;


// Create Elements for Links and Photos, add  to DOM
function displayPhotos() {
    photosArray.forEach((photo) => {
        // Create anchor <a> to link to unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        // Create image <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        // Put <img> inside <a>, and both inside container
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}


// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log("Error:", error);
    }
}



// On Load
getPhotos();
