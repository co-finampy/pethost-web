"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { AlertTriangle, CalendarIcon } from "lucide-react";
import { useFormState } from "@/hooks/use-form-state";
import { registerPetAction } from "../actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export default function CadastroPetModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [pet, setPet] = useState({
    tipoPet: "",
    nomePet: "",
    raca: "",
    genero: "",
    tamanho: "",
    dataNascimento: null as Date | null,
    vacina: false,
    castrado: false,
    foto: "",
  });
  const [showCalendar, setShowCalendar] = useState(false);

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    registerPetAction,
    () => {
      console.log("Pet cadastrado com sucesso");
    })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPet({ ...pet, foto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setPet({ ...pet, [field]: value });
  };

  const handleCheckboxChange =
    (field: keyof typeof pet) => (checked: boolean) => {
      setPet({ ...pet, [field]: checked });
    };

  const handleDateChange = (
    value: Value,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (Array.isArray(value)) {
      // Lidar com intervalos de data
      setPet({
        ...pet,
        dataNascimento: value[0] instanceof Date ? value[0] : null, // Usar a primeira data do intervalo
      });
    } else if (value instanceof Date) {
      // Lidar com uma única data
      setPet({
        ...pet,
        dataNascimento: value,
      });
    } else {
      // Se value for nulo ou não for válido
      setPet({
        ...pet,
        dataNascimento: null,
      });
    }
    setShowCalendar(false);
  };


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-7">Cadastrar Novo Pet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <Card className="w-full p-4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Cadastro de Pet
            </CardTitle>
            {success === false && message && (  
              <Alert variant={'destructive'}>
                <AlertTriangle className="size-4"/>
                <AlertTitle>Cadastro de pet falhou</AlertTitle>
                <AlertDescription>
                  <p>{message}</p>
                </AlertDescription>
              </Alert>
            )}
            {success === true && message && (
              <Alert variant={'default'}>
                <AlertTriangle className="size-4"/>
                <AlertTitle>Cadastro de pet realizado com sucesso</AlertTitle>
                <AlertDescription>
                  <p>{message}</p>
                </AlertDescription>
              </Alert>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="tipoPet">Tipo de Pet</Label>
                <Select onValueChange={handleSelectChange("tipoPet")} name="tipoPet">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de pet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cachorro">Cachorro</SelectItem>
                    <SelectItem value="gato">Gato</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>

                 {errors?.tipoPet && (
                  <p className="text-xs text-red-500">{errors.tipoPet[0]}</p>
                 )}
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

                {errors?.nomePet && (
                  <p className="text-xs text-red-500">{errors.nomePet[0]}</p>
                 )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="raca">Raça</Label>
                <Input
                  id="raca"
                  name="raca"
                  value={pet.raca}
                  onChange={handleChange}
                />

                  {errors?.raca && (
                  <p className="text-xs text-red-500">{errors.raca[0]}</p>
                 )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="genero">Gênero</Label>
                <Select onValueChange={handleSelectChange("genero")} name="genero">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="macho">Macho</SelectItem>
                    <SelectItem value="femea">Fêmea</SelectItem>
                  </SelectContent>
                </Select>
                {errors?.genero && (
                  <p className="text-xs text-red-500">{errors.genero[0]}</p>
                 )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="tamanho">Tamanho</Label>
                <Select onValueChange={handleSelectChange("tamanho")} name="tamanho">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tamanho" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pequeno">Pequeno</SelectItem>
                    <SelectItem value="medio">Médio</SelectItem>
                    <SelectItem value="grande">Grande</SelectItem>
                  </SelectContent>
                </Select>
                {errors?.tamanho && (
                  <p className="text-xs text-red-500">{errors.tamanho[0]}</p>
                 )}
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <div className="relative">
                  <Button
                    name="dataNascimento"
                    type="button"
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      !pet.dataNascimento && "text-muted-foreground"
                    }`}
                    onClick={() => setShowCalendar(!showCalendar)}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {pet.dataNascimento ? (
                      format(pet.dataNascimento, "PPP")
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                  {showCalendar && (
                    <Calendar
                      onChange={handleDateChange}
                      value={pet.dataNascimento}
                      className="absolute z-10 mt-2"
                    />
                  )}
                   {errors?.dataNascimento && (
                      <p className="text-xs text-red-500">{errors.dataNascimento[0]}</p>
                    )}
                </div>
              </div> */}
              {/* <div className="flex items-center space-x-2">
                <Checkbox
                  id="vacina"
                  name="vacina"
                  checked={pet.vacina}
                  onCheckedChange={handleCheckboxChange("vacina")}
                />
                <Label htmlFor="vacina">Vacinado</Label>
                {errors?.vacina && (
                      <p className="text-xs text-red-500">{errors.vacina[0]}</p>
                )}
              </div> */}
              {/* <div className="flex items-center space-x-2">
                <Checkbox
                  id="castrado"
                  name="castrado"
                  checked={pet.castrado}
                  onCheckedChange={handleCheckboxChange("castrado")}
                />
                <Label htmlFor="castrado">Castrado</Label>
                {errors?.castrado && (
                      <p className="text-xs text-red-500">{errors.castrado[0]}</p>
                    )}
              </div> */}
              {/* <div className="space-y-2">
                <Label htmlFor="foto">Foto do Pet</Label>
                <Input
                  id="foto"
                  name="foto"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />

                {errors?.foto && (
                  <p className="text-xs text-red-500">{errors.foto[0]}</p>
                )}
              </div> */}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Cadastrando..." : "Cadastrar Pet"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
