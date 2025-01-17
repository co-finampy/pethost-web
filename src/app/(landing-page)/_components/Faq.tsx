import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CardContent } from "@/components/ui/card";
import imageFaq from "../../public/images/image-faq.png";

const faqItems = [
  {
    question: "Como cadastrar um pet?",
    answer: "Resposta para como cadastrar um pet...",
  },
  {
    question: "O que é o serviço de hospedagem?",
    answer: "Resposta sobre o serviço de hospedagem...",
  },
  {
    question: "Qual a diferença de Hospedagem e Creche?",
    answer: "Explicação sobre a diferença entre hospedagem e creche...",
  },
  {
    question: "É possível contratar um serviço recorrente?",
    answer: "Informações sobre contratação de serviços recorrentes...",
  },
  {
    question: "Como cancelar um serviço?",
    answer: "Instruções para cancelar um serviço...",
  },
  {
    question: "Após a compra, é possível trocar o anfitrião?",
    answer: "Detalhes sobre a possibilidade de trocar o anfitrião...",
  },
  {
    question: "A PetHost é confiável ?",
    answer: "Informações sobre a confiabilidade da PetHost...",
  },
];

export function Faq() {
  return (
    <div className="max-w-6xl mx-auto p-2 mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <CardContent className="p-2 overflow-hidden relative">
            <Image
              src={imageFaq}
              alt="Happy dog lying on the ground"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
          </CardContent>
        </div>
        <div>
          <CardContent className="p-6">
            <span className="text-3xl font-bold mb-4">
              Posso te ajudar?
            </span>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
