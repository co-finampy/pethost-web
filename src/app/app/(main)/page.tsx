import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from "@/components/dashboard/page";

export default async function Page() {
  return (
      <DashboardPage>
          <DashboardPageHeader>
              <DashboardPageHeaderTitle>Dashboard</DashboardPageHeaderTitle>
          </DashboardPageHeader>
          <DashboardPageMain>
              Dashboard
          </DashboardPageMain>
      </DashboardPage>
  )
}