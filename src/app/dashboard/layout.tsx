"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  WalletCardsIcon as Cards,
  Home,
  LogOut,
  PlusCircle,
  Settings,
  Store,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { logout } from "@/lib/auth";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center px-2 py-3">
              <div className="flex items-center gap-2 text-xl font-bold text-blue-700">
                <Image
                  src="/pokeball.png?height=32&width=32"
                  alt="Pokemon Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <span>Pokéadmin</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <a href="/dashboard">
                    <Home className="h-5 w-5" />
                    <span>Painel Admin</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/collection">
                    <Cards className="h-5 w-5" />
                    <span>Coleção</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/add">
                    <PlusCircle className="h-5 w-5" />
                    <span>Adicionar Pokémon</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/stats">
                    <BarChart3 className="h-5 w-5" />
                    <span>Estatísticas</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/marketplace">
                    <Store className="h-5 w-5" />
                    <span>Mercado de trocas</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/trainers">
                    <Users className="h-5 w-5" />
                    <span>Treinadores</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/settings">
                    <Settings className="h-5 w-5" />
                    <span>Configurações</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                  <span>Sair</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-blue-800">Painel Admin</h1>
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Button
                variant="outline"
                size="icon"
                onClick={handleLogout}
                className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
              >
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Sair</span>
              </Button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
