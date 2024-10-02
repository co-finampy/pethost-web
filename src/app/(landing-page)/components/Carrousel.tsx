import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import petImage1 from '../../public/images/image1.jpg'
import petImage2 from '../../public/images/image2.jpg'
import petImage3 from '../../public/images/image3.jpg'

export function CarouselDemo() {
  const images = [
    petImage1,
    petImage2,
    petImage3,
  ]

  return (
    <Carousel className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="p-0">
                  <div className="relative w-full h-96">
                    <Image 
                      src={image}
                      alt={'Placeholder image'}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}