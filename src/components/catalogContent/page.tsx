// components/content/page.tsx
import { catalogActions } from "@/actions/CatalogActions/catalogActions";
import NewsClient from "./NewsClient";

export default async function TestePage() {
  const news = await catalogActions(); // erro → error.tsx
  return <NewsClient initialNews={news} />;
}
