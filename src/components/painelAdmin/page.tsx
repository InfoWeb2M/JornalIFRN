"use client";

import {
  List,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@radix-ui/react-tabs";
import { IconClipboardList } from "@tabler/icons-react";
import CreateNews from "./CreateNews";
import NewsList from "./NewsList";
import { motion } from "framer-motion";
import { LogOut, Newspaper, PlusCircle } from "lucide-react";
import { Button } from "../ui/uiPainel/button";
import { useState } from "react";
import Link from "next/link";

export function PainelAdmin() {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-background">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-card border-b border-border shadow-md"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Painel de Notícias
                </h1>
                <p className="text-sm text-muted-foreground">
                  Sistema de gerenciamento
                </p>
              </div>
            </div>
            <Button
              //   onClick={handleLogout}
              disabled={loading}
              variant="destructive"
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              <Link href={"/"}>Retornar ao catálogo</Link>
            </Button>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-card border border-border h-auto p-1">
              <TabsTrigger
                value="create"
                className="flex justify-center items-center cursor-pointer gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground py-2.5 *:leading-none hover:bg-accent/10"
              >
                <PlusCircle className="w-4 h-4 flex" />
                <span className="h-lh">Criar</span>
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="flex justify-center items-center cursor-pointer gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground py-2.5 hover:bg-accent/10"
              >
                <IconClipboardList className="w-5" />
                <span>Listar</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="mt-0">
              <CreateNews />
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              <NewsList />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
