import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react' // Ícones de menu e fechar

export type DashboardSidebarGenericProps<T = unknown> = {
  children: React.ReactNode
  className?: string
} & T

export function DashboardSidebar({
  className,
  children,
}: DashboardSidebarGenericProps) {
  const [isOpen, setIsOpen] = useState(false) // Estado de abertura do menu

  return (
    <>
      {/* Botão do menu hambúrguer visível apenas em telas pequenas */}
      <button
        className="p-4 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar visível dinamicamente com base no estado */}
      <aside
        className={cn(
          'border-r border-border flex flex-col space-y-6 bg-slate-50 transition-transform md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'fixed inset-y-0 left-0 w-64 z-50 md:static md:w-64',
          className
        )}
      >
        {children}
      </aside>

      {/* Background escurecido para fechar o menu em mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export function DashboardSidebarHeader({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return (
    <header className={cn(['px-6 py-3 border-b border-border', className])}>
      {children}
    </header>
  )
}

export function DashboardSidebarHeaderTitle({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return <h2 className={cn(['', className])}>{children}</h2>
}

export function DashboardSidebarMain({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return <main className={cn(['px-3', className])}>{children}</main>
}

export function DashboardSidebarNav({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return <nav className={cn(['', className])}>{children}</nav>
}

export function DashboardSidebarNavHeader({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return <header className={cn(['', className])}>{children}</header>
}

export function DashboardSidebarNavHeaderTitle({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return (
    <div
      className={cn([
        'text-xs uppercase text-muted-foreground ml-3',
        className,
      ])}
    >
      {children}
    </div>
  )
}

export function DashboardSidebarNavMain({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return <main className={cn(['flex flex-col', className])}>{children}</main>
}

type DashboardSidebarNavLinkProps = {
  href: string
  active?: boolean
}

export function DashboardSidebarNavLink({
  className,
  children,
  href,
  active,
}: DashboardSidebarGenericProps<DashboardSidebarNavLinkProps>) {
  return (
    <Link
      href={href}
      className={cn([
        'flex items-center text-xs px-3 py-2 rounded-md font-semibold',
        active && 'bg-slate-200',
        className,
      ])}
    >
      {children}
    </Link>
  )
}

export function DashboardSidebarFooter({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return (
    <footer className={cn(['p-6 mt-auto border-t border-border', className])}>
      {children}
    </footer>
  )
}
