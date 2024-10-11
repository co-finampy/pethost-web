"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch"; // Ajuste aqui para o Switch
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Ajuste na importação
import { Checkbox } from "@/components/ui/checkbox"; // Ajuste para Checkbox
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
                />
                <Label htmlFor="pet-spayed">Pet Castrado</Label>
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
                <SelectItem value="price-low">Menor Preço</SelectItem>
                <SelectItem value="price-high">Maior Preço</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sitters.map((sitter) => (
              <Card key={sitter.id} className="shadow-lg">
                <CardContent className="space-y-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={`https://avatar.io/${sitter.name}`} />
                    <AvatarFallback>{sitter.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{sitter.name}</h3>
                    <p className="text-gray-500">{sitter.location}</p>
                    <p className="text-gray-500">
                      <MapPin className="inline-block mr-1 h-4 w-4" />
                      {sitter.distance} km de distância
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <p className="text-sm font-medium">
                        {sitter.rating} ({sitter.reviews} avaliações)
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-500">
                        {sitter.loyalClients} clientes leais
                      </p>
                    </div>
                    <p className="text-lg font-semibold">
                      R$ {sitter.price}/noite
                    </p>
                  </div>
                  <Button variant="default" className="w-full">
                    Ver Perfil
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
