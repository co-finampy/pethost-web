import { Play, CheckSquare, Coffee, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col justify-between md:pr-8">
          <h2 className="text-3xl font-bold mb-4">Como funciona?</h2>
          <Button variant="ghost" className="flex items-center text-sm justify-start px-0">
            <Play className="w-4 h-4 mr-2" />
            Assistir vídeo
          </Button>
        </div>
        <div className="flex flex-col items-start">
          <CheckSquare className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Selecione os Serviços e o Anfitrião</h3>
          <p className="text-sm text-gray-600">
            É ideal realizar um encontro com o Anfitrião e depois fazer o pagamento direto em nosso site.
          </p>
        </div>
        <div className="flex flex-col items-start">
          <Coffee className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Relaxe e aproveite</h3>
          <p className="text-sm text-gray-600">
            Enquanto seu pet tem um tempo de qualidade com nosso anfitrião ficamos a postos para você não esquentar a cabeça
          </p>
        </div>
        <div className="flex flex-col items-start">
          <Star className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Avaliação e Experiência com a nossa plataforma</h3>
          <p className="text-sm text-gray-600">
            Sua avaliação é importante para o nosso anfitrião e para gente assim podemos manter um serviço 5 estrelas
          </p>
        </div>
      </div>
    </div>
  )
}