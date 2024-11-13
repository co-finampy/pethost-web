"use client";

import React, { useState } from "react";
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import "react-calendar/dist/Calendar.css";
import { AlertTriangle } from "lucide-react";
import { useFormState } from "@/hooks/use-form-state";
import { registerPetAction } from "../actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useUserProfile } from "@/hooks/use-user-profile";
import { Checkbox } from "@/components/ui/checkbox";


export default function CadastroPetModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserProfile();
  const [pet, setPet] = useState({
    tipoPet: "",
    nomePet: "",
    raca: "",
    genero: "",
    tamanho: "",
    vacina: false,
    castrado: false,
    foto: "",
    uidUsuario: user?.uid,
  });

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    registerPetAction,
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setPet({ ...pet, [field]: value });
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
                {/* <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      name="dataNascimento"
                      id="dataNascimento"
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      id="dataNascimento"
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover> */}
                <Input id="dataNascimento" name="dataNascimento" type="date"/>
              </div>
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
              <div className="flex justify-around">
                <div className="space-y-2">
                    <div className="flex items-center gap-x-2">
                      <Checkbox 
                       id="vacina" 
                       name="vacina" 
                       className="translate-y-0.5" />
                      <Label htmlFor="vacina">Vacina</Label>
                    </div>

                    {errors?.vacina && (
                      <p className="text-xs text-red-500">{errors.vacina[0]}</p>
                    )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-x-2">
                    <Checkbox id="castrado" name="castrado"  className="translate-y-0.5" />
                    <Label htmlFor="castrado">Castrado</Label>
                  </div>

                    {errors?.castrado && (
                      <p className="text-xs text-red-500">{errors.castrado[0]}</p>
                    )}
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Picture</Label>
                <Input id="foto" name="foto" type="file" />
              </div>     
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
