import { useState } from 'react';
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col lg:ml-0">
        <AdminNavbar onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Content Management</h1>
              <p className="text-muted-foreground mt-2">Manage website content, destinations, and travel information</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Content & Destinations</CardTitle>
                <CardDescription>
                  Manage travel destinations, content, and platform information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Content management functionality coming soon...</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminContent;