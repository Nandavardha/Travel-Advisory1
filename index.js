import axios from "axios";

export const getPlacesData= async(type,sw,ne) =>{
    try {
        const {data:{data}}= await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
        {
            method:"GET",
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
            },
            headers: {
              'X-RapidAPI-Key': '53457e92f7msh653f518d4e9c1a4p1536f8jsn1cfd3428dc28',
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
          });
        return data;
    }catch (error) {
        console.log(error);
    }
};

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
        params: { lat:lat , lon: lng },
        headers: {
          'X-RapidAPI-Key': '5d83d9d95cmshb50fc5b76d71643p19770ejsnda746c6bd0f7',
          'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
        }
      });

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};