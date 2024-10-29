'use client'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useUserProfile } from '@/hooks/use-user-profile'
import signOut from '@/http/get-sign-out'
import { AvatarImage } from '@radix-ui/react-avatar'
import { LockClosedIcon } from '@radix-ui/react-icons'
import {RocketIcon, User2 } from 'lucide-react'
import Link from 'next/link'

export function UserDropdown() {
  const { user } = useUserProfile()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className="relative h-8 flex items-center justify-between w-full space-x-2 !px-0"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.fotoUrl as string} alt={user?.nome as string} />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>

          <div className="flex flex-col flex-1 space-y-1 text-left">
            {user?.nome && (
              <p className="text-sm font-medium leading-none">{user?.nome}</p>
            )}
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.nome}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem >
            <RocketIcon className="w-4 h-4 mr-3" />
            <Link href="/">Homepage</Link>
          </DropdownMenuItem>
          <DropdownMenuItem >
            <User2 className="w-4 h-4 mr-3" />
            <Link href="/app/perfil-usuario">Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LockClosedIcon className="w-4 h-4 mr-3" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
