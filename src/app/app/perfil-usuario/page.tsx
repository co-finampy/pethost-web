// components/PerfilUsuario.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Usuario {
  nome: string;
  email: string;
  telefone: string;
  tipoUsuario: string;
  endereco: string;
  fotoUrl: string;
}

export default function PerfilUsuario() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario>({
    nome: '',
    email: '',
    telefone: '',
    tipoUsuario: '',
    endereco: '',
    fotoUrl: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

  useEffect(() => {
    // Simula a busca dos dados do usuário
    setUsuario({
      nome: 'João Silva',
      email: 'joao.silva@example.com',
      telefone: '(11) 98765-4321',
      tipoUsuario: 'dono',
      endereco: 'Rua das Flores, 123 - São Paulo, SP',
      fotoUrl: '/placeholder.svg?height=100&width=100'
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setUsuario({ ...usuario, tipoUsuario: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUsuario({ ...usuario, fotoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simula o envio dos dados para a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Ocorreu um erro ao atualizar o perfil. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simula a mudança de senha
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Senha alterada com sucesso!');
      setSenhaAtual('');
      setNovaSenha('');
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      alert('Ocorreu um erro ao alterar a senha. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Perfil de Usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center mb-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={usuario.fotoUrl} alt={usuario.nome} />
              <AvatarFallback>{usuario.nome.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          {isEditing && (
            <div className="space-y-2">
              <Label htmlFor="fotoUrl">Foto de Perfil</Label>
              <Input
                id="fotoUrl"
                name="fotoUrl"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              name="nome"
              value={usuario.nome}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={usuario.email}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              name="telefone"
              value={usuario.telefone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tipoUsuario">Tipo de Usuário</Label>
            <Select
              onValueChange={handleSelectChange}
              defaultValue={usuario.tipoUsuario}
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de usuário" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dono">Dono de Pet</SelectItem>
                <SelectItem value="cuidador">Cuidador</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço</Label>
            <Input
              id="endereco"
              name="endereco"
              value={usuario.endereco}
              onChange={handleChange}
              disabled={!isEditing}
              required // Agora estamos usando um campo Input para o endereço
            />
          </div>
          {isEditing ? (
            <div className="flex space-x-2">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
            </div>
          ) : (
            <Button type="button" className="w-full" onClick={() => setIsEditing(true)}>
              Editar Perfil
            </Button>
          )}
        </form>
        <form onSubmit={handleChangePassword} className="space-y-4 mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Mudar Senha</CardTitle>
          </CardHeader>
          <div className="space-y-2">
            <Label htmlFor="senhaAtual">Senha Atual</Label>
            <Input
              id="senhaAtual"
              name="senhaAtual"
              type="password"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="novaSenha">Nova Senha</Label>
            <Input
              id="novaSenha"
              name="novaSenha"
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Alterando...' : 'Alterar Senha'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
