import  React,{useState,useEffect}  from "react";
 import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetails  from "./components/PlaceDetails/PlaceDetails";
import {getPlacesData,getWeatherData} from "./api";
 function App(){
   const [places,setPlaces]=useState([0]);
   const [filteredPlaces,setFilteredPlaces]=useState([]);
   const [coordinates,setCoordinates]=useState({lat:0,lng:0});
   const [bounds,setBounds]=useState(1);
   const [childClicked,setChildClicked]=useState(null);
   const [type,setType]=useState("restaurants");
   const [weatherData, setWeatherData] = useState([]);
    const [rating,setRating]=useState('');
   // for getting user location:
   const[isLoading,setIsLoading]=useState(false);
   useEffect(() =>{
      navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}}) =>{
            setCoordinates({lat:latitude,lng:longitude});
      })
   },[])
   useEffect(() =>{
      const filteredPlaces=places.filter((places) => places.rating>rating);
      setFilteredPlaces(filteredPlaces);

   },[rating])
   useEffect(() =>{
      if(bounds.sw && bounds.ne){
         setIsLoading(true);
         getWeatherData(coordinates.lat, coordinates.lng)
         .then((data) => setWeatherData(data));
         getPlacesData(type,bounds.sw,bounds.ne)
         .then((data) =>{
            
            setPlaces(data ?.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
            setIsLoading(false);
         })
      }
   },[bounds,type]);
    return (
        <>
        <CssBaseline/>
           <Header setCoordinates={setCoordinates}/>
           <Grid container spacing={3} style={{width:"100%"}}>
           <Grid item xs={12} md={4}>
           <List places={filteredPlaces.length ? filteredPlaces : places} childClicked={childClicked} 
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            isLoading={isLoading}
           />
           </Grid>
           <Grid item xs={12} md={8}>
           <Map setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
           />    
           </Grid>
           </Grid>
            
        </>
    );
 }

 export default App;