import BlogCards from "./components/BlogCards";
import Beneficios from "./components/Beneficios";
import { CarouselDemo } from "./components/Carrousel";
import ComoFunciona from "./components/Comofunciona";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";


export default function Home() {
  return (
    <>
    <Navbar />
    <CarouselDemo />
    <Beneficios/>
    <ComoFunciona />
    <BlogCards />
    <Faq />
    <Footer />
    </>
  );
}
