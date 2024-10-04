"use client"

import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

const items = [
  {
    title: 'Escolha Certa',
    description: 'Dicas essenciais para escolher o anfitrião perfeito para o seu pet com total segurança e confiança.',
    date: '26.09.2024',
    image: '',
  },
  {
    title: 'Cuidado Veterinário',
    description: 'A importância do acompanhamento veterinário durante a hospedagem para a saúde e o bem-estar do seu pet.',
    date: '26.09.2024',
    image: '',
  },
  {
    title: 'Socialização',
    description: 'Como a hospedagem pode ser uma oportunidade de socialização divertida e enriquecedora para o seu pet.',
    date: '26.09.2024',
    image: '',
  },
  {
    title: 'Preparação',
    description: 'Saiba como preparar seu pet para a primeira hospedagem e garantir uma experiência tranquila.',
    date: '26.09.2024',
    image: '',
  },
]

export function BlogCards() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
      <div className="flex justify-between items-center mb-6 sm:mb-8 md:mb-10">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold "
        >
          Conforto e Segurança <br className="sm:hidden" /> para Seu Pet
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="flex">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_25%] pl-4 first:pl-0"
            >
              <Card className="h-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {item.date}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Button variant="ghost" size="sm" />
      </div>
    </div>
  );
}