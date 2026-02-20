import { ADMIN_ROUTES, NOT_ADMIN_ROUTES, NOT_LOGGED_ROUTES } from "@/constants/adminRoutes";
import { API_MAIN_ROUTE } from "@/constants/apiRoute";

export async function isAdminRoutesActions() {
  const response = await fetch(API_MAIN_ROUTE + "/me", {
    credentials: "include",
  });

  const data = await response.json()

  if (!response.ok){
    return NOT_LOGGED_ROUTES
  }

  if (data.user.role === "ADMIN"){
    return ADMIN_ROUTES
  }

  return NOT_ADMIN_ROUTES
}

export async function isAdminActions() {
  const response = await fetch(API_MAIN_ROUTE + "/me", {
    credentials: "include",
  });

  const data = await response.json()

  if (!response.ok){
    return null
  }

  if (data.user.role !== "ADMIN"){
    return null
  }

  return true
}