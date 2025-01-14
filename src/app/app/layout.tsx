import { PropsWithChildren } from "react";
import { MainSidebar } from "./_components/main-sidebar";

export default async function Layout({ children }: PropsWithChildren) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr]">
            <MainSidebar />
            <main>{children}</main>
        </div>
    );
}
