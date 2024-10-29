import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from "@/components/dashboard/page";
import { CadastroPet } from "./_components/register";

export default function Page() {
  return (
    <DashboardPage>
    <DashboardPageHeader>
        <DashboardPageHeaderTitle>Cadastro Pet</DashboardPageHeaderTitle>
    </DashboardPageHeader>
    <DashboardPageMain>
        <CadastroPet />
    </DashboardPageMain>
</DashboardPage>
  )
}