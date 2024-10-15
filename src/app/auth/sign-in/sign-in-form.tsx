"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithEmailAndPassword } from "./actions";
import { useFormState } from "react-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export function SignInForms() {
  const [state, formAction, isPending] = useFormState(signInWithEmailAndPassword, {success: false, message: null, errors: null})
  return (
    <form action={formAction} className="space-y-4">
      {state.success === false && state.message && (  
        <Alert variant={'destructive'}>
          <AlertTriangle className="size-4"/>
          <AlertTitle>Login Falhou</AlertTitle>
          <AlertDescription>
            <p>{state.message}</p>
          </AlertDescription>
        </Alert>
      )}
      <div className="space-y-1 justify-center items-center flex font-black text-3xl text-orange-400">
        <span>PETHOST</span>
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input name="email" type="email" id="email"/>
        {state.errors?.email && (
          <p className="text-xs text-red-500">{state.errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="senha">Password</Label>
        <Input name="senha" type="password" id="senha"/>
        {state.errors?.senha && (
          <p className="text-xs text-red-500">{state.errors.senha[0]}</p>
        )}

        <a
         href="/auth/forgot-password" 
         className="text-xs font-medium text-foreground hover:underline"
        >
          Forgot password?
        </a>  
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        Acessar
      </Button>

      <Button variant={"link"} className="w-full" size={"sm"} asChild
      >
        <a href="/auth/sign-up">Ainda não tem uma conta? Criar</a>
      </Button>
    </form>
  )
}