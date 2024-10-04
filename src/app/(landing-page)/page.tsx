import {Beneficios} from "./components/Beneficios";
import { CarouselDemo } from "./components/Carrousel";
import { Navbar } from "./components/Navbar";


export default function Home() {
  return (
    <>
    <Navbar />
    <div className="my-10">
      <CarouselDemo />
    </div>
    <div className="my-10">
      <Beneficios />
    </div>
    </>
  );
}
