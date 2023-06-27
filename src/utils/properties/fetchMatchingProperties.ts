import { PropertySearchFormOptions } from "~/types/PropertySearchFormTypes";

export const fetchMatchingProperties = async (
  urlOptions: PropertySearchFormOptions
) => {

  const checkIn = urlOptions.checkIn.toISOString().split('T')[0];
  const checkOut = urlOptions.checkIn.toISOString().split('T')[0];

  const url = `https://airbnb13.p.rapidapi.com/search-location?location=${urlOptions.location}&checkin=${checkIn}&checkout=${checkOut}&adults=${urlOptions.numOfPeople}&children=0&infants=0&pets=0&page=1&currency=USD`;

  const options = {
    method: "GET",
    headers: {
      'X-RapidAPI-Key': 'db3e8ae18bmshd7bb610557d438fp1e9721jsneadf0cccb21c',
      'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.results!;
  } catch (error) {
    console.error(error);
    return null
  }
};
