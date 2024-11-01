'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "@/hooks/use-form-state";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUpAction } from "./actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";

export function SignUpForm() {
  const router = useRouter()
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    signUpAction,
    () => {
      router.push('/auth/sign-in')
    })
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (  
        <Alert variant={'destructive'}>
          <AlertTriangle className="size-4"/>
          <AlertTitle>Login Falhou</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}
      <div className="space-y-1">
        <Label htmlFor="nome">Nome</Label>
        <Input name="nome" id="nome"/>

        {errors?.nome && (
          <p className="text-xs text-red-500">{errors.nome[0]}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input name="email" type="email" id="email"/>

        {errors?.email && (
          <p className="text-xs text-red-500">{errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Senha</Label>
        <Input name="senha" type="password" id="senha"/>

        {errors?.senha && (
          <p className="text-xs text-red-500">{errors.senha[0]}</p>
        )}

      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Confirmar senha</Label>
        <Input name="confirmarSenha" type="password" id="confirmarSenha"/>

        {errors?.confirmarSenha && (
          <p className="text-xs text-red-500">{errors.confirmarSenha[0]}</p>
        )}

      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
      {isPending ? (
        <Loader2 className="size-4 animate-spin"/>
       ): (
        'Criar conta'
       )}
      </Button>

      <Button variant={"link"} className="w-full" size={"sm"} asChild
      >
        <Link href="/auth/sign-in">Já tem uma conta ? Entrar</Link>
      </Button>
    </form>
  )
}