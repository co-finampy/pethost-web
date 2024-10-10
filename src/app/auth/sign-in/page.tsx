import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SignInWithEmailAndPassword } from "./actions";


export default function SignInPage() {
  return (
    <form action={SignInWithEmailAndPassword} className="space-y-4">
      <div className="space-y-1 justify-center items-center flex font-black text-3xl text-orange-400">
        <span>PETHOST</span>
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input name="email" type="email" id="email"/>
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" id="password"/>

        <Link
         href="/auth/forgot-password" 
         className="text-xs font-medium text-foreground hover:underline"
        >
          Forgot password?
        </Link>  
      </div>

      <Button type="submit" className="w-full">Acessar</Button>

      <Button variant={"link"} className="w-full" size={"sm"} asChild
      >
        <Link href="/auth/sign-up">Ainda não tem uma conta? Criar</Link>
      </Button>
    </form>
  )
}