import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "simplelightbox/dist/simple-lightbox.min.css";

import SimpleLightbox from "simplelightbox";
import { getDataPictures } from './api';
import {
    clearPictures,
    renderPictures,
    createCollection,
    smoothScroll,
    showNumberOfPictures
} from './pictures';
    
const lightbox = new SimpleLightbox('.gallery a');

export const btnLoadMore = document.querySelector('.load-more');
const formRef = document.querySelector("#search-form");
const inputRef = document.querySelector("input");
let statusRow = '';
let statusPage = 1;
let loadedImages = 0;

formRef.addEventListener('submit', onSearch);
window.addEventListener('scroll', infinityScroll);

const showPictures = (search, page) => getDataPictures(search, page)
    .then(data => {
        if (data.total === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        }
        renderPictures(createCollection(data.hits));
        lightbox.refresh();
        smoothScroll();
        showNumberOfPictures(page, data.totalHits);
    })
    .catch(() => {
        Notify.failure("We're sorry, but you've reached the end of search results.");
    });

function onSearch(event) {
    event.preventDefault();
    const search = inputRef.value.trim();

    if (search !== statusRow) {
        statusRow = search;
        statusPage = 1;
        clearPictures();
        showPictures(search, 1);
    }
}
// Нескінченний скрол при прокрутці 80% сторінки 

function infinityScroll() {
    const scrollPosition = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollPosition / (pageHeight - window.innerHeight)) * 100;
    
    if (scrollPercentage > 80 && loadedImages < 40) {
             loadImages(page); 
    }   
  }

function loadImages(page) {
    const search = inputRef.value;

    showPictures(search, page);

    loadedImages += 40;
    updatePage(page);
}

function updatePage(page) {
    let nextPage = page + 1;
    return nextPage;
}