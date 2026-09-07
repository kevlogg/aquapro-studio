import { Suspense } from 'react';
import Metadata from 'next';
import { getProducts, getCategories } from '@/lib/dal/products';
import { CategoryId } from '@/lib/types';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProductFilters } from '@/components/product/ProductFilters';
import { ProductGrid } from '@/components/product/ProductGrid';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { ProductGridSkeleton } from '@/components/common/Skeletons';
import { getWebSiteJsonLd, getProductsJsonLd, getFaqJsonLd } from '@/lib/seo/schemas';
import { ShieldCheck, Sparkles, Filter } from 'lucide-react';

interface PageProps {
  searchParams: Promise<{
    category?: CategoryId;
    search?: string;
    sort?: 'featured' | 'price-asc' | 'price-desc' | 'rating';
    fina?: string;
  }>;
}

export async function generateMetadata({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const category = resolvedParams.category;

  if (category && category !== 'all') {
    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
    return {
      title: `${categoryTitle} de Natación Técnica`,
      description: `Explora nuestra selección de ${category} de competición y entrenamiento homologados por World Aquatics.`,
    };
  }

  return {
    title: 'AQUAPRO Studio | Catálogo Oficial de Natación Técnica',
    description: 'Catálogo completo de mallas de competición, antiparras espejadas y equipamiento para nadadores de élite.',
  };
}

export default async function HomePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;

  const currentCategory: CategoryId = resolvedParams.category || 'all';
  const currentSearch = resolvedParams.search || '';
  const currentSort = resolvedParams.sort || 'featured';
  const finaOnly = resolvedParams.fina === 'true';

  // Fetch data directly from Data Access Layer (DAL)
  const { products, categories, total } = await getProducts({
    category: currentCategory,
    search: currentSearch,
    sort: currentSort,
    finaOnly,
  });

  // Prepare JSON-LD Structured Data
  const websiteSchema = getWebSiteJsonLd();
  const productsSchema = getProductsJsonLd(products);
  const faqSchema = getFaqJsonLd();

  return (
    <>
      {/* Schema.org Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Catalog Section */}
      <section id="catalogo" className="py-16 md:py-24 bg-ocean-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-slate-800 pb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Catálogo Técnico 2026</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Equipamiento de Natación
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                Diseñado para reducir el coeficiente de fricción y potenciar la eficiencia hidrodinámica en cada brazada.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-ocean-900 border border-slate-800 px-4 py-2 rounded-xl shrink-0">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{total} Productos Disponibles</span>
            </div>
          </div>

          {/* Dynamic Filters Bar */}
          <ProductFilters
            categories={categories}
            currentCategory={currentCategory}
            currentSort={currentSort}
            finaOnly={finaOnly}
          />

          {/* Products Grid with Suspense */}
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid products={products} />
          </Suspense>
        </div>
      </section>

      {/* FINA Technology Feature Banner */}
      <section id="tecnologia" className="py-16 bg-gradient-to-r from-ocean-950 via-ocean-900 to-ocean-950 border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 md:p-12 rounded-3xl glass-panel border border-cyan-500/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-cyan-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider">
                Certificación Internacional
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Homologación World Aquatics (FINA Approved)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Cada uno de nuestros trajes TechSuit y gorros de silicona 3D pasa por pruebas de laboratorio en túneles de agua hidrodinámicos para certificar cero resistencia indeseada y 100% de cumplimiento reglamentario.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="p-6 rounded-2xl bg-ocean-950 border border-cyan-400/40 text-center space-y-2 w-full max-w-xs shadow-xl">
                <div className="text-3xl font-extrabold text-cyan-400">100%</div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">Garantía de Aprobación</div>
                <p className="text-[11px] text-slate-400">Válido para campeonatos sudamericanos, panamericanos e internacionales.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & Social Proof */}
      <TestimonialsSection />

      {/* FAQ Accordion Section */}
      <FAQSection />
    </>
  );
}
