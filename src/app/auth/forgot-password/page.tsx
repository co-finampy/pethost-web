import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";


export default function ForgotPasswordPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input name="email" type="email" id="email"/>
      </div>

      <Button type="submit" className="w-full">Recuperar Senha</Button>

      <Button variant={"link"} className="w-full" size={"sm"} asChild
      >
        <Link href="/auth/sign-in">Voltar para login</Link>
      </Button>
    </form>
  )
}