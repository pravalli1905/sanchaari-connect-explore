import { useState } from 'react';
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminLanguages = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col lg:ml-0">
        <AdminNavbar onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Language Management</h1>
              <p className="text-muted-foreground mt-2">Manage platform languages and translations</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Languages & Translations</CardTitle>
                <CardDescription>
                  Configure supported languages and manage translation content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Language management functionality coming soon...</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLanguages;