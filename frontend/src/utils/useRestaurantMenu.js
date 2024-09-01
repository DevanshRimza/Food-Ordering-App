import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constants";

const useRestaurantMenu = (resId) =>{

    const[resInfo,setResInfo] = useState(null);
    // fetch data

    useEffect(() => {
     fetchdata();
    },[]);

    const fetchdata = async () => {
     const data = await fetch(`http://localhost:3000/api/menu/${resId}`);
     const json = await data.json();
     setResInfo(json.data);
    };
    
    return resInfo;
}

export default useRestaurantMenu;

//MENU_API + resId