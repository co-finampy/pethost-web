'use client';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    {name: 'Anfitriões', href: '/andfitrioes'},
    {name: 'Como funciona', href: '/como-funciona'},
    {name: 'Blog', href: 'blog'},
    {name: 'Quero ser um anfitrião', href: '/quero-ser-um-anfitriao'},
  ]
  return (
    <nav className="bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-gray-900">
              PetHost
            </span>
          </Link>
        </div>
        <div className="hidden sm:flex sm:items-center sm:justify-center flex-grow">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden sm:flex sm:items-center">
          <Button>Entrar</Button>
        </div>
        <div className="flex items-center sm:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open main menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:hidden">
              <nav className="mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button className="mt-4 w-full">Entrar</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  </nav>
  )
}