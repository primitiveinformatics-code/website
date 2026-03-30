import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsHero from "./ProductsHero";
import ProductCards from "./ProductCards";
import UploadSection from "./UploadSection";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore our AI mock interview platform, YouTube channel, and exclusive content library.",
};

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <Suspense fallback={<div className="h-96" />}>
        <ProductCards />
      </Suspense>
      <UploadSection />
    </>
  );
}
