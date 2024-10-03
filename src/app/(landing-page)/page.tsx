import { CarouselDemo } from "./components/Carrousel";
import Faq from "./components/Faq";
import { Navbar } from "./components/Navbar";


export default function Home() {
  return (
    <>
    <Navbar />
    <CarouselDemo />
    <Faq />
    </>
  );
}
