'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  ArchiveIcon,
  BackpackIcon,
  DashboardIcon,
  GearIcon,
  HamburgerMenuIcon, // Ícone do menu hamburger
} from '@radix-ui/react-icons'

import { UserDropdown } from './user-dropdown'
import {
  DashboardSidebar,
  DashboardSidebarFooter,
  DashboardSidebarHeader,
  DashboardSidebarMain,
  DashboardSidebarNav,
  DashboardSidebarNavLink,
  DashboardSidebarNavMain
} from '@/components/dashboard/sidebar'
import { Logo } from '@/components/logo'

export function MainSidebar() {
  const pathname = usePathname()
  const [isSidebarOpen, setSidebarOpen] = useState(false) // Estado para controlar o menu

  const isActive = (path: string) => {
    return pathname === path
  }

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  const handleLinkClick = () => {
    setSidebarOpen(false) // Fecha a sidebar quando um link é clicado
  }

  return (
    <>
      {/* Botão hamburger visível em telas pequenas */}
      <button
        className="p-2 md:hidden" // Exibe apenas em telas pequenas (md:largura mínima 768px)
        onClick={toggleSidebar}
      >
        <HamburgerMenuIcon className="w-6 h-6" />
      </button>

      {/* Menu lateral */}
      <DashboardSidebar className={`transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block fixed md:static`}>
        <DashboardSidebarHeader>
          <Logo />
        </DashboardSidebarHeader>
        <DashboardSidebarMain className="flex flex-col flex-grow">
          <DashboardSidebarNav>
            <DashboardSidebarNavMain>
              <DashboardSidebarNavLink
                href="/app"
                active={isActive('/app')}
                onClick={handleLinkClick} // Fecha a sidebar ao clicar
              >
                <DashboardIcon className="w-5 h-5 mr-3" />
                Dashboard
              </DashboardSidebarNavLink>
              <DashboardSidebarNavLink
                href="/app/registrar-pet"
                active={isActive('/app/registrar-pet')}
                onClick={handleLinkClick} // Fecha a sidebar ao clicar
              >
                <ArchiveIcon className="w-5 h-5 mr-3" />
                Pet
              </DashboardSidebarNavLink>
              <DashboardSidebarNavLink
                href="/app/vizualizar-reservas"
                active={isActive('/app/vizualizar-reservas')}
                onClick={handleLinkClick} // Fecha a sidebar ao clicar
              >
                <BackpackIcon className="w-5 h-5 mr-3" />
                Reservas
              </DashboardSidebarNavLink>
              <DashboardSidebarNavLink
                href="/app/perfil-usuario"
                active={isActive('/app/perfil-usuario')}
                onClick={handleLinkClick} // Fecha a sidebar ao clicar
              >
                <GearIcon className="w-5 h-5 mr-3" />
                Configurações
              </DashboardSidebarNavLink>
            </DashboardSidebarNavMain>
          </DashboardSidebarNav>
        </DashboardSidebarMain>
        <DashboardSidebarFooter>
          <UserDropdown />
        </DashboardSidebarFooter>
      </DashboardSidebar>
    </>
  )
}
