import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { btnLoadMore } from './index';

const gallery = document.querySelector('.gallery');

class Pictures {
    constructor(webformatURL, largeImageURL, tags, likes, views, comments, downloads) {
        this.webformatURL = webformatURL;
        this.largeImageURL = largeImageURL;
        this.tags = tags;
        this.likes = likes;
        this.views = views;
        this.comments = comments;
        this.downloads = downloads;
    };
};

const createCollection = (data, count) => {
    const collection = data.slice(0, count);
    return collection.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        (new Pictures(webformatURL,largeImageURL, tags, likes, views, comments, downloads)));
};

const renderPictures = (collection) => {
    const pictures = collection.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<a class="gallery__item" href="${largeImageURL}">
                    <div class="photo-card">
                        <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
                        <div class="info">
                            <p class="info-item">
                                <b>Likes</b>${likes}</p>
                            <p class="info-item">
                                <b>Views</b>${views}</p>
                            <p class="info-item">
                                <b>Comments</b>${comments}</p>
                            <p class="info-item">
                                <b>Downloads</b>${downloads}</p>
                        </div>  
                    </div>
                </a>
                `;
    }).join("");

    gallery.insertAdjacentHTML('beforeend', pictures);
}

const updateLoadButton = (currentPage) => {
    btnLoadMore.style.display = 'block';
    btnLoadMore.dataset.page = Number(currentPage) + 1; 
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });
}; 

const clearPictures = () => {
    gallery.innerHTML = '';
};

const showNumberOfPictures = (page, totalHits) => {
    let total = page * 40;
    if (total > totalHits) {
        return;
    }
        Notify.success(`Hooray! We found ${total} images.`);
};


export {
    renderPictures,
    createCollection,
    updateLoadButton,
    clearPictures,
    showNumberOfPictures,
};