import React from "react";
import Navbar from "../../components/navbar";
import Hero from "../../components/hero";
import Heading from "../../widgets/heading";
import Search from "../../components/search/search";
import Buslist from "../../components/buseslist/index"

const Home = () => {
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
        <Buslist/>
      </section>
    </div>
  );
};

export default Home;
