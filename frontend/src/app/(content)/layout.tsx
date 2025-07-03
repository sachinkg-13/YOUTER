'use client';

import { useState } from 'react';
import { AppSidebar } from '../../components/layout/sidebar';
import { PageLoader } from '../../components/ui/page-loader';
import { cn } from '../../lib/utils';
import { useIsMobile } from '../../components/ui/use-mobile';
import Navbar from '../../components/layout/Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="bg-background w-full text-foreground min-h-screen">
      <PageLoader />
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="mt-16 flex flex-row min-h-[calc(100vh-4rem)]">
        <AppSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        <main
          className={cn(
            'flex-1 w-full min-h max-w-full bg-transparent overflow-auto transition-all duration-300',
            // Desktop margin adjustments
            !isMobile && (collapsed ? 'ml-16' : 'ml-64'),
            // Mobile - no left margin as sidebar is overlay, but add bottom padding for bottom nav
            isMobile && 'ml-0 pb-16',
          )}
        >
          {children}
        </main>
      </div>
      {/* Mobile Bottom Navigation */}
      {/* {isMobile && <MobileBottomNav />} */}
    </div>
  );
};

export default Layout;
