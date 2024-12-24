import React from "react";
import Navbar from "../../components/navbar";
import Hero from "../../components/hero";
import Heading from "../../widgets/heading";
import Search from "../../components/search/search";
import Buslist from "../../components/buseslist/index"
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Suspense } from "react";
import Loading from "../../components/loading"

const Home = () => {

  const [buses, setBuses] = useState([]);

  

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/schedule/data"
      );
      console.log(response.data);
      setBuses(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className=" bg-white px-10">
      <nav className=" sticky top-0 z-50 bg-white">
        <Navbar />
      </nav>
      <section className=" relative h-[90vh] w-full">
        <Hero />
      </section>
      <section>
        <Heading  maintext="Search" subtext="Buses"/>
        <Search/>
      </section>
      <section>
        <Heading maintext="Avaliable" subtext="Buses"/>
        <Suspense fallback={<Loading/>}>
        <Buslist buses={buses}/>
        </Suspense>
      </section>
    </div>
  );
};

export default Home;
