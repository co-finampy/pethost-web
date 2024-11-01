import { useState, useEffect } from 'react';
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
  pets: Pet[];
  token: string | null;
  authorities: string[];
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
  password: string;
}


export interface Pet {
  id: number;
  tipoPet: string;
  nomePet: string;
  raca: string;
  genero: "Masculino" | "Feminino";
  tamanho: "Pequeno" | "Médio" | "Grande";
  dataNascimento: string;
  vacina: boolean;
  castrado: boolean;
  foto: string;
  criadoEm: string;
}


export function useUserProfile() {
  const [user, setUser] = useState<GetProfileResponse | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      setIsPending(true);
      setError(null);

      try {
        const { sub, token } = await getSubFromToken();

        if (sub && token) {
          console.log('Sub:', sub);
          console.log('Token:', token);
          const profile = await GetProfile(sub, token);
          console.log('Profile:', profile);
          setUser(profile);
        } else {
          console.error('Sub ou token não encontrados');
          setError('Sub ou token não encontrados');
        }
      } catch (err) {
        console.error('Erro ao buscar os dados do usuário:', err);
        setError('Erro ao buscar os dados do usuário');
      } finally {
        setIsPending(false);
      }
    }

    fetchUserData();
  }, []);

  return { user, isPending, error };
}
