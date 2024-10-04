import { Stethoscope, UserCheck, Clock } from "lucide-react"

export function Beneficios() {
  const benefits = [
    {
      icon: <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Clinica Veterinaria",
      description: "Cobrimos despesas veterinárias"
    },
    {
      icon: <UserCheck className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Anfitriões Certificados",
      description: "Experiência garantida"
    },
    {
      icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Atualizações",
      description: "Fotos e informações diárias"
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12 sm:mt-24">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
        <span className="block sm:inline">Seu pet recebe todo o carinho</span>{' '}
        <span className="block sm:inline">e segurança que ele merece.</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
        {benefits.map((item, index) => (
          <div key={index} className="bg-gray-100 p-4 sm:p-6 rounded-lg flex flex-col items-center text-center">
            <div className="mb-3 text-primary">{item.icon}</div>
            <h2 className="text-sm sm:text-base font-semibold mb-2">{item.title}</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}