"use client"

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PawPrint, Calendar, User } from 'lucide-react'
import { useUserProfile } from '@/hooks/use-user-profile'

export function PetCards() {
  const { user } = useUserProfile();


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {user?.pets.map((pet) => (
        <Card key={pet.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>{pet.nomePet}</span>
              <Badge variant="secondary" className="text-xs">{pet.tipoPet}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="relative w-[50px] h-[50px]">
                <Image
                  src={pet.foto}
                  alt={`Foto de ${pet.nomePet}`}
                  className="rounded-full object-cover"
                  fill
                  sizes="50px"
                />
              </div>
              <div className="space-y-1 text-sm">
                <p className="flex items-center gap-1">
                  <PawPrint className="h-3 w-3" />
                  <span>{pet.raca}</span>
                </p>
                <p className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(pet.dataNascimento).toLocaleDateString()}</span>
                </p>
                <p className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{user.nome}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}