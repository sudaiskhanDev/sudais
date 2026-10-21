import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
    <Navbar />
      <Hero />
      <About />
      <Work />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}