import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';

export const GetLocation = () => {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(info => {
            resolve(info);
        }).catch(error => {
            console.error('Getting current position', error);
            reject(error);
        });
    });
    
}

export const FilterByCountry = async (movies, geolocation) => {
    const position = {
        lat: geolocation.coords.latitude, 
        lng: geolocation.coords.longitude
    };

    const location = await Geocoder.geocodePosition(position);

    const national = movies.filter((item, index) => {

        return (
            item.Country.indexOf(location[0].country.replace('s','z')) !== -1 ||
            item.Country.indexOf(location[0].countryCode) !== -1
            );
            
    });

    return national;
}
