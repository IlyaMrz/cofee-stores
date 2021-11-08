import { createApi } from "unsplash-js";

const unsplashApi = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = ({ latLong = "55.741952, 37.551707", query, limit = 6 }) => {
    return `https://api.foursquare.com/v2/venues/search?ll=${latLong}&query=${query}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&v=20211007&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
    const photos = await unsplashApi.search.getPhotos({
        query: "moscow coffee store",
        perPage: 40,
    });
    const unsplashResults = photos.response.results;
    return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async () => {
    const photos = await getListOfCoffeeStorePhotos();
    const res = await fetch(getUrlForCoffeeStores({ query: "coffee store" }));
    const data = await res.json();
    return data.response.venues.map((venue, idx) => {
        return {
            // ...venue,
            id: venue.id,
            address: venue.location.address || venue.location.formattedAddress[0] || "",
            name: venue.name,
            neighbourhood: venue.location.neighborhood || venue.location.crossStreet || "",
            imgUrl: photos[idx],
        };
    });
};
