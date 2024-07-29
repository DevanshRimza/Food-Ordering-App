import React from "react";


class UserClass extends React.Component{

    constructor(props){
      //console.log("Child Constructor");
       super(props);
    
    this.state = {
      userInfo:{
        name: "Dummy",
        location: "Default",
       // avatar_url: "http://dummy-photo.com",

      },
    };
    }


    async componentDidMount(){
       //console.log("Child Component Did Mount");
      const data = await fetch("https://api.github.com/users/DevanshRimza");
      const json = await data.json();

      this.setState({
        userInfo: json, 
      });
      console.log(json);
    }

    render() {
      //console.log("Child Render");

      const {login, location, avatar_url} = this.state.userInfo;
        return (
            <div className="user-card">
            <img src={avatar_url} />
            <h2>Name: {login}</h2>
            <h3>Location: {location}</h3>
            <h4>Contact: @devanshnovember24</h4>
            </div>
        );
    }
}

export default UserClass;


/*
----MOUNTING----

Constructor (dummy)
render (dummy)
      <HTML Dummy>
 Component Did Mount
      <API calls>
      <this.setState>     ---state variable is updated


  -------UPDATE-----
  
        render (API data)
        <HTML new API data>
   Component Did Update     




*/