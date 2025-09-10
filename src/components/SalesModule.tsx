import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  Download,
  FileText,
  DollarSign,
  Users,
  TrendingUp,
  Send,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';

const mockSales = [
  {
    id: 'VT-001',
    customer: 'Industrias del Valle S.A.',
    date: '2024-01-15',
    amount: 45000,
    status: 'completed',
    items: 5,
    paymentStatus: 'paid',
    dueDate: '2024-02-15'
  },
  {
    id: 'VT-002',
    customer: 'Manufacturas del Norte Ltda.',
    date: '2024-01-14',
    amount: 28750,
    status: 'pending',
    items: 3,
    paymentStatus: 'pending',
    dueDate: '2024-02-14'
  },
  {
    id: 'VT-003',
    customer: 'Constructora Central S.A.',
    date: '2024-01-12',
    amount: 67300,
    status: 'shipped',
    items: 8,
    paymentStatus: 'partial',
    dueDate: '2024-02-12'
  },
  {
    id: 'VT-004',
    customer: 'Proyectos Industriales Ltda.',
    date: '2024-01-10',
    amount: 15900,
    status: 'cancelled',
    items: 2,
    paymentStatus: 'refunded',
    dueDate: '2024-02-10'
  }
];

const customers = [
  'Industrias del Valle S.A.',
  'Manufacturas del Norte Ltda.',
  'Constructora Central S.A.',
  'Proyectos Industriales Ltda.',
  'Metalúrgica del Sur',
  'Fábrica de Autopartes S.A.'
];

export function SalesModule() {
  const [sales] = useState(mockSales);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pendiente', variant: 'secondary' as const, icon: Clock },
      completed: { label: 'Completada', variant: 'default' as const, icon: CheckCircle },
      shipped: { label: 'Enviada', variant: 'default' as const, icon: Send },
      cancelled: { label: 'Cancelada', variant: 'destructive' as const, icon: XCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getPaymentBadge = (paymentStatus: string) => {
    const statusConfig = {
      paid: { label: 'Pagado', variant: 'default' as const },
      pending: { label: 'Pendiente', variant: 'secondary' as const },
      partial: { label: 'Parcial', variant: 'secondary' as const },
      overdue: { label: 'Vencido', variant: 'destructive' as const },
      refunded: { label: 'Reembolsado', variant: 'outline' as const }
    };
    
    const config = statusConfig[paymentStatus as keyof typeof statusConfig];
    
    return (
      <Badge variant={config.variant}>
        {config.label}
      </Badge>
    );
  };

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sale.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateSale = () => {
    toast.success('Orden de venta creada exitosamente');
    setIsCreateDialogOpen(false);
  };

  const stats = [
    {
      title: 'Total Ventas',
      value: `$${sales.reduce((sum, s) => sum + s.amount, 0).toLocaleString()}`,
      description: 'este mes',
      icon: DollarSign
    },
    {
      title: 'Órdenes Activas',
      value: sales.filter(s => s.status !== 'cancelled' && s.status !== 'completed').length.toString(),
      description: 'en proceso',
      icon: Clock
    },
    {
      title: 'Clientes',
      value: new Set(sales.map(s => s.customer)).size.toString(),
      description: 'únicos',
      icon: Users
    },
    {
      title: 'Crecimiento',
      value: '+12.3%',
      description: 'vs mes anterior',
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1>Gestión de Ventas</h1>
          <p className="text-muted-foreground">
            Administra órdenes de venta, clientes y facturación
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nueva Venta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nueva Orden de Venta</DialogTitle>
              <DialogDescription>
                Completa los detalles para crear una nueva orden de venta
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Cliente</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map(customer => (
                        <SelectItem key={customer} value={customer}>
                          {customer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">Fecha de Entrega</Label>
                  <Input type="date" id="deliveryDate" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción de Productos</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe los productos o servicios a vender"
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Cantidad</Label>
                  <Input type="number" id="quantity" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unitPrice">Precio Unitario</Label>
                  <Input type="number" id="unitPrice" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Descuento (%)</Label>
                  <Input type="number" id="discount" placeholder="0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Términos de Pago</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar términos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Inmediato</SelectItem>
                      <SelectItem value="net15">Neto 15 días</SelectItem>
                      <SelectItem value="net30">Neto 30 días</SelectItem>
                      <SelectItem value="net60">Neto 60 días</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salesRep">Representante</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Asignar vendedor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="juan">Juan Pérez</SelectItem>
                      <SelectItem value="maria">María González</SelectItem>
                      <SelectItem value="carlos">Carlos López</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateSale}>
                Crear Orden
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Sales Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Órdenes de Venta</CardTitle>
            <CardDescription>
              Lista completa de todas las órdenes de venta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por cliente o ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-[300px]"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="completed">Completada</SelectItem>
                    <SelectItem value="shipped">Enviada</SelectItem>
                    <SelectItem value="cancelled">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Orden</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Pago</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSales.map((sale, index) => (
                    <motion.tr
                      key={sale.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell className="font-medium">{sale.id}</TableCell>
                      <TableCell>{sale.customer}</TableCell>
                      <TableCell>{new Date(sale.date).toLocaleDateString('es-ES')}</TableCell>
                      <TableCell>${sale.amount.toLocaleString()}</TableCell>
                      <TableCell>{sale.items} items</TableCell>
                      <TableCell>{getStatusBadge(sale.status)}</TableCell>
                      <TableCell>{getPaymentBadge(sale.paymentStatus)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem className="gap-2">
                              <Eye className="h-4 w-4" />
                              Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Edit className="h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <FileText className="h-4 w-4" />
                              Generar factura
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Download className="h-4 w-4" />
                              Descargar PDF
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <Trash2 className="h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}