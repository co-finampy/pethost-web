'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaGoogle, FaApple } from 'react-icons/fa'; // Importando os ícones do React Icons
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login com:', email, password);
  };

  const handleGoogleLogin = () => {
    console.log('Login com Google');
  };

  const handleAppleLogin = () => {
    console.log('Login com Apple');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Faça seu login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Ou{' '}
            <Link href="/cadastro" className="font-medium text-orange-600 hover:text-orange-500">
              cadastre-se gratuitamente
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Label htmlFor="email" className="sr-only">
                Endereço de e-mail
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Endereço de e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password" className="sr-only">
                Senha
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Lembrar-me
              </Label>
            </div>

            <div className="text-sm">
              <Link href="/esqueci-senha" className="font-medium text-orange-600 hover:text-orange-500">
                Esqueceu sua senha?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Entrar
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou continue com</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              onClick={handleGoogleLogin}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <FaGoogle className="w-5 h-5 mr-2" />
              <span className="sr-only">Entrar com Google</span>
              Google
            </Button>

            <Button
              onClick={handleAppleLogin}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <FaApple className="w-5 h-5 mr-2" />
              <span className="sr-only">Entrar com Apple</span>
              Apple
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
