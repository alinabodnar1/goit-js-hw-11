import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { getDataPictures } from './api';
import {
    clearPictures,
    renderPictures,
    createCollection,
    updateLoadButton,
    showNumberOfPictures,
    gallerySimplelightbox
    } from './pictures';

export const btnLoadMore = document.querySelector('.load-more');
const formRef = document.querySelector("#search-form");
const inputRef = document.querySelector("input");
let statusRow = '';
let statusPage = 1;

formRef.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onLoadMore);

const showPictures = (search, page) => getDataPictures(search, page)
    .then(data => {
        if (data.total === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        }
        renderPictures(createCollection(data.hits));
        updateLoadButton(page);

    }).catch(() => {
        btnLoadMore.style.display = 'none';
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
function onLoadMore() {
    const page = btnLoadMore.dataset.page;
    const search = inputRef.value;
    showPictures(search, page);
    getDataPictures(search, page)
    .then(data => showNumberOfPictures(page, data.totalHits));
    
}