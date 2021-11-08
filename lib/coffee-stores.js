const getUrlForCoffeeStores = ({ latLong = "55.741952, 37.551707", query, limit = 6 }) => {
    return `https://api.foursquare.com/v2/venues/search?ll=${latLong}&query=${query}&client_id=${process.env.PLUBLIC_NEXT_CLIENT_ID}&client_secret=${process.env.PLUBLIC_NEXT_CLIENT_SECRET}&v=20211007&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
    const res = await fetch(getUrlForCoffeeStores({ query: "coffe stores" }));
    const data = await res.json();
    return data.response.venues;
};
