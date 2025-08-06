import savedAttractions from 'src/data/saved-attractions.json';
import savedFood from 'src/data/saved-food.json';
import savedNature from 'src/data/saved-nature.json';
import savedCities from 'src/data/saved-cities.json';
import savedCoffee from 'src/data/saved-coffee.json';
import savedHotel from 'src/data/saved-hotel.json';
import savedShop from 'src/data/saved-shop.json';
import savedTransport from 'src/data/saved-transports.json';

type Place = {
    id: string;
    name: string;
    description: string;
    emoji: string;
    address: string;
    latitude: number;
    longitude: number;
}

const dataFiles = [
    savedAttractions,
    savedFood,
    savedNature,
    savedCities,
    savedCoffee,
    savedHotel,
    savedShop,
    savedTransport,
]

export const getAllPlaces = () => {
    const allPlaces: Place[] = [];
    dataFiles.forEach(data => {
        // TODO handle layers
        const emoji = data[0][17] as string;
        const places = data[0][8] as any[] || [];
        places.forEach(placeData => {
            const latitude = placeData[1][5][2];
            const longitude = placeData[1][5][3];
            const id = placeData[1][7] || `${latitude}_${longitude}`
            const place: Place = {
                id,
                name: placeData[2],
                description: placeData[3],
                emoji,
                address: placeData[1][2] || placeData[1][4],
                latitude,
                longitude,
            }
            allPlaces.push(place);
        })
    })
    return allPlaces;
}