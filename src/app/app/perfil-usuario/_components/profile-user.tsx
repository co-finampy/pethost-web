'use client';


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserProfile } from "@/hooks/use-user-profile";

export default function ProfileUser() {
  const { user } = useUserProfile();
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Perfil de Usuário</CardTitle>
      </CardHeader>
      <CardContent>
      </CardContent>
    </Card>
  );
}
