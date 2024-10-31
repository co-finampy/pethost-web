import { cn } from "@/lib/utils"
import Link from "next/link"


interface NavItem {
  name: string
  href: string
}

const navItems: NavItem[] = [
  { name: "Perfil", href: "/app/profile" },
  { name: "Conta", href: "/app/profile/conta" },
]
export function SettingsHeaderbar({ isActive = "Perfil" }: { isActive?: string }) {
  return (
    <div className=" bg-slate-50 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Configurações</h1>
      <nav className="flex justify-center space-x-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "px-3 py-2 text-sm rounded-md transition-colors",
              item.name === isActive
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}