import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from "@/components/dashboard/page";
import { CadastroReserva } from "./_components/reserva-form";

export default function Page() {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Cadastrar Reserva</DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        <CadastroReserva />
      </DashboardPageMain>
    </DashboardPage>
  );
}
