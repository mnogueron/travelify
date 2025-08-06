import React from 'react';
import {DivIcon, LatLngTuple, PointExpression} from 'leaflet'
import L from 'leaflet'
import {Circle, MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {getAllPlaces} from "src/components/Places";
import twemoji from "twemoji";

const position: LatLngTuple = [35.39298986120936, 138.56459082229995]
const radius = 20000; // 20km

const places = getAllPlaces();

const expression = /(https?:\/\/[^\s]+)/gi;
const urlRegex = new RegExp(expression);

const iconSize: PointExpression = [24, 24];

const icons = [...new Set(places.map(p => p.emoji))].reduce<Record<string, DivIcon>>((acc, emoji) => {
    const emojiIcon = twemoji.parse(emoji, { folder: 'svg', ext: '.svg' });
    acc[emoji] = L.divIcon({html: emojiIcon, iconSize, className:' emoji-icon'});
    return acc;
}, {});

const Map = () => {
    return (
        <MapContainer center={position} zoom={8} style={{height: '100vh', width: '100vw'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png" />
            {places.map((place) => (
                <React.Fragment key={place.id}>
                    <Marker position={[place.latitude, place.longitude]} icon={icons[place.emoji]}>
                        <Popup>
                            <b>{place.name}</b>
                            <div>{place.description.split(urlRegex).map((part, index) => {
                                if (urlRegex.test(part)) {
                                    return <a key={`part-${index}`} href={part} target="_blank" rel="noopener noreferrer">{part}</a>;
                                }
                                return part;
                            })}</div>
                        </Popup>
                    </Marker>
                    <Circle center={[place.latitude, place.longitude]} pathOptions={{ color: '#0891b2' }} radius={radius} />
                </React.Fragment>
            ))}
        </MapContainer>
    );
}

export default Map;