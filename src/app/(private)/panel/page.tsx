"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { PainelAdmin } from "@/components/painelAdmin/page";
import { isAdminActions } from "@/actions/isAdminActions/isAdminActions";
import Loading from "./loading";

export default function Painel() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const isAdminResponse = await isAdminActions();
      setIsLoading(false);
      if (!isAdminResponse) redirect('/');
      setIsAdmin(true);
    })();
  }, []);
  

  if (!isLoading && isAdmin) return <PainelAdmin />

  return <Loading />
}
