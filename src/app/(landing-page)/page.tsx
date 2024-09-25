
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <Card className="h-screen flex items-center justify-center">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Bem vindo a Pethost</CardTitle>
        <CardDescription className="text-sm mt-2">Faça parte da nossa comunidade de anfitriões</CardDescription>
      </CardHeader>
    </Card>
  );
}
