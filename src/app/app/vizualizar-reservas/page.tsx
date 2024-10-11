"use client";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Reservation {
  uid: string
  uidClient: number
  uidAnfitriao: number
  uidPet: string
  dataEntrada: string
  dataSaida: string
  tipoReserva: string
  valor: string
  status: string
  createdAt: string
  observacoes?: string
}

const mockReservations: Reservation[] = [
  {
    uid: '1',
    uidClient: 101,
    uidAnfitriao: 201,
    uidPet: 'pet1',
    dataEntrada: '2023-06-01T10:00:00',
    dataSaida: '2023-06-05T14:00:00',
    tipoReserva: 'Hospedagem',
    valor: '250.00',
    status: 'Confirmada',
    createdAt: '2023-05-25T09:30:00'
  },
  {
    uid: '2',
    uidClient: 102,
    uidAnfitriao: 202,
    uidPet: 'pet2',
    dataEntrada: '2023-06-10T09:00:00',
    dataSaida: '2023-06-10T17:00:00',
    tipoReserva: 'Day Care',
    valor: '50.00',
    status: 'Pendente',
    createdAt: '2023-06-01T14:45:00'
  },
]

export default function Component() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [observacoes, setObservacoes] = useState<string>('')

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: ptBR })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmada':
        return 'bg-green-500'
      case 'pendente':
        return 'bg-yellow-500'
      case 'cancelada':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const handleCancelReservation = (uid: string) => {
    setReservations(prevReservations =>
      prevReservations.map(reservation =>
        reservation.uid === uid
          ? { ...reservation, status: 'Cancelada' }
          : reservation
      )
    )
    setSelectedReservation(prevReservation =>
      prevReservation && prevReservation.uid === uid
        ? { ...prevReservation, status: 'Cancelada' }
        : prevReservation
    )
  }

  const handleAddObservation = () => {
    if (selectedReservation) {
      setReservations(prevReservations =>
        prevReservations.map(reservation =>
          reservation.uid === selectedReservation.uid
            ? { ...reservation, observacoes: observacoes }
            : reservation
        )
      )
      setSelectedReservation({ ...selectedReservation, observacoes: observacoes })
      setObservacoes('')
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Minhas Reservas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Data de Entrada</TableHead>
              <TableHead>Data de Saída</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.uid}>
                <TableCell className="font-medium">{reservation.uid}</TableCell>
                <TableCell>{reservation.tipoReserva}</TableCell>
                <TableCell>{formatDate(reservation.dataEntrada)}</TableCell>
                <TableCell>{formatDate(reservation.dataSaida)}</TableCell>
                <TableCell>R$ {reservation.valor}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={`${getStatusColor(reservation.status)} text-white hover:bg-gray-700`}>
                    {reservation.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedReservation(reservation)}>
                        Detalhes
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Detalhes da Reserva</DialogTitle>
                      </DialogHeader>
                      {selectedReservation && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">ID:</span>
                            <span className="col-span-3">{selectedReservation.uid}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">Cliente:</span>
                            <span className="col-span-3">{selectedReservation.uidClient}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">Anfitrião:</span>
                            <span className="col-span-3">{selectedReservation.uidAnfitriao}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">Pet:</span>
                            <span className="col-span-3">{selectedReservation.uidPet}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">Entrada:</span>
                            <span className="col-span-3">{formatDate(selectedReservation.dataEntrada)}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">Saída:</span>
                            <span className="col-span-3">{formatDate(selectedReservation.dataSaida)}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">Tipo:</span>
                            <span className="col-span-3">{selectedReservation.tipoReserva}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">Valor:</span>
                            <span className="col-span-3">R$ {selectedReservation.valor}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">Status:</span>
                            <span className="col-span-3">
                              <Badge variant="secondary"  className={`${getStatusColor(selectedReservation.status)} text-white hover:bg-gray-500`}>
                                {selectedReservation.status}
                              </Badge>
                            </span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">Criado em:</span>
                            <span className="col-span-3">{formatDate(selectedReservation.createdAt)}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">Observações:</span>
                            <span className="col-span-3 ml-6">{selectedReservation.observacoes || 'Nenhuma observação'}</span>
                          </div>
                          <div className="grid gap-2">
                            <Textarea
                              placeholder="Adicione uma observação"
                              value={observacoes}
                              onChange={(e) => setObservacoes(e.target.value)}
                            />
                            <Button onClick={handleAddObservation}>Adicionar Observação</Button>
                          </div>
                          {selectedReservation.status !== 'Cancelada' && (
                            <Button
                              variant="destructive"
                              onClick={() => handleCancelReservation(selectedReservation.uid)}
                            >
                              Cancelar Reserva
                            </Button>
                          )}
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}