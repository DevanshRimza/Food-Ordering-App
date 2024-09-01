import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";
const RestaurantMenu = () => {

 // const [resInfo, setResInfo] = useState(null);

  // Params is an object with resId
  const {resId} = useParams();

  const resInfo= useRestaurantMenu(resId);

  const [showIndex,setShowIndex] = useState(null);

 /* useEffect(() => {
    fetchMenu();
  },[]);

const fetchMenu = async () => {
  const data = await fetch(MENU_API + resId);

const json = await data.json();

console.log(json);
setResInfo(json.data);
};

*/

if(resInfo===null) return <Shimmer />; 

const { name, cuisines, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info;

const {itemCards} = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

//console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

const catagories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c => c.card?.card?.["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");

//console.log(catagories);

 return (
   <div className="text-center">
    <h1 className="font-bold my-6 text-2xl">{name}</h1>
    <p className="font-bold text-lg">
      {cuisines.join(", ")} - {costForTwoMessage}
    </p>
    {/* Catagories accordian */}

    {catagories.map((catagory,index)=> (
      // Controlled Component
      <RestaurantCategory 
      key={catagory?.card?.card?.title} 
      data={catagory?.card?.card} 
      showItems={index==showIndex ? true : false}
      setShowIndex={() => setShowIndex(index)} />
    ))}

  </div>
 );
};

export default RestaurantMenu;