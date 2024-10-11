'use client'
import { Label } from "@/components/ui/label";
import { SignInWithEmailAndPassword } from "./actions";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormState } from "react-dom";


export function SignInForm() {
  const [state, formAction, isPending] = useFormState(SignInWithEmailAndPassword, null)
  return (
    <form action={formAction} className="space-y-4">
      <h1>{state}</h1>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input name="email" type="email" id="email"/>
      </div>

      <div className="space-y-1">
        <Label htmlFor="senha">Password</Label>
        <Input name="senha" type="password" id="senha"/>

        <Link
         href="/auth/forgot-password" 
         className="text-xs font-medium text-foreground hover:underline"
        >
          Forgot password?
        </Link>  
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Acessar'
        )}
      </Button>

      <Button variant={"link"} className="w-full" size={"sm"} asChild
      >
        <Link href="/auth/sign-up">Ainda não tem uma conta? Criar</Link>
      </Button>
    </form>
  )
}