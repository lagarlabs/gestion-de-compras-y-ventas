import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Download,
  Calendar,
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  BarChart3,
  PieChart,
  FileBarChart,
  Printer,
  Mail
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';

const monthlyData = [
  { month: 'Jul', ventas: 42000, compras: 28000, ganancia: 14000, inventario: 180000 },
  { month: 'Ago', ventas: 45000, compras: 32000, ganancia: 13000, inventario: 185000 },
  { month: 'Sep', ventas: 48000, compras: 35000, ganancia: 13000, inventario: 175000 },
  { month: 'Oct', ventas: 52000, compras: 28000, ganancia: 24000, inventario: 195000 },
  { month: 'Nov', ventas: 55000, compras: 38000, ganancia: 17000, inventario: 190000 },
  { month: 'Dic', ventas: 61000, compras: 40000, ganancia: 21000, inventario: 200000 },
  { month: 'Ene', ventas: 67000, compras: 42000, ganancia: 25000, inventario: 210000 }
];

const categoryData = [
  { name: 'Materia Prima', value: 35, amount: 73500, color: '#8884d8' },
  { name: 'Componentes', value: 28, amount: 58800, color: '#82ca9d' },
  { name: 'Equipos', value: 22, amount: 46200, color: '#ffc658' },
  { name: 'Instrumentos', value: 15, amount: 31500, color: '#ff7300' }
];

const topCustomers = [
  { name: 'Industrias del Valle S.A.', sales: 156000, growth: 12.5 },
  { name: 'Manufacturas del Norte Ltda.', sales: 142000, growth: 8.3 },
  { name: 'Constructora Central S.A.', sales: 128000, growth: -2.1 },
  { name: 'Proyectos Industriales Ltda.', sales: 98000, growth: 15.7 },
  { name: 'Metalúrgica del Sur', sales: 87000, growth: 6.2 }
];

const topProducts = [
  { name: 'Acero Inoxidable 304', sold: 450, revenue: 38250 },
  { name: 'Válvulas Industriales 2"', sold: 125, revenue: 15625 },
  { name: 'Motores Eléctricos 5HP', sold: 45, revenue: 20250 },
  { name: 'Sensores de Presión', sold: 89, revenue: 6675 },
  { name: 'Tornillería Especializada', sold: 2340, revenue: 11700 }
];

export function ReportsModule() {
  const [dateRange, setDateRange] = useState('last6months');
  const [reportType, setReportType] = useState('financial');

  const kpis = [
    {
      title: 'Ingresos Totales',
      value: '$328,000',
      change: '+12.3%',
      trend: 'up',
      icon: DollarSign,
      description: 'últimos 6 meses'
    },
    {
      title: 'Margen de Ganancia',
      value: '24.8%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      description: 'promedio del período'
    },
    {
      title: 'Rotación Inventario',
      value: '4.2x',
      change: '-0.3x',
      trend: 'down',
      icon: Package,
      description: 'veces por año'
    },
    {
      title: 'Clientes Activos',
      value: '156',
      change: '+18.9%',
      trend: 'up',
      icon: Users,
      description: 'crecimiento anual'
    }
  ];

  const reports = [
    {
      title: 'Reporte Financiero',
      description: 'Análisis completo de ingresos, gastos y rentabilidad',
      icon: FileBarChart,
      lastGenerated: '2024-01-15',
      status: 'ready'
    },
    {
      title: 'Análisis de Inventario',
      description: 'Estadísticas de stock, rotación y valorización',
      icon: Package,
      lastGenerated: '2024-01-14',
      status: 'ready'
    },
    {
      title: 'Reporte de Ventas',
      description: 'Tendencias de ventas por cliente, producto y período',
      icon: TrendingUp,
      lastGenerated: '2024-01-13',
      status: 'processing'
    },
    {
      title: 'Análisis de Compras',
      description: 'Evaluación de proveedores y eficiencia de compras',
      icon: BarChart3,
      lastGenerated: '2024-01-12',
      status: 'ready'
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
          <h1>Reportes y Análisis</h1>
          <p className="text-muted-foreground">
            Análisis avanzado y reportes ejecutivos para toma de decisiones
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Últimos 7 días</SelectItem>
              <SelectItem value="last30days">Últimos 30 días</SelectItem>
              <SelectItem value="last3months">Últimos 3 meses</SelectItem>
              <SelectItem value="last6months">Últimos 6 meses</SelectItem>
              <SelectItem value="lastyear">Último año</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Todo
          </Button>
        </div>
      </motion.div>

      {/* KPIs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <kpi.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className={`flex items-center gap-1 ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.trend === 'up' ? 
                      <TrendingUp className="h-3 w-3" /> : 
                      <TrendingDown className="h-3 w-3" />
                    }
                    {kpi.change}
                  </span>
                  <span className="ml-1">{kpi.description}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Financial Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Tendencias Financieras</CardTitle>
              <CardDescription>
                Evolución de ventas, compras y ganancias por mes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="ventas" 
                    stackId="1"
                    stroke="#8884d8" 
                    fill="#8884d8"
                    fillOpacity={0.6}
                    name="Ventas"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="compras" 
                    stackId="2"
                    stroke="#82ca9d" 
                    fill="#82ca9d"
                    fillOpacity={0.6}
                    name="Compras"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="ganancia" 
                    stackId="3"
                    stroke="#ffc658" 
                    fill="#ffc658"
                    fillOpacity={0.8}
                    name="Ganancia"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Sales by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Ventas por Categoría</CardTitle>
              <CardDescription>
                Distribución de ingresos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, 'Porcentaje']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Customers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Principales Clientes</CardTitle>
              <CardDescription>
                Por volumen de ventas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={customer.name} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {index + 1}. {customer.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ${customer.sales.toLocaleString()}
                    </p>
                  </div>
                  <Badge 
                    variant={customer.growth > 0 ? "default" : "destructive"}
                    className="gap-1"
                  >
                    {customer.growth > 0 ? 
                      <TrendingUp className="h-3 w-3" /> : 
                      <TrendingDown className="h-3 w-3" />
                    }
                    {Math.abs(customer.growth)}%
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Productos Más Vendidos</CardTitle>
              <CardDescription>
                Por cantidad y ingresos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {index + 1}. {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.sold} unidades
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      ${product.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Available Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Reportes Disponibles</CardTitle>
            <CardDescription>
              Generar y descargar reportes detallados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {reports.map((report, index) => (
                <motion.div
                  key={report.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <report.icon className="h-5 w-5 text-primary mt-1" />
                      <div className="space-y-1">
                        <h4 className="font-medium">{report.title}</h4>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Último: {new Date(report.lastGenerated).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant={report.status === 'ready' ? 'default' : 'secondary'}>
                        {report.status === 'ready' ? 'Listo' : 'Procesando'}
                      </Badge>
                      {report.status === 'ready' && (
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                            <Printer className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                            <Mail className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}