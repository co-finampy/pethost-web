'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useFormState } from "@/hooks/use-form-state";
import { SignInWithEmailAndPassword } from "./actions";
import Link from "next/link";

export function SignInForms() {

  const { formState: { success, message, errors }, handleSubmit, isPending } = useFormState(SignInWithEmailAndPassword)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle size={4}  />
          <AlertTitle> Sign in Failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}
      <div className="space-y-1 justify-center items-center flex font-black text-3xl text-orange-400">
        <span>PETHOST</span>
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input name="email" type="email" id="email"/>

        {errors?.email && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.email[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="senha">Password</Label>
        <Input name="senha" type="password" id="senha"/>

        {errors?.senha && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.senha[0]}
          </p>
        )}
        <Link
         href="/auth/forgot-password" 
         className="text-xs font-medium text-foreground hover:underline"
        >
          Forgot password?
        </Link>  
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className=" animate-spin" size={4} />
        ): (
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