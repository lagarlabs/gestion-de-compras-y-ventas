import { useState } from 'react';
import { motion } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { PurchasesModule } from './components/PurchasesModule';
import { SalesModule } from './components/SalesModule';
import { InventoryModule } from './components/InventoryModule';
import { ReportsModule } from './components/ReportsModule';
import { Toaster } from './components/ui/sonner';

type ActiveModule = 'dashboard' | 'purchases' | 'sales' | 'inventory' | 'reports';

export default function App() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard key={activeModule} />;
      case 'purchases':
        return <PurchasesModule key={activeModule} />;
      case 'sales':
        return <SalesModule key={activeModule} />;
      case 'inventory':
        return <InventoryModule key={activeModule} />;
      case 'reports':
        return <ReportsModule key={activeModule} />;
      default:
        return <Dashboard key={activeModule} />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <main 
        className={`flex-1 overflow-hidden transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full overflow-auto p-6"
        >
          {renderActiveModule()}
        </motion.div>
      </main>
      
      <Toaster />
    </div>
  );
}