import { Stethoscope, UserCheck, Clock } from "lucide-react"
import { Rubik_Mono_One } from "next/font/google";

const rubikMono = Rubik_Mono_One({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Component() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-24">
      <h1 className={"text-3xl font-bold text-center mb-12 " + rubikMono.className}>
        Seu pet recebe todo o carinho <br /> e segurança que ele merece.
      </h1>
      <div className="flex flex-col sm:flex-row lg:gap-24 sm:gap-8  justify-center">
        {[
          {
            icon: <Stethoscope className="w-8 h-8" />,
            title: "Clinica Veterinaria",
            description: "Cobrimos despesas veterinárias"
          },
          {
            icon: <UserCheck className="w-8 h-8" />,
            title: "Anfitriões Certificados",
            description: "Experiência garantida"
          },
          {
            icon: <Clock className="w-8 h-8" />,
            title: "Atualizações",
            description: "Fotos e informações diárias"
          }
        ].map((item, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg flex-1 flex flex-col items-center text-center">
            {item.icon}
            <h2 className="text-base font-semibold mt-2">{item.title}</h2>
            <p className="text-base text-gray-600 mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}