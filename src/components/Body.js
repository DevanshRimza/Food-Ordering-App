import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
// import resList from "../utils/mockData";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import {Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body=()=>{
// Local State Variable - super powerful varible
// as soon as listOfRestaurants changes, it automatically changes the UI
const [listOfRestaurants, setListOfRestaurant] = useState([]);
const [filteredRestaurant, setFilteredRestaurant] = useState([]);

const [searchText, setSearchText] = useState("");

const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

//console.log(listOfRestaurants);

  // Normal JS Variable
 /* let listOfRestaurants = [
    {
    "info": {
      "id": "24520",
      "name": "Domino's Pizza",
      "cloudinaryImageId": "kmk9xbpwmep69dv97l7v",
      "costForTwo": "₹400 for two",
      "cuisines": [
        "Pizzas",
        "Italian",
        "Pastas",
        "Desserts"
      ],
      "avgRating": 4,
      "avgRatingString": "4.0",
      "sla": {
        "deliveryTime": 30,
      }  
  }
},

*/

useEffect(()=>{
fetchData()
}, []);

const fetchData=async () => {
  const data= await fetch(
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.97210&lng=72.82460&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  );
  
  const json=await data.json();
  console.log(json);
  // optional Chaining
  setListOfRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
}

const onlineStatus = useOnlineStatus();

if(onlineStatus === false){
  return (<h1>
    Looks like you're offline!! Please check your internet connection.
  </h1>)
}

const {loggedInUser, setUserName} = useContext(UserContext);

// Conditional Rendering

return listOfRestaurants.length===0 ? <Shimmer /> :  (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input type="text" data-testid="searchInput" className="border border-solid border-black" value={searchText} onChange={(e)=>{
            setSearchText(e.target.value);
          }} />
          <button 
          className="px-4 py-2 bg-green-100 m-4 rounded-lg"
          onClick={()=>{
            const filteredRestaurant = listOfRestaurants.filter(
              (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())          
              );
            setFilteredRestaurant(filteredRestaurant);
          }}
          >
            Search
            </button>
        </div>
        <div className="search m-4 p-4 flex items-center">
      <button className="px-4 py-2 bg-gray-100 rounded-lg" 
      onClick={() => {
      // Filter Logic here
      
      const filteredList = listOfRestaurants.filter(
        (res)=> res.info.avgRating > 4
        );
        setListOfRestaurant(filteredList);
    }}
        >Top Rated Restaurants
        </button>
        </div>

        <div className="search m-4 p-4 flex items-center">
      
          <label className="p-2 pl-4">UserName :</label>
          <input className="border border-black p-2" value={loggedInUser} onChange={(e) => setUserName(e.target.value)}/>
        </div>
      </div>
        {/* value={loggedInUser} onChange={(e) => setUserName(e.target.value)}   */  }

      <div className="flex flex-wrap"> 
       {filteredRestaurant.map((restaurant)=>(
        <Link 
        key={restaurant.info.id} 
        to={"/restaurants/" + restaurant.info.id}
        >

          {/* if the restaurant is promoted then add a promoted label to it */
           restaurant.info.veg ? <RestaurantCardPromoted resData={restaurant}/> : <RestaurantCard resData={restaurant} />
          }
           
          </Link>
       ))}
    
      </div>
    
    </div>
    );
    }

    export default Body;