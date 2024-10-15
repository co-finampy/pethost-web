'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, MapPinIcon, SearchIcon } from "lucide-react"
import { Menu, Transition } from "@headlessui/react"
import Calendar from "react-calendar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import 'react-calendar/dist/Calendar.css'

export function MiniFilter() {
  const [serviceType, setServiceType] = useState("Hospedagem")
  const [location, setLocation] = useState("")
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const query = new URLSearchParams({
      serviceType,
      location,
      startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
      endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
    }).toString()
    router.push(`/buscar-anfitriao?${query}`)
  }

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-lg mt-16">
      <CardContent className="p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label htmlFor="service-type" className="text-sm font-medium text-gray-700">Tipo de Serviço</label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger id="service-type" className="w-full">
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hospedagem">Hospedagem</SelectItem>
                  <SelectItem value="Creche">Creche</SelectItem>
                  <SelectItem value="Passeio">Passeio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="location" className="text-sm font-medium text-gray-700">Endereço</label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="location"
                  type="text"
                  placeholder="Digite o endereço"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Datas</label>
              <div className="flex space-x-2">
                <Menu as="div" className="relative">
                  <Menu.Button as="div">
                    <div className="w-full">
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${!startDate && "text-muted-foreground"}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "dd/MM/yyyy") : <span>De</span>}
                      </Button>
                    </div>
                  </Menu.Button>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute z-10 mt-2">
                      <Calendar
                        onChange={(date) => setStartDate(date as Date)}
                        value={startDate}
                        locale={ptBR}
                      />
                    </Menu.Items>
                  </Transition>
                </Menu>

                <Menu as="div" className="relative">
                  <Menu.Button as="div">
                    <div className="w-full">
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${!endDate && "text-muted-foreground"}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "dd/MM/yyyy") : <span>Até</span>}
                      </Button>
                    </div>
                  </Menu.Button>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute z-10 mt-2">
                      <Calendar
                        onChange={(date) => setEndDate(date as Date)}
                        value={endDate}
                        locale={ptBR}
                      />
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
            type="submit"
          >
            <SearchIcon className="mr-2" size={18} />
            Buscar
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
