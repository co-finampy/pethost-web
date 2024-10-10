import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";


export default function SignUpPage() {
  return (
    <form action="" className="space-y-4">

      <div className="space-y-1">
        <Label htmlFor="nome">Nome</Label>
        <Input name="nome" id="nome"/>
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input name="email" type="email" id="email"/>
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" id="password"/>

      </div>

      <Button type="submit" className="w-full">Criar Conta</Button>

      <Button variant={"link"} className="w-full" size={"sm"} asChild
      >
        <Link href="/auth/sign-in">Já tem uma conta ? Entrar</Link>
      </Button>
    </form>
  )
}