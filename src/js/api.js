import axios from "axios";

export const getDataPictures = async (search, page) => {
 
     const params = new URLSearchParams({
        key: "34882126-23c8752d62a2e062d45efec22",
        q: search,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page: 40,
     });
     
    const { data } = await axios.get(`https://pixabay.com/api/?${params.toString()}`);
    return data;
};
