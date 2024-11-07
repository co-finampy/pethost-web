import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Reserva {
  uid: string;
  uidClient: string
  uidAnfitriao: string;
  uidPet: string;
  dataEntrada: string;
  dataSaida: string;
  tipoReserva: string;
  valor: string;
  status: string;
  createdAt: string;
  observacoes?: string;
}

interface ReservaCardProps {
  reservation: Reserva;
  onCancel: () => void;
  onSelect: () => void;
}

export function ReservaCard({ reservation, onCancel, onSelect }: ReservaCardProps) {
  const formatDate = (dateString: string) => format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: ptBR });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmada': return 'bg-green-500';
      case 'pendente': return 'bg-yellow-500';
      case 'cancelada': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mb-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Reserva: {reservation.uid}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {/* Detalhes da reserva */}
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">ID:</span>
            <span className="col-span-3">{reservation.uid}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Cliente:</span>
            <span className="col-span-3">{String(reservation.uidClient)}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Anfitrião:</span>
            <span className="col-span-3">{String(reservation.uidAnfitriao)}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Pet:</span>
            <span className="col-span-3">{reservation.uidPet}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Entrada:</span>
            <span className="col-span-3">{formatDate(reservation.dataEntrada)}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Saída:</span>
            <span className="col-span-3">{formatDate(reservation.dataSaida)}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Tipo:</span>
            <span className="col-span-3">{reservation.tipoReserva}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Valor:</span>
            <span className="col-span-3">R$ {reservation.valor}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Status:</span>
            <span className="col-span-3">
              <Badge className={`${getStatusColor(reservation.status)} text-white`}>
                {reservation.status}
              </Badge>
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Criado em:</span>
            <span className="col-span-3">{formatDate(reservation.createdAt)}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Observações:</span>
            <span className="col-span-3">{reservation.observacoes || 'Nenhuma observação'}</span>
          </div>

          {/* Ações */}
          {reservation.status !== 'Cancelada' && (
            <div className="grid gap-2">
              <button className="btn btn-danger" onClick={onCancel}>
                Cancelar Reserva
              </button>
            </div>
          )}

          <button className="btn btn-outline" onClick={onSelect}>
            Ver Detalhes
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
