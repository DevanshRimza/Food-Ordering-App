import User from "./User";
import UserClass from "./UserClass";
import React from "react";
import UserContext from "react";

class About extends React.Component{

    constructor(props){
        console.log("Parent Constructor");
         super(props);
    }




    componentDidMount(){
        console.log("Parent Component Did Mount");
     }

 render() {
    console.log("Parent Render");
    return (
        <div>
            <h1>About</h1>
            <h2>This is the food ordering app</h2>
             <div>
              <UserContext.Consumer>
                {(data)=> console.log(data)}
              </UserContext.Consumer>

             </div>

            <UserClass name={"Devansh Rimza (class)"} location={"Ujjain class"}/>

        </div>
    )
}


}



export default About;