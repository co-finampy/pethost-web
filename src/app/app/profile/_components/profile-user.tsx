'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useState } from "react";

export default function ProfileUser() {
  const { user } = useUserProfile();
  const [password, setPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(user?.fotoUrl || null);

  // Função para lidar com a seleção de arquivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Pré-visualização da nova imagem
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar os dados atualizados do perfil e foto
    if (selectedFile) {
      // Exemplo de como enviar a imagem para o backend
      const formData = new FormData();
      formData.append('avatar', selectedFile);
      formData.append('name', user?.nome || '');
      // enviar `formData` para o backend
    }
    // Atualizar os outros dados do perfil aqui
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            {preview ? (
              <AvatarImage src={preview} alt={user?.nome || 'User avatar'} />
            ) : (
              <AvatarFallback>{user?.nome?.slice(0, 2) || 'US'}</AvatarFallback>
            )}
          </Avatar>
          <Button variant="outline" onClick={() => document.getElementById('file-input')?.click()}>
            Change Avatar
          </Button>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue={user?.nome} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue={user?.email} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue={user?.username} />
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit">Atualizar Perfil</Button>
      </CardFooter>
    </form>
  );
}
