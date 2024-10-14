'use client'
import { usePathname } from 'next/navigation'
import {
  ArchiveIcon,
  BackpackIcon,
  DashboardIcon,
  GearIcon,
} from '@radix-ui/react-icons'

import { UserDropdown } from './user-dropdown'
import { DashboardSidebar, DashboardSidebarFooter, DashboardSidebarHeader, DashboardSidebarMain, DashboardSidebarNav, DashboardSidebarNavLink, DashboardSidebarNavMain } from '@/components/dashboard/sidebar'
import { Logo } from '@/components/logo'

export function MainSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <DashboardSidebar>
      <DashboardSidebarHeader>
        <Logo />
      </DashboardSidebarHeader>
      <DashboardSidebarMain className="flex flex-col flex-grow">
        <DashboardSidebarNav>
          <DashboardSidebarNavMain>
            <DashboardSidebarNavLink href="/app" active={isActive('/app')}>
              <DashboardIcon className="w-5 h-5 mr-3" />
              Dashboard
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink
              href="/app/releases"
              active={isActive('/app/releases')}
            >
              <ArchiveIcon className="w-5 h-5 mr-3" />
              Pet
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink
              href="/app/reports"
              active={isActive('/app/reports')}
            >
              <BackpackIcon className="w-5 h-5 mr-3" />
              Reservas
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink
              href="/app/settings"
              active={isActive('/app/settings')}
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
  )
}
