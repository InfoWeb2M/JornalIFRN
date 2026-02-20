"use client";

import { LoadingGridProps } from "@/types/LoadingGridProps";
import { LoadingCard } from "../ui/loaders/loadingCard/page";
import { LoadingFeaturedCard } from "../ui/loaders/loadingFeaturedCard/page";
import './loadingGrid.css'

export default function LoadingGrid({ quantity = 4 }: LoadingGridProps) {
  return (
    <div className="skeleton-grid transition-all">
      <LoadingFeaturedCard />
      
        {Array.from({ length: quantity }).map((_, index) => (
          <LoadingCard key={index} />
        ))}
      
    </div>
  );
}
