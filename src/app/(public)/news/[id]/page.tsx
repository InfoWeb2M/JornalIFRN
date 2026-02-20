import { searchNewsActions } from "@/actions/SearchNews/searchNewsActions";
import NewsDetail from "@/components/newsPage/page";
import Footer from "@/components/ui/footer/page";
import Header from "@/components/ui/header/page";
import { Suspense } from "react";

export default async function News({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;

    const noticia = searchNewsActions(resolvedParams.id);

    return (
        <div>
            <Suspense fallback={<span className="text-center text-(--text)">carregando noticia...</span>}>
                <NewsDetail news={await noticia} />
            </Suspense>
            <Suspense>
                <Footer />
            </Suspense>
        </div>
    );
}
