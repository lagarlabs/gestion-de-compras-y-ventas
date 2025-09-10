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
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  RefreshCw,
  MapPin,
  Boxes
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
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

const mockInventory = [
  {
    id: 'SKU-001',
    name: 'Acero Inoxidable 304',
    category: 'Materia Prima',
    currentStock: 150,
    minStock: 100,
    maxStock: 300,
    location: 'Almacén A-1',
    unitPrice: 85.50,
    totalValue: 12825,
    lastMovement: '2024-01-15',
    supplier: 'Aceros del Norte S.A.'
  },
  {
    id: 'SKU-002',
    name: 'Válvulas Industriales 2"',
    category: 'Componentes',
    currentStock: 45,
    minStock: 50,
    maxStock: 150,
    location: 'Almacén B-2',
    unitPrice: 125.00,
    totalValue: 5625,
    lastMovement: '2024-01-14',
    supplier: 'Válvulas Industriales Ltda.'
  },
  {
    id: 'SKU-003',
    name: 'Motores Eléctricos 5HP',
    category: 'Equipos',
    currentStock: 22,
    minStock: 30,
    maxStock: 80,
    location: 'Almacén C-3',
    unitPrice: 450.00,
    totalValue: 9900,
    lastMovement: '2024-01-12',
    supplier: 'Motores y Equipos S.A.'
  },
  {
    id: 'SKU-004',
    name: 'Sensores de Presión',
    category: 'Instrumentos',
    currentStock: 89,
    minStock: 75,
    maxStock: 200,
    location: 'Almacén D-1',
    unitPrice: 75.00,
    totalValue: 6675,
    lastMovement: '2024-01-10',
    supplier: 'Sensores Técnicos Ltda.'
  }
];

const categories = ['Materia Prima', 'Componentes', 'Equipos', 'Instrumentos', 'Herramientas', 'Repuestos'];
const locations = ['Almacén A-1', 'Almacén A-2', 'Almacén B-1', 'Almacén B-2', 'Almacén C-1', 'Almacén C-2', 'Almacén C-3', 'Almacén D-1'];

export function InventoryModule() {
  const [inventory] = useState(mockInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getStockStatus = (current: number, min: number) => {
    const percentage = (current / min) * 100;
    if (percentage <= 50) return { status: 'critical', color: 'text-red-600', bgColor: 'bg-red-100' };
    if (percentage <= 100) return { status: 'low', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { status: 'good', color: 'text-green-600', bgColor: 'bg-green-100' };
  };

  const getStockBadge = (current: number, min: number) => {
    const stockStatus = getStockStatus(current, min);
    const percentage = (current / min) * 100;
    
    if (percentage <= 50) {
      return <Badge variant="destructive" className="gap-1">
        <AlertTriangle className="h-3 w-3" />
        Crítico
      </Badge>;
    }
    if (percentage <= 100) {
      return <Badge variant="secondary" className="gap-1">
        <TrendingDown className="h-3 w-3" />
        Bajo
      </Badge>;
    }
    return <Badge variant="default" className="gap-1">
      <TrendingUp className="h-3 w-3" />
      Normal
    </Badge>;
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCreateItem = () => {
    toast.success('Producto agregado al inventario exitosamente');
    setIsCreateDialogOpen(false);
  };

  const totalValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockItems = inventory.filter(item => item.currentStock <= item.minStock).length;
  const criticalItems = inventory.filter(item => (item.currentStock / item.minStock) * 100 <= 50).length;

  const stats = [
    {
      title: 'Total Productos',
      value: inventory.length.toString(),
      description: 'en inventario',
      icon: Package
    },
    {
      title: 'Valor Total',
      value: `$${totalValue.toLocaleString()}`,
      description: 'inventario',
      icon: BarChart3
    },
    {
      title: 'Stock Bajo',
      value: lowStockItems.toString(),
      description: 'requieren atención',
      icon: AlertTriangle
    },
    {
      title: 'Ubicaciones',
      value: new Set(inventory.map(item => item.location)).size.toString(),
      description: 'almacenes activos',
      icon: MapPin
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
          <h1>Gestión de Inventario</h1>
          <p className="text-muted-foreground">
            Control de stock, ubicaciones y movimientos de inventario
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Sincronizar
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nuevo Producto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                <DialogDescription>
                  Completa los detalles para agregar un nuevo producto al inventario
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Nombre del Producto</Label>
                    <Input id="productName" placeholder="Ej: Acero Inoxidable 316" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input id="sku" placeholder="SKU-XXX" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Ubicación</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar ubicación" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map(location => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Descripción detallada del producto"
                    className="min-h-[80px]"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentStock">Stock Actual</Label>
                    <Input type="number" id="currentStock" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minStock">Stock Mínimo</Label>
                    <Input type="number" id="minStock" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxStock">Stock Máximo</Label>
                    <Input type="number" id="maxStock" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unitPrice">Precio Unitario</Label>
                    <Input type="number" id="unitPrice" placeholder="0.00" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateItem}>
                  Agregar Producto
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
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

      {/* Critical Alerts */}
      {criticalItems > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Alerta de Stock Crítico
              </CardTitle>
              <CardDescription>
                {criticalItems} producto(s) con stock crítico requieren atención inmediata
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {inventory
                  .filter(item => (item.currentStock / item.minStock) * 100 <= 50)
                  .map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Boxes className="h-4 w-4 text-destructive" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Stock: {item.currentStock} / Mínimo: {item.minStock}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="destructive">
                        Reordenar Ahora
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Inventory Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Inventario de Productos</CardTitle>
            <CardDescription>
              Lista completa de todos los productos en inventario
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre o SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-[300px]"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
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
                    <TableHead>SKU</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Stock Actual</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Valor Total</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.currentStock}</span>
                            <span className="text-sm text-muted-foreground">/ {item.minStock}</span>
                          </div>
                          <Progress 
                            value={(item.currentStock / item.maxStock) * 100} 
                            className="w-20 h-2"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{getStockBadge(item.currentStock, item.minStock)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{item.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>${item.totalValue.toLocaleString()}</TableCell>
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
                              <RefreshCw className="h-4 w-4" />
                              Actualizar stock
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Download className="h-4 w-4" />
                              Exportar datos
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