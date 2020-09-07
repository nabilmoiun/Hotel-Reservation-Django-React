import React from "react";
import { data } from "../components/data";
import HeroComponent from "../components/HeroComponent";
import Services from "../components/Services";
import FeatureComponent from '../components/FeatureComponent'
// import {MyContext} from '../Context';

export default function HomePage() {
  // const context = useContext(MyContext);
  // const rooms = context.rooms;
  return (
    <>
      <HeroComponent data={data} />
      <Services />
      <FeatureComponent />
    </>
  );
}
