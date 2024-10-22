import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from "@/components/dashboard/page";

export default function Page() {
  return (
    <DashboardPage>
    <DashboardPageHeader>
        <DashboardPageHeaderTitle>Reservas</DashboardPageHeaderTitle>
    </DashboardPageHeader>
    <DashboardPageMain>
        Reservas
    </DashboardPageMain>
</DashboardPage>
  )
}