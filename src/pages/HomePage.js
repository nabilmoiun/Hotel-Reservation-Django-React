import React, {Component} from "react";
import HeroComponent from "../components/HeroComponent";
import Services from "../components/Services";
import FeatureComponent from '../components/FeatureComponent'
import {MyContext} from '../Context';

export default class HomePage extends Component {
  static contextType = MyContext;
  render () {
    if(this.context.loading) {
      return (<div>Loading......</div>);
    }
    else{
      console.log("rooms", this.context.rooms, "featured", this.context.featuredRooms);
      return (
        <>
          <HeroComponent data={this.context.rooms.slice(0, 4)} />
          <Services />
          <FeatureComponent />
        </> 
      );
    }
    
  }
}
