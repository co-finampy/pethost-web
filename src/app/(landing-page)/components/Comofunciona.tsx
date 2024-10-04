import { Play, CheckSquare, Coffee, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ComoFunciona() {
  const steps = [
    {
      icon: <CheckSquare className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary" />,
      title: "Selecione os Serviços e o Anfitrião",
      description: "É ideal realizar um encontro com o Anfitrião e depois fazer o pagamento direto em nosso site.",
    },
    {
      icon: <Coffee className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary" />,
      title: "Relaxe e aproveite",
      description: "Enquanto seu pet tem um tempo de qualidade com nosso anfitrião ficamos a postos para você não esquentar a cabeça.",
    },
    {
      icon: <Star className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary" />,
      title: "Avaliação e Experiência com a nossa plataforma",
      description: "Sua avaliação é importante para o nosso anfitrião e para gente assim podemos manter um serviço 5 estrelas.",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        <div className="flex flex-col md:pr-4 lg:pr-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Como funciona?</h2>
          <Button variant="ghost" className="flex items-center text-sm justify-start px-0 mb-6 md:mb-0">
            <Play className="w-4 h-4 mr-2" />
            Assistir vídeo
          </Button>
        </div>
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-start">
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}