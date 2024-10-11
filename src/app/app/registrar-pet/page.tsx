'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Calendar from "react-calendar" // Importando o React Calendar
import "react-calendar/dist/Calendar.css" // Estilos do React Calendar
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

export default function CadastroPet() {
  const router = useRouter()
  const [pet, setPet] = useState({
    tipoPet: '',
    nomePet: '',
    raca: '',
    genero: '',
    tamanho: '',
    dataNascimento: null as Date | null,
    vacina: false,
    castrado: false,
    foto: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPet({ ...pet, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (field: string) => (value: string) => {
    setPet({ ...pet, [field]: value })
  }

  const handleCheckboxChange = (field: keyof typeof pet) => (checked: boolean) => {
    setPet({ ...pet, [field]: checked })
  }

  const handleDateChange = (date: Date | null) => {
    setPet({ ...pet, dataNascimento: date })
    setShowCalendar(false) // Fecha o calendário após selecionar a data
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPet({ ...pet, foto: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pet),
      })

      if (response.ok) {
        router.push('/pets')
      } else {
        throw new Error('Falha ao cadastrar o pet')
      }
    } catch (error) {
      console.error('Erro ao cadastrar pet:', error)
      alert('Ocorreu um erro ao cadastrar o pet. Por favor, tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Cadastro de Pet</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tipoPet">Tipo de Pet</Label>
            <Select onValueChange={handleSelectChange('tipoPet')} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de pet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cachorro">Cachorro</SelectItem>
                <SelectItem value="gato">Gato</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="nomePet">Nome do Pet</Label>
            <Input
              id="nomePet"
              name="nomePet"
              value={pet.nomePet}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="raca">Raça</Label>
            <Input
              id="raca"
              name="raca"
              value={pet.raca}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="genero">Gênero</Label>
            <Select onValueChange={handleSelectChange('genero')} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o gênero" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="macho">Macho</SelectItem>
                <SelectItem value="femea">Fêmea</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tamanho">Tamanho</Label>
            <Select onValueChange={handleSelectChange('tamanho')} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tamanho" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pequeno">Pequeno</SelectItem>
                <SelectItem value="medio">Médio</SelectItem>
                <SelectItem value="grande">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dataNascimento">Data de Nascimento</Label>
            <div className="relative">
              <Button
                variant={"outline"}
                className={`w-full justify-start text-left font-normal ${!pet.dataNascimento && "text-muted-foreground"}`}
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {pet.dataNascimento ? format(pet.dataNascimento, "PPP") : <span>Selecione uma data</span>}
              </Button>
              {showCalendar && (
                <Calendar
                  onChange={handleDateChange}
                  value={pet.dataNascimento}
                  className="absolute z-10 mt-2"
                />
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="vacina"
              checked={pet.vacina}
              onCheckedChange={handleCheckboxChange('vacina')}
            />
            <Label htmlFor="vacina">Vacinado</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="castrado"
              checked={pet.castrado}
              onCheckedChange={handleCheckboxChange('castrado')}
            />
            <Label htmlFor="castrado">Castrado</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="foto">Foto do Pet</Label>
            <Input
              id="foto"
              name="foto"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar Pet'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
