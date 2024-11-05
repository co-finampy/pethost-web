"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { CalendarIcon } from "lucide-react";
import { useUserProfile } from "@/hooks/use-user-profile";
import { registerPetAction } from "../actions";
import { Value } from "react-calendar/dist/esm/shared/types.js";
import { useFormState } from "@/hooks/use-form-state";

export default function CadastroPetModal() {
  const { user } = useUserProfile();
  const router = useRouter();
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
  const [isLoading, setIsLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    registerPetAction,
    () => {
      console.log('foi');
    })

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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Formulário enviado");
    console.log("Dados do pet antes do envio:", pet);

    setIsLoading(true);

    if (!user) {
      setErrorMessage(
        "Usuário não encontrado. Por favor, faça login novamente."
      );
      setIsLoading(false);
      return;
    }

    const formData = new FormData();

    // Adicione logs para verificar cada campo
    formData.append("tipoPet", pet.tipoPet);
    console.log("tipoPet:", pet.tipoPet);

    formData.append("nomePet", pet.nomePet);
    console.log("nomePet:", pet.nomePet);

    formData.append("raca", pet.raca);
    console.log("raca:", pet.raca);

    formData.append("genero", pet.genero);
    console.log("genero:", pet.genero);

    formData.append("tamanho", pet.tamanho);
    console.log("tamanho:", pet.tamanho);

    formData.append(
      "dataNascimento",
      pet.dataNascimento ? pet.dataNascimento.toISOString() : ""
    );
    console.log(
      "dataNascimento:",
      pet.dataNascimento ? pet.dataNascimento.toISOString() : ""
    );

    formData.append("vacina", String(pet.vacina));
    console.log("vacina:", String(pet.vacina));

    formData.append("castrado", String(pet.castrado));
    console.log("castrado:", String(pet.castrado));

    formData.append("foto", pet.foto);
    console.log("foto:", pet.foto);

    // Exiba todo o conteúdo do FormData após adicionar todos os campos
    console.log("FormData para envio:", Array.from(formData.entries()));

    try {
      await registerPetAction(
        formData,
        user.uid,
        new Date().toISOString(),
        user.token
      );
      console.log("Pet cadastrado com sucesso");
      setIsOpen(false);
      setPet({
        tipoPet: "",
        nomePet: "",
        raca: "",
        genero: "",
        tamanho: "",
        dataNascimento: null,
        vacina: false,
        castrado: false,
        foto: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar o pet:", error);
      setErrorMessage("Erro ao cadastrar o pet. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
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
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="tipoPet">Tipo de Pet</Label>
                <Select onValueChange={handleSelectChange("tipoPet")} required>
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
                <Select onValueChange={handleSelectChange("genero")} required>
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
                <Select onValueChange={handleSelectChange("tamanho")} required>
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
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="vacina"
                  checked={pet.vacina}
                  onCheckedChange={handleCheckboxChange("vacina")}
                />
                <Label htmlFor="vacina">Vacinado</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="castrado"
                  checked={pet.castrado}
                  onCheckedChange={handleCheckboxChange("castrado")}
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
                {isLoading ? "Cadastrando..." : "Cadastrar Pet"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
