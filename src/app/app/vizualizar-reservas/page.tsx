import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from "@/components/dashboard/page";
import Booking from "./_components/bookings";

export default function Page() {
  return (
    <DashboardPage>
    <DashboardPageHeader>
        <DashboardPageHeaderTitle>Reservas</DashboardPageHeaderTitle>
    </DashboardPageHeader>
    <DashboardPageMain>
       <Booking />  
    </DashboardPageMain>
  </DashboardPage>
  )
}