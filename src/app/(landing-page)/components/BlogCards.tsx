import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Rubik_Mono_One } from "next/font/google";
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import img1 from '../../public/images/img1.png'
import img2 from '../../public/images/img2.png'
import img3 from '../../public/images/img3.png'
import img4 from '../../public/images/img4.png'


const rubikMono = Rubik_Mono_One({
    subsets: ["latin"],
    weight: ["400"],
  });
  

const items = [
  {
    title: 'Escolha Certa',
    description: 'Dicas essenciais para escolher o anfitrião perfeito para o seu pet com total segurança e confiança.',
    date: '26.09.2024',
    image: img1,
  },
  {
    title: 'Cuidado Veterinário',
    description: 'A importância do acompanhamento veterinário durante a hospedagem para a saúde e o bem-estar do seu pet.',
    date: '26.09.2024',
    image: img2,
  },
  {
    title: 'Socialização',
    description: 'Como a hospedagem pode ser uma oportunidade de socialização divertida e enriquecedora para o seu pet.',
    date: '26.09.2024',
    image: img3,
  },
  {
    title: 'Preparação',
    description: 'Saiba como preparar seu pet para a primeira hospedagem e garantir uma experiência tranquila.',
    date: '26.09.2024',
    image: img4,
  },
];

export default function BlogCards() {
  return (
    <div className="max-w-6xl mx-auto pt-4 pb-4 mt-28 mb-28">
      <h2 className={"text-2xl font-bold mb-6 " + rubikMono.className}>Conforto e Segurança para Seu Pet</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {items.map((item, index) => (
          <Card key={index} className="relative overflow-hidden rounded-lg shadow-md">
            <Image
              src={item.image}
              alt={item.title}
              width={600}
              height={400}
              className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-lg"
            />
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <span className="flex items-center">
                  <Calendar className="h-5 w-5 mr-1" /> {item.date}
                </span>
                <ChevronRight className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button className="text-gray-600 hover:text-gray-800">
          <ChevronLeft className="h-6 w-6" /> {/* Ícone de seta para esquerda */}
        </button>
        <div className="text-sm text-gray-600">1 • 5</div>
        <button className="text-gray-600 hover:text-gray-800">
          <ChevronRight className="h-6 w-6" /> {/* Ícone de seta para direita */}
        </button>
      </div>
    </div>
  );
}
