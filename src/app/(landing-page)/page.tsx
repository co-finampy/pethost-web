import BlogCards from "./components/BlogCards";
import { CarouselDemo } from "./components/Carrousel";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";


export default function Home() {
  return (
    <>
    <Navbar />
    <CarouselDemo />
    <BlogCards />
    <Faq />
    <Footer />
    </>
  );
}
