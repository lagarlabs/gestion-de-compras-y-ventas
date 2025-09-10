import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  TrendingUp, 
  Package, 
  BarChart3,
  ChevronLeft,
  Settings,
  Moon,
  Sun,
  Building2
} from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

type ActiveModule = 'dashboard' | 'purchases' | 'sales' | 'inventory' | 'reports';

interface SidebarProps {
  activeModule: ActiveModule;
  setActiveModule: (module: ActiveModule) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ activeModule, setActiveModule, collapsed, setCollapsed }: SidebarProps) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const menuItems = [
    {
      id: 'dashboard' as ActiveModule,
      label: 'Dashboard',
      icon: LayoutDashboard,
      notifications: 0
    },
    {
      id: 'purchases' as ActiveModule,
      label: 'Compras',
      icon: ShoppingCart,
      notifications: 3
    },
    {
      id: 'sales' as ActiveModule,
      label: 'Ventas',
      icon: TrendingUp,
      notifications: 7
    },
    {
      id: 'inventory' as ActiveModule,
      label: 'Inventario',
      icon: Package,
      notifications: 2
    },
    {
      id: 'reports' as ActiveModule,
      label: 'Reportes',
      icon: BarChart3,
      notifications: 0
    }
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 z-10 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <Building2 className="h-8 w-8 text-sidebar-primary" />
              <div>
                <h1 className="text-lg font-semibold text-sidebar-foreground">IndustrialERP</h1>
                <p className="text-xs text-sidebar-foreground/60">Sistema de Gestión</p>
              </div>
            </motion.div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        {menuItems.map((item) => {
          const isActive = activeModule === item.id;
          return (
            <motion.div key={item.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 h-11 ${
                  collapsed ? 'px-2' : 'px-3'
                } ${
                  isActive 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
                onClick={() => setActiveModule(item.id)}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.notifications > 0 && (
                      <Badge variant="destructive" className="h-5 min-w-[20px] text-xs">
                        {item.notifications}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            </motion.div>
          );
        })}
      </nav>

      <Separator className="mx-2 my-4" />

      {/* Bottom Actions */}
      <div className="absolute bottom-4 left-0 right-0 p-2 space-y-2">
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          onClick={toggleDarkMode}
          className={`w-full ${collapsed ? 'justify-center' : 'justify-start gap-3'} text-sidebar-foreground hover:bg-sidebar-accent`}
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          {!collapsed && <span>{darkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>}
        </Button>
        
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          className={`w-full ${collapsed ? 'justify-center' : 'justify-start gap-3'} text-sidebar-foreground hover:bg-sidebar-accent`}
        >
          <Settings className="h-5 w-5" />
          {!collapsed && <span>Configuración</span>}
        </Button>
      </div>
    </motion.div>
  );
}