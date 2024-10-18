'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSubFromToken } from '@/http/get-sub-jwt';
import { GetProfile } from '@/http/get-profile';
interface GetProfileResponse {
  uid: string;
  nome: string;
  email: string;
  senha: string;
  telefone: string | null;
  tipoUsuario: string | null;
  endereco: string | null;
  fotoUrl: string | null;
  datasDisponiveis: string[] | null;
  pets: string[];
  token: string | null;
  authorities: string[];
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
  password: string;
}
export default function ProfileUser() {
  const [user, setUser] = useState<GetProfileResponse | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const {sub, token} = await getSubFromToken();

        if (sub && token) {
          console.log('Sub:', sub);
          console.log('Token:', token);
          const profile = await GetProfile(sub, token);
          console.log('Profile:', profile);
          setUser(profile);
        } else {
          console.error('Sub não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
      }
    }

    fetchUserData();
  }, []);


  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Perfil de Usuário</CardTitle>
      </CardHeader>
      <CardContent>
       <pre>{JSON.stringify(user, null, 2)}</pre>
      </CardContent>
    </Card>
  );
}
