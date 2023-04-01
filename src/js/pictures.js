import { btnLoadMore } from './index';
const picturesContainer = document.querySelector('.gallery');

class Pictures {
    constructor(webformatURL, tags, likes, views, comments, downloads) {
        this.webformatURL = webformatURL;
        this.tags = tags;
        this.likes = likes;
        this.views = views;
        this.comments = comments;
        this.downloads = downloads;
    };
};

const createCollection = (data, count) => {
    const collection = data.slice(0, count);
    return data.map(({ webformatURL, tags, likes, views, comments, downloads }) =>
        (new Pictures(webformatURL, tags, likes, views, comments, downloads)));
};

const renderPictures = (collection) => {
    const pictures = collection.map(({ webformatURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
                </div>`;
    }).join("");
    picturesContainer.insertAdjacentHTML('beforeend', pictures);
    return;
}

const updateLoadButton = (currentPage) => {
    btnLoadMore.style.display = 'block';
    btnLoadMore.dataset.page = Number(currentPage) + 1;
}; 

const clearPictures = () => {
    picturesContainer.innerHTML = '';
};

export {
    renderPictures,
    createCollection,
    updateLoadButton,
    clearPictures
};