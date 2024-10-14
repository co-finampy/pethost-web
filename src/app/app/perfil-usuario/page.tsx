import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from "@/components/dashboard/page";
import ProfileUser from "./_components/profile-user";

export default function Page() {
  return (
    <DashboardPage>
    <DashboardPageHeader>
        <DashboardPageHeaderTitle>Settings</DashboardPageHeaderTitle>
    </DashboardPageHeader>
    <DashboardPageMain>
        <ProfileUser />
    </DashboardPageMain>
</DashboardPage>
  )
}