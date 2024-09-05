const apiKey = import.meta.env.VITE_API_ACCESS_KEY;

// Constants
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let loadedImgReady = false;
let numImgsLoaded = 0;
let totImages = 0;
let photosArray = [];

// Unsplash API
const numImgs = 30;
const collection = 'travel';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${numImgs}`;


// Check if all images have been loaded
function imageLoaded() {
    console.log('image loaded');
    numImgsLoaded++;
    if (numImgsLoaded === totImages) {
        loadedImgReady = true;

    }
}

// Helper function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// Create Elements for Links and Photos, add  to DOM
function displayPhotos() {
    numImgsLoaded = 0;
    totImages = photosArray.length;
    photosArray.forEach((photo) => {
        // Create anchor <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // Create image <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event listener: check when image has finished loading
        img.addEventListener('load', imageLoaded);

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

// Check to see if scrolling is reaching bottom of page: Load more photos
window.addEventListener('scroll', () => {
    // innerHeight is the height of the browser window
    // scrollY is how high we are to the top of the page
    // body.offsetHeight is the total heigh of the page
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && loadedImgReady) {
        loadedImgReady = false;
        getPhotos();
    }
});



// On Load
getPhotos();
