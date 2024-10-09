import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Heart, MessageCircle, Home, Shield, Award, Check } from 'lucide-react'

export default function HostDetails() {
  const host = {
    name: "Maria Silva",
    photo: "/placeholder-host.jpg",
    rating: 4.9,
    reviews: 127,
    description: "Olá! Sou a Maria, amo animais e tenho experiência em cuidar de cães e gatos. Moro em uma casa espaçosa com quintal, perfeita para seus pets se divertirem. Garanto muito carinho e atenção para seu melhor amigo!",
    location: "São Paulo, SP",
    responseTime: "1 hora",
    joinedDate: "Março de 2021",
    services: ["Hospedagem", "Passeios", "Creche"],
    acceptedPets: ["Cães pequenos", "Cães médios", "Gatos"],
    highlights: [
      "Cuidadora experiente",
      "Quintal espaçoso",
      "Atendimento 24h",
      "Fotos diárias",
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Coluna da esquerda */}
        <div className="md:col-span-2">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              <Image src={host.photo} alt={host.name} width={96} height={96} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{host.name}</h1>
              <p className="text-gray-600">{host.location}</p>
              <div className="flex items-center mt-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-semibold">{host.rating}</span>
                <span className="ml-2 text-gray-600">({host.reviews} avaliações)</span>
              </div>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Sobre {host.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{host.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {host.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-gray-200 px-2 py-1 rounded">
                    <Check className="w-4 h-4 text-green-500" /> 
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Serviços oferecidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {host.services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aceita</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {host.acceptedPets.map((pet, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{pet}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna da direita */}
        <div>
          <Card className="mb-8">
            <CardContent className="pt-6">
              <Button className="w-full mb-4">Reservar</Button>
              <Button variant="outline" className="w-full mb-4">
                <Heart className="w-4 h-4 mr-2" /> Favoritar
              </Button>
              <Button variant="outline" className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" /> Enviar mensagem
              </Button>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Informações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Home className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-semibold">Mora em casa com quintal</p>
                    <p className="text-sm text-gray-600">Ótimo para pets ativos</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-semibold">Tempo de resposta: {host.responseTime}</p>
                    <p className="text-sm text-gray-600">Rápido e atencioso</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-semibold">Verificado pelo PetHost</p>
                    <p className="text-sm text-gray-600">Identidade confirmada</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-semibold">Membro desde {host.joinedDate}</p>
                    <p className="text-sm text-gray-600">Anfitrião experiente</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Seção de avaliações */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Avaliações</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((_, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold">U{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold">Usuário {index + 1}</p>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  Excelente experiência! A Maria cuidou muito bem do meu cachorro. Mandou fotos todos os dias e seguiu todas as instruções. Recomendo!
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline">Ver todas as {host.reviews} avaliações</Button>
        </div>
      </div>
    </div>
  )
}
