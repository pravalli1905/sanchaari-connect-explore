import { useState } from 'react';
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminNotifications = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col lg:ml-0">
        <AdminNavbar onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Notification Management</h1>
              <p className="text-muted-foreground mt-2">Manage system notifications and user communications</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Platform Notifications</CardTitle>
                <CardDescription>
                  Configure and send notifications to users and partners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Notification management functionality coming soon...</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminNotifications;