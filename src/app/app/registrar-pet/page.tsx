import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from "@/components/dashboard/page";

export default function Page() {
  return (
    <DashboardPage>
    <DashboardPageHeader>
        <DashboardPageHeaderTitle>Cadastro Pet</DashboardPageHeaderTitle>
    </DashboardPageHeader>
    <DashboardPageMain>
        Conteudo cadastro
    </DashboardPageMain>
</DashboardPage>
  )
}