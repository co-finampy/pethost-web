import { Stethoscope, UserCheck, Clock } from "lucide-react"

export default function Component() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Seu pet recebe todo o carinho e segurança que ele merece.
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {[
          {
            icon: <Stethoscope className="w-6 h-6" />,
            title: "Clinica Veterinaria",
            description: "Cobrimos despesas veterinárias"
          },
          {
            icon: <UserCheck className="w-6 h-6" />,
            title: "Anfitriões Certificados",
            description: "Experiência garantida"
          },
          {
            icon: <Clock className="w-6 h-6" />,
            title: "Atualizações",
            description: "Fotos e informações diárias"
          }
        ].map((item, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg flex-1 flex flex-col items-center text-center">
            {item.icon}
            <h2 className="text-sm font-semibold mt-2">{item.title}</h2>
            <p className="text-xs text-gray-600 mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}