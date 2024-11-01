import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from "@/components/dashboard/page";
import { PetCards } from "./_components/pet-cards";

export default function Page() {
  return (
    <DashboardPage>
    <DashboardPageHeader>
        <DashboardPageHeaderTitle>Meus Pets</DashboardPageHeaderTitle>
    </DashboardPageHeader>
    <DashboardPageMain>
        <PetCards />
    </DashboardPageMain>
</DashboardPage>
  )
}