import { searchNewsActions } from "@/actions/SearchNews/searchNewsActions";
import NewsDetail from "@/components/newsPage/page";
import Footer from "@/components/ui/footer/page";
import { Suspense } from "react";

async function NewsContent({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const noticia = await searchNewsActions(resolvedParams.id);

    return <NewsDetail news={noticia} />;
}

export default function News({ params }: { params: Promise<{ id: string }> }) {

    return (
        <>
        <Suspense fallback={<span className="text-center text-(--text)">carregando noticia...</span>}>
                <NewsContent params={params} />
            </Suspense>
            <Suspense>
                <Footer />
        </Suspense>
        </>
    );
}
