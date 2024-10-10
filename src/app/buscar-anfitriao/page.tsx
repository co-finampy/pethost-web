"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@radix-ui/react-switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select"; // Importações do Radix UI
import { Checkbox } from "@/components/ui/checkbox"; // Importando Checkbox do Radix UI
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, SlidersHorizontal, MapPin, Star, Users } from "lucide-react";

export default function Component() {
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([20, 200]);
  const [petSpayed, setPetSpayed] = useState(false);
  const [petSizes, setPetSizes] = useState({
    toy: false,
    small: false,
    medium: false,
    large: false,
  });
  const [petGender, setPetGender] = useState("");
  const [serviceType, setServiceType] = useState("Hospedagem");
  const [showMap, setShowMap] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Pesquisando:", search, "com filtros:", {
      priceRange,
      petSpayed,
      petSizes,
      petGender,
      serviceType,
    });
  };

  const sitters = [
    {
      id: 1,
      name: "Fernanda",
      location: "Bancários",
      distance: 5.2,
      rating: 5.0,
      reviews: 14,
      loyalClients: 1,
      price: 40,
    },
    {
      id: 2,
      name: "Tássia",
      location: "Jardim Cidade Universitária",
      distance: 6.3,
      rating: 5.0,
      reviews: 107,
      loyalClients: 44,
      price: 52,
    },
    {
      id: 3,
      name: "Thiago",
      location: "Manaíra",
      distance: 7.0,
      rating: 5.0,
      reviews: 158,
      loyalClients: 49,
      price: 73,
    },
    {
      id: 4,
      name: "Leila",
      location: "Jardim Cidade Universitária",
      distance: 6.4,
      rating: 5.0,
      reviews: 47,
      loyalClients: 19,
      price: 55,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-4">
      <form onSubmit={handleSearch} className="flex flex-wrap gap-2">
        <Select value={serviceType} onValueChange={setServiceType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Tipo de Serviço" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Hospedagem">Hospedagem</SelectItem>
            <SelectItem value="Creche">Creche</SelectItem>
            <SelectItem value="Passeio">Passeio</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Endereço"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow"
        />
        <Input type="date" className="w-[150px]" placeholder="Entrada" />
        <Input type="date" className="w-[150px]" placeholder="Saída" />
        <Button
          className="bg-black text-white hover:bg-gray-800 transition-colors duration-200"
          type="submit"
        >
          <Search className="mr-2 h-4 w-4" /> Buscar
        </Button>
      </form>

      <div className="flex items-center space-x-2">
        <Switch id="show-map" checked={showMap} onCheckedChange={setShowMap} />
        <Label htmlFor="show-map">Mostrar mapa</Label>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4 space-y-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="text-lg font-semibold">Filtros (3)</h2>
              <div>
                <Label>Tamanho do Pet</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {Object.entries(petSizes).map(([size, checked]) => (
                    <div key={size} className="flex items-center space-x-2">
                      <Checkbox
                        id={`size-${size}`}
                        checked={checked}
                        onCheckedChange={(value) =>
                          setPetSizes((prev) => ({ ...prev, [size]: !!value }))
                        }
                      />
                      <Label htmlFor={`size-${size}`}>
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4">
                <Label
                  htmlFor="price-range"
                  className="text-lg font-semibold text-gray-800"
                >
                  Faixa de Preço: R${priceRange[0]} - R${priceRange[1]}
                </Label>
                <Slider
                  id="price-range"
                  min={20}
                  max={200}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mt-2 bg-gray-400 rounded-lg h-2 backdrop-blur-lg shadow-lg"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-lg font-semibold">Gênero do Pet</Label>
                <div className="flex space-x-2">
                  <Button
                    variant={petGender === "M" ? "default" : "outline"}
                    onClick={() => setPetGender("M")}
                    className={`${
                      petGender === "M"
                        ? "bg-black text-white shadow-lg"
                        : "bg-white text-black border border-black"
                    }`}
                  >
                    Macho
                  </Button>
                  <Button
                    variant={petGender === "F" ? "default" : "outline"}
                    onClick={() => setPetGender("F")}
                    className={`${
                      petGender === "F"
                        ? "bg-black text-white shadow-lg"
                        : "bg-white text-black border border-black"
                    }`}
                  >
                    Fêmea
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="pet-spayed"
                  checked={petSpayed}
                  onCheckedChange={setPetSpayed}
                  className={`${
                    petSpayed
                      ? "bg-black border-transparent" 
                      : "bg-gray-300 border-gray-400"
                  } relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 ease-in-out`}
                >
                  <span
                    className={`${
                      petSpayed ? "translate-x-5" : "translate-x-0"
                    } inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out`}
                  />
                </Switch>
                <Label
                  htmlFor="pet-spayed"
                  className={`${
                    petSpayed ? "text-black font-semibold" : "text-gray-700"
                  }`}
                >
                  Pet Castrado
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-3/4 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">5 anfitriões encontrados</p>
            <Select defaultValue="recommended">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recomendado</SelectItem>
                <SelectItem value="price-low">Menor preço</SelectItem>
                <SelectItem value="price-high">Maior preço</SelectItem>
                <SelectItem value="rating">Melhor avaliação</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {sitters.map((sitter) => (
            <Card key={sitter.id}>
              <CardContent className="p-4 flex items-start space-x-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={`/placeholder.svg?height=96&width=96`}
                    alt={sitter.name}
                  />
                  <AvatarFallback>{sitter.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{sitter.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {sitter.location} - {sitter.distance} km
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Star className="mr-1 h-4 w-4" />
                    {sitter.rating} ({sitter.reviews} avaliações)
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {sitter.loyalClients} clientes fiéis
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-lg font-semibold">
                    R${sitter.price}
                    <span className="text-sm font-normal text-gray-500">
                      /noite
                    </span>
                  </p>
                  <Button
                    size="sm"
                    className="mt-2 bg-black text-white hover:bg-gray-800 transition-colors duration-200"
                  >
                    Ver perfil
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
