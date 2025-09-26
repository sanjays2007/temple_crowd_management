
'use client';

import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { Toaster } from "@/components/ui/toaster";
import { RoleSwitcher } from "@/components/role-switcher";
import { useAuth } from "@/hooks/use-auth";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { trueRole } = useAuth(); // Use trueRole to ensure only real admins see it

  return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {trueRole === 'admin' && (
            <div className="container py-4">
               <RoleSwitcher />
            </div>
          )}
          {children}
        </main>
        <Footer />
        <Toaster />
      </div>
  );
}
