
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AdminDashboard } from "@/components/dashboards/admin-dashboard";
import { WorkerDashboard } from "@/components/dashboards/worker-dashboard";
import { UserDashboard } from "@/components/dashboards/user-dashboard";

export default function DashboardPage() {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    // This should ideally not be reached if routing is protected
    // but as a fallback, redirect to signin
    router.push('/signin');
    return null;
  }
  
  const renderDashboard = () => {
    switch (role) {
      case 'admin':
        return <AdminDashboard user={user} />;
      case 'worker':
        return <WorkerDashboard user={user} />;
      case 'user':
      default:
        return <UserDashboard user={user} />;
    }
  }

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          Dashboard
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Welcome back, {user.displayName || user.email}!
        </p>
      </div>
      {renderDashboard()}
    </div>
  );
