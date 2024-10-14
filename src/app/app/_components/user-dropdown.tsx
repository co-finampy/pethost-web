import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LockClosedIcon } from '@radix-ui/react-icons'


export function UserDropdown() {
  // if (!user) return

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className="relative h-8 flex items-center justify-between w-full space-x-2 !px-0"
        >
          <Avatar className="h-10 w-10">
            {/* <AvatarImage src={user.image as string} alt={user.name as string} /> */}
            <AvatarFallback>A</AvatarFallback>
          </Avatar>

          <div className="flex flex-col flex-1 space-y-1 text-left">
            {/* {user.name && (
              <p className="text-sm font-medium leading-none">{user.name}</p>
            )} */}
            {/* {user.email} */}
            <p className="text-xs leading-none text-muted-foreground">
              
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            {/* {user.name} */}
            <p className="text-sm font-medium leading-none"></p>
            {/* {user.email} */}
            <p className="text-xs leading-none text-muted-foreground">
              
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* onClick={() => signOut()} DropdownMenuItem  */}
        <DropdownMenuItem>
          <LockClosedIcon className="w-3 h-3 mr-3" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
