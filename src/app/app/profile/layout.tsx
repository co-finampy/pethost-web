import { PropsWithChildren } from "react";
import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from "@/components/dashboard/page";
import { SettingsHeaderbar } from "./_components/settings-headerbar";

export default async function Layout({ children }: PropsWithChildren) {
    return (
      <DashboardPage>
      <DashboardPageHeader>
          <DashboardPageHeaderTitle>Settings</DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
            <SettingsHeaderbar />
            <div className="">{children}</div>
      </DashboardPageMain>
    </DashboardPage>
    );
}