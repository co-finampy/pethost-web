import { Beneficios } from "./_components/Beneficios";
import { CarouselHero } from "./_components/Carrousel";
import { ComoFunciona } from "./_components/Comofunciona";
import { Faq } from "./_components/Faq";
import { Footer } from "./_components/Footer";
import { Navbar } from "./_components/Navbar";

export default function Home() {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
        </div>
        <Navbar />
        <CarouselHero />
        <Beneficios />
        <ComoFunciona />
        <Faq />
        <Footer />
      </div>
    </>
  );
}