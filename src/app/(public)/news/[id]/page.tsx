import { searchNewsActions } from "@/actions/SearchNews/searchNewsActions";
import NewsDetail from "@/components/newsPage/page";
import Footer from "@/components/ui/footer/page";
import Header from "@/components/ui/header/page";

export const dynamic = "force-dynamic";

export default async function News({
  params,
}: {
  params: { id: string };
}) {
  const noticia = await searchNewsActions(params.id);

  return (
    <div>
      <Header />
      <NewsDetail news={noticia} />
      <Footer />
    </div>
  );
}