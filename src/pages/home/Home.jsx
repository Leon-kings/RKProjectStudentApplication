import React from "react";
import { Hero } from "../../components/hero/Hero";
import { About } from "../about/About";
import { Services } from "../services/Services";
import { Blogs } from "../blogs/Blogs";
import { FAQ } from "../faq/FAQ";
import { Testimonials } from "../testimony/Testimony";
import { Team } from "../teams/Team";

export const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <About />
      <Services />
      <Blogs />
      <FAQ/>
      <Testimonials/>
      <Team />
    </div>
  );
};
