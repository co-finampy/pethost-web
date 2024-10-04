import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Rubik_Mono_One } from "next/font/google";

const rubikMono = Rubik_Mono_One({
  subsets: ["latin"],
  weight: ['400'],
});

export function Beneficios() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center flex-col">
        <span className={"text-4xl md:text-3xl lg:text-2xl font-bold text-center mb-8 " + rubikMono.className}>
          Seu pet recebe todo o carinho e
        </span>
        <span className={"text-4xl md:text-3xl lg:text-2xl font-bold text-center mb-8 " + rubikMono.className}>
          segurança que ele merece.
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-6 md:gap-[180px] my-10">
        <Card className="w-[290px] h-[270px] flex flex-col mb-6 md:mb-0">
          <CardHeader>
            <div className="w-10 h-10 rounded-full bg-gray-200 mb-2" />
            <CardTitle className={"text-lg " + rubikMono.className}>Clínica Veterinária</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">
              Para garantir a segurança do seu pet, cobrimos eventuais despesas veterinárias
              relacionadas a acidentes ou ocorrências durante todo serviço.
            </p>
          </CardContent>
        </Card>
        <Card className="w-[290px] h-[270px] flex flex-col mb-6 md:mb-0">
          <CardHeader>
            <div className="w-10 h-10 rounded-full bg-gray-200 mb-2" />
            <CardTitle className={"text-lg " + rubikMono.className}>Anfitriões Certificados</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">
              Nossos Anfitriões são certificados e avaliados com cautela a cada serviço prestado
              para garantir que seu pet tenha uma experiência incrível.
            </p>
          </CardContent>
        </Card>
        <Card className="w-[290px] h-[270px] flex flex-col">
          <CardHeader>
            <div className="w-10 h-10 rounded-full bg-gray-200 mb-2" />
            <CardTitle className={"text-lg " + rubikMono.className}>Atualizações em tempo real</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">
              Fique tranquilo(a) sabendo que você receberá fotos e atualizações diárias
              do seu pet, permitindo que você acompanhe cada momento do cuidado
              e se sinta mais próximo(a) dele, mesmo à distância.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}