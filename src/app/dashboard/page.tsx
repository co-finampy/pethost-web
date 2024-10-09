"use client" // Adicione esta linha para marcar o componente como Client Component

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PawPrint, Home, Calendar, MessageSquare, Settings, Menu, X, Users, DollarSign } from 'lucide-react'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const pathname = usePathname()

  const menuItems = [
    { icon: Home, label: 'Início', href: '/dashboard' },
    { icon: PawPrint, label: 'Meus Pets', href: '/dashboard/pets' },
    { icon: Calendar, label: 'Reservas', href: '/dashboard/reservas' },
    { icon: MessageSquare, label: 'Mensagens', href: '/dashboard/mensagens' },
    { icon: Users, label: 'Comunidade', href: '/dashboard/comunidade' },
    { icon: DollarSign, label: 'Financeiro', href: '/dashboard/financeiro' },
    { icon: Settings, label: 'Configurações', href: '/dashboard/configuracoes' },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-md">
        <div className="flex items-center justify-center h-20 border-b">
          <span className="text-2xl font-bold text-orange-600">PetHost</span>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2 py-4">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} passHref>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      pathname === item.href ? 'bg-orange-100 text-orange-600' : ''
                    }`}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-200 p-2 rounded-full">
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Nome do Usuário</p>
              <p className="text-xs text-gray-500">usuario@email.com</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden bg-white shadow-md h-16 flex items-center justify-between px-4">
          <span className="text-2xl font-bold text-orange-600">PetHost</span>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X /> : <Menu />}
          </Button>
        </header>

        {sidebarOpen && (
          <aside className="md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md">
            <div className="flex items-center justify-between h-16 px-4 border-b">
              <span className="text-2xl font-bold text-orange-600">PetHost</span>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X />
              </Button>
            </div>
            <nav>
              <ul className="space-y-2 py-4">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} passHref>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${
                          pathname === item.href ? 'bg-orange-100 text-orange-600' : ''
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon className="mr-2 h-5 w-5" />
                        {item.label}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-200 p-2 rounded-full">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Nome do Usuário</p>
                  <p className="text-xs text-gray-500">usuario@email.com</p>
                </div>
              </div>
            </div>
          </aside>
        )}

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Bem-vindo ao PetHost</h1>
          {/* Conteúdo do Dashboard */}
        </main>
      </div>
    </div>
  )
}
