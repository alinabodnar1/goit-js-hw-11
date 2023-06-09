import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "simplelightbox/dist/simple-lightbox.min.css";

import SimpleLightbox from "simplelightbox";
import { getDataPictures } from './api';
import {
    clearPictures,
    renderPictures,
    createCollection,
    scrollSmooth,
    showNumberOfPictures
} from './pictures';
    
const lightbox = new SimpleLightbox('.gallery a');

export const btnLoadMore = document.querySelector('.load-more');
const formRef = document.querySelector("#search-form");
const inputRef = document.querySelector("input");
let statusRow = '';
let statusPage = 1;

formRef.addEventListener('submit', onSearch);
// btnLoadMore.addEventListener('click', onLoadMore);
window.addEventListener('scroll', onScrollMore);

const showPictures = (search, page) => getDataPictures(search, page)
    .then(data => {
        if (data.total === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        }
        renderPictures(createCollection(data.hits));
        lightbox.refresh();
        scrollSmooth(page);
        showNumberOfPictures(page, data.totalHits);
    })
    .catch(() => {
        // btnLoadMore.style.display = 'none';
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

function onScrollMore() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
 
    if (scrollTop + clientHeight >= scrollHeight) {
        const page = btnLoadMore.dataset.page;
        const search = inputRef.value;
        showPictures(search, page);
    }
}

// function onLoadMore() {
//     const page = btnLoadMore.dataset.page;
//     const search = inputRef.value;
//     showPictures(search, page);
//     getDataPictures(search, page)
//         .then(data => showNumberOfPictures(page, data.totalHits));   
// }