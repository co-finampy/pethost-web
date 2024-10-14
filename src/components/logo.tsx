import { GlobeIcon } from "@radix-ui/react-icons";

export function Logo() {
    return (
        <div className="bg-black h-6 w-6 flex items-center justify-center rounded-md">
            <GlobeIcon className="w-3 h-3 text-white" />
        </div>
    )
}