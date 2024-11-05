import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from "@/components/dashboard/page";
import { PetCards } from "./_components/pet-cards";
import CadastroPetModal from "./_components/register";


export default function Page() {
  return (
    <DashboardPage>
    <DashboardPageHeader>
        <DashboardPageHeaderTitle>Meus Pets</DashboardPageHeaderTitle>
    </DashboardPageHeader>
    <DashboardPageMain>
        <CadastroPetModal />
        <PetCards />
    </DashboardPageMain>
</DashboardPage>
  )
}