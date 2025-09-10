import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  Users, 
  AlertTriangle,
  Activity,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const salesData = [
  { month: 'Ene', ventas: 45000, compras: 32000 },
  { month: 'Feb', ventas: 52000, compras: 28000 },
  { month: 'Mar', ventas: 48000, compras: 35000 },
  { month: 'Abr', ventas: 61000, compras: 40000 },
  { month: 'May', ventas: 55000, compras: 38000 },
  { month: 'Jun', ventas: 67000, compras: 42000 },
];

const inventoryData = [
  { name: 'Materia Prima', value: 35, color: '#8884d8' },
  { name: 'Productos Terminados', value: 28, color: '#82ca9d' },
  { name: 'En Proceso', value: 22, color: '#ffc658' },
  { name: 'Repuestos', value: 15, color: '#ff7300' },
];

const topProducts = [
  { name: 'Acero Inoxidable 304', stock: 150, minStock: 100, status: 'good' },
  { name: 'Válvulas Industriales', stock: 45, minStock: 50, status: 'low' },
  { name: 'Motores Eléctricos', stock: 22, minStock: 30, status: 'critical' },
  { name: 'Sensores de Presión', stock: 89, minStock: 75, status: 'good' },
];

export function Dashboard() {
  const stats = [
    {
      title: 'Ventas del Mes',
      value: '$67,000',
      change: '+12.3%',
      trend: 'up',
      icon: DollarSign,
      description: 'vs mes anterior'
    },
    {
      title: 'Órdenes Activas',
      value: '156',
      change: '+8.1%',
      trend: 'up',
      icon: Activity,
      description: 'en proceso'
    },
    {
      title: 'Productos en Stock',
      value: '2,847',
      change: '-3.2%',
      trend: 'down',
      icon: Package,
      description: 'items disponibles'
    },
    {
      title: 'Clientes Activos',
      value: '89',
      change: '+5.4%',
      trend: 'up',
      icon: Users,
      description: 'este mes'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1>Dashboard Ejecutivo</h1>
            <p className="text-muted-foreground">
              Resumen de operaciones del {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Calendar className="h-3 w-3" />
              Último actualizado: hace 5 min
            </Badge>
          </div>
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
            className="cursor-pointer"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className={`flex items-center gap-1 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? 
                      <TrendingUp className="h-3 w-3" /> : 
                      <TrendingDown className="h-3 w-3" />
                    }
                    {stat.change}
                  </span>
                  <span className="ml-1">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Sales & Purchases Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Ventas vs Compras</CardTitle>
              <CardDescription>
                Comparación mensual de ingresos y gastos
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                    labelFormatter={(label) => `Mes: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ventas" 
                    stroke="#8884d8" 
                    strokeWidth={3}
                    name="Ventas"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="compras" 
                    stroke="#82ca9d" 
                    strokeWidth={3}
                    name="Compras"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Inventory Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="col-span-3"
        >
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Inventario</CardTitle>
              <CardDescription>
                Porcentaje por categoría
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={inventoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {inventoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Stock Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Alertas de Stock
              </CardTitle>
              <CardDescription>
                Productos que requieren atención
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Stock: {product.stock} / Mínimo: {product.minStock}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge 
                      variant={
                        product.status === 'critical' ? 'destructive' :
                        product.status === 'low' ? 'secondary' : 'default'
                      }
                    >
                      {product.status === 'critical' ? 'Crítico' :
                       product.status === 'low' ? 'Bajo' : 'Normal'}
                    </Badge>
                    <Progress 
                      value={(product.stock / product.minStock) * 100} 
                      className="w-20"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>
                Últimas transacciones y eventos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { 
                  action: 'Nueva orden de compra creada', 
                  time: 'hace 15 min',
                  type: 'purchase',
                  amount: '$12,500'
                },
                { 
                  action: 'Venta completada - Cliente ABC Corp', 
                  time: 'hace 32 min',
                  type: 'sale',
                  amount: '$8,750'
                },
                { 
                  action: 'Stock actualizado - Acero Inoxidable', 
                  time: 'hace 1 hora',
                  type: 'inventory',
                  amount: '+50 unidades'
                },
                { 
                  action: 'Factura generada #INV-2024-001', 
                  time: 'hace 2 horas',
                  type: 'invoice',
                  amount: '$15,200'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{activity.amount}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}