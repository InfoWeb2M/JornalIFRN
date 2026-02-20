import { HeroComponent } from "@/components/heroComponent/page";
import LoadingGrid from "@/components/loadingGrid/page";
import Footer from "@/components/ui/footer/page";
import Header from "@/components/ui/header/page";
import { lazy, Suspense } from "react";

const TestePage = lazy(() => import("@/components/catalogContent/page"));

export default function CatalogPage() {
  return (
    <div>
      <Header />
      <div className="mt-8">
        <HeroComponent />
      </div>
      <Suspense fallback={<LoadingGrid quantity={6} />}>
        <TestePage />
      </Suspense>
      <Suspense>
        <Footer />
      </Suspense>
    </div>
  );
}
