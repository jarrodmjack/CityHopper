import { PropertySearchFormOptions } from "~/types/PropertySearchFormTypes";

export const fetchMatchingProperties = async (
  urlOptions: PropertySearchFormOptions
) => {
  const url = `https://airbnb13.p.rapidapi.com/search-location?location=${urlOptions.location}&checkin=${urlOptions.checkIn}&checkout=${urlOptions.checkOut}&adults=${urlOptions.numOfPeople}&children=0&infants=0&pets=0&page=1&currency=USD`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "391f14e221msh235d770daa9a498p13db86jsnabd9a7d6d730",
      "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
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
