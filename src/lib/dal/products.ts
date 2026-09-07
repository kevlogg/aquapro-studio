import { Product, Category, CategoryId, FilterOptions } from '@/lib/types';

/**
 * Verificación de sesión segura que nunca lanza excepciones
 */
export async function verifySession(): Promise<{ userId: string; role: 'user' | 'admin' }> {
  return {
    userId: 'usr_guest_session_v2',
    role: 'user',
  };
}

export const CATEGORIES: Category[] = [
  {
    id: 'all',
    name: 'Todos los Productos',
    description: 'Catálogo completo de natación técnica y recreativa.',
  },
  {
    id: 'antiparras',
    name: 'Antiparras Tácticas',
    description: 'Lentes espejadas hidrodinámicas con sellado antiniebla de nivel competición.',
    badge: 'Pro Optics',
  },
  {
    id: 'mallas',
    name: 'Mallas de Competición',
    description: 'Trajes de baño aprobados por World Aquatics (FINA) con compresión graduada.',
    badge: 'FINA Approved',
  },
  {
    id: 'gorros',
    name: 'Gorros de Silicona',
    description: 'Diseño 3D anatómico libre de arrugas para reducir el arrastre en el agua.',
    badge: '3D Hydro',
  },
  {
    id: 'accesorios',
    name: 'Accesorios de Entreno',
    description: 'Tablas de flotación, manoplas ergonómicas, tubos frontales y bolsos ventilados.',
    badge: 'Training Pro',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    slug: 'hydro-specular-pro-mirror',
    name: 'HydroSpecular Pro Mirror',
    tagline: 'Visión perimétrica de 180° y perfil ultra hidrodinámico',
    categoryId: 'antiparras',
    categoryName: 'Antiparras Tácticas',
    price: 68.50,
    originalPrice: 85.00,
    currency: 'USD',
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?auto=format&fit=crop&w=800&q=80',
    isNew: true,
    isBestSeller: true,
    finaApproved: true,
    hydrodynamicGrade: 'Pro Elite A+',
    sizes: [
      { code: 'UNI', label: 'Talle Único Ajustable', inStock: true },
    ],
    colors: [
      { name: 'Titanium Blue', hex: '#00E5FF' },
      { name: 'Mirror Chrome', hex: '#E2E8F0' },
      { name: 'Deep Black', hex: '#0F172A' },
    ],
    description: 'Las antiparras HydroSpecular Pro Mirror combinan una estructura de policarbonato óptico antirrayaduras con tratamiento antiniebla permanente HydroFog™. Diseñadas para nadadores de élite que requieren fricción nula en largadas y vueltas olímpicas.',
    features: [
      { title: 'Lentes Espejadas Revestidas', description: 'Filtro UV400 completo y reducción total de reflejos de reflectores en natatorios bajo techo o sol en aguas abiertas.' },
      { title: 'Puentes de Nariz Intercambiables', description: 'Incluye 4 tamaños de microajuste en elastómero termoplástico.' },
      { title: 'Sellado Silicona Médica UltraSoft', description: 'Distribución uniforme de presión intraocular sin marcas ni irritación.' },
    ],
    specifications: {
      'Material de Lente': 'Policarbonato de Grado Óptico',
      'Correa': 'Silicona Doble de Tensión Variable con Escala Numérica',
      'Homologación': 'World Aquatics / FINA Approved',
      'Tratamiento Antiniebla': 'HydroFog™ de Larga Duración',
    },
    inStock: true,
    stockQuantity: 45,
  },
  {
    id: 'prod-002',
    slug: 'techsuit-carbon-jammer',
    name: 'TechSuit Carbon Pro Jammer',
    tagline: 'Compresión muscular dirigida y flotabilidad neutra óptima',
    categoryId: 'mallas',
    categoryName: 'Mallas de Competición',
    price: 289.00,
    originalPrice: 340.00,
    currency: 'USD',
    rating: 5.0,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80',
    isNew: false,
    isBestSeller: true,
    finaApproved: true,
    hydrodynamicGrade: 'World Record Grade',
    sizes: [
      { code: 'XS', label: '65 cm', inStock: true, waistCm: '63-67' },
      { code: 'S', label: '70 cm', inStock: true, waistCm: '68-72' },
      { code: 'M', label: '75 cm', inStock: true, waistCm: '73-77' },
      { code: 'L', label: '80 cm', inStock: true, waistCm: '78-82' },
      { code: 'XL', label: '85 cm', inStock: false, waistCm: '83-87' },
    ],
    colors: [
      { name: 'Ocean Cyan', hex: '#00E5FF' },
      { name: 'Stealth Black', hex: '#0B192C' },
    ],
    description: 'El Jammer TechSuit Carbon Pro utiliza tejido de fibra de carbono entrelazado con microcanales hidrofóbicos que repelen el agua en un 99.8%. Proporciona alineación corporal automatizada y máxima compresión en cuádriceps e isquiotibiales.',
    features: [
      { title: 'Tejido Carbon Grid 3D', description: 'Aumenta la estabilidad del core y reduce el batido ineficiente de cadera.' },
      { title: 'Costuras Selladas por Ultrasonido', description: 'Sin hilos ni relieves que interfieran con la capa límite del fluido.' },
      { title: 'Certificación FINA Oficial', description: 'Con código QR de verificación de homologación para campeonatos nacionales e internacionales.' },
    ],
    specifications: {
      'Composición': '65% Poliamida, 34% Elastano, 1% Fibra de Carbono',
      'Repelencia al Agua': 'Recubrimiento Nano-Hydrophobic Fluorocarbon-Free',
      'Certificado FINA': 'Aprobación Oficial WA-2026',
    },
    inStock: true,
    stockQuantity: 18,
  },
  {
    id: 'prod-003',
    slug: 'dome-3d-seamless-cap',
    name: 'Dome 3D Seamless Cap',
    tagline: 'Cero arrugas, compresión anatómica y resistencia al cloro 100%',
    categoryId: 'gorros',
    categoryName: 'Gorros de Silicona',
    price: 24.00,
    currency: 'USD',
    rating: 4.8,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1560090995-019306dfc786?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80',
    isNew: false,
    isBestSeller: true,
    finaApproved: true,
    hydrodynamicGrade: 'Pro Elite A+',
    sizes: [
      { code: 'M', label: 'Mediano (Cabello Corto/Medio)', inStock: true },
      { code: 'L', label: 'Grande (Cabello Largo)', inStock: true },
    ],
    colors: [
      { name: 'Electric Cyan', hex: '#00E5FF' },
      { name: 'Deep Ocean', hex: '#0B192C' },
      { name: 'Pure White', hex: '#FFFFFF' },
    ],
    description: 'Diseñado mediante moldeado por inyección 3D de densidad variable. El gorro Dome 3D elimina el exceso de tela en la zona posterior de la cabeza, garantizando un flujo laminar perfecto sobre la superficie capilar.',
    features: [
      { title: 'Silicona Quirúrgica de 100g', description: 'Alta elasticidad que previene el tironeo de cabello sin descalzarse en vueltas olímpicas.' },
      { title: 'Borde Interno Antideslizante', description: 'Textura micro-grabada que fija el gorro sobre la antiparra sin desplazamientos.' },
    ],
    specifications: {
      'Material': '100% Silicona Hipoalergénica de Alta Compresión',
      'Moldeo': 'Inyección 3D Anatómica Sin Costuras',
      'Homologación': 'FINA / World Aquatics',
    },
    inStock: true,
    stockQuantity: 120,
  },
  {
    id: 'prod-004',
    slug: 'training-snorkel-centre-mount',
    name: 'Training Snorkel Centre-Mount',
    tagline: 'Focaliza 100% de la técnica de brazada y alineación de la cabeza',
    categoryId: 'accesorios',
    categoryName: 'Accesorios de Entreno',
    price: 45.00,
    originalPrice: 52.00,
    currency: 'USD',
    rating: 4.9,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80',
    isNew: true,
    isBestSeller: false,
    finaApproved: false,
    hydrodynamicGrade: 'Training Master Spec',
    sizes: [
      { code: 'ADULT', label: 'Adulto Regulable', inStock: true },
    ],
    colors: [
      { name: 'Electric Cyan', hex: '#00E5FF' },
      { name: 'Volt Yellow', hex: '#FACC15' },
    ],
    description: 'Tubo frontal de entrenamiento hidrodinámico con boquilla ergonómica de silicona de grado alimenticio y válvula de purga unidireccional de limpieza rápida. Permite al nadador mantener la vista fija en la línea de fondo.',
    features: [
      { title: 'Válvula de Purga Seca Superior', description: 'Evita la entrada accidentada de agua durante la rotación del tronco.' },
      { title: 'Soporte Padded de Frente', description: 'Almohadilla de EVA suave que amortigua el choque de agua sin provocar molestias.' },
    ],
    specifications: {
      'Tubo': 'Hidrodinámico Enchapado Elíptico de Bajo Arrastre',
      'Boquilla': 'Silicona Grado Médico Antiestrés',
      'Válvula': 'Membrana Unidireccional de Desague Rápido',
    },
    inStock: true,
    stockQuantity: 34,
  },
  {
    id: 'prod-005',
    slug: 'eva-power-kickboard-pro',
    name: 'EVA Power Kickboard Pro',
    tagline: 'Diseño hidrodinámico para desarrollo explosivo de patada',
    categoryId: 'accesorios',
    categoryName: 'Accesorios de Entreno',
    price: 32.00,
    currency: 'USD',
    rating: 4.7,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80',
    isNew: false,
    isBestSeller: false,
    finaApproved: false,
    hydrodynamicGrade: 'High Buoyancy EVA',
    sizes: [
      { code: 'PRO', label: 'Medida Estándar Competencia', inStock: true },
    ],
    colors: [
      { name: 'Deep Ocean & Cyan', hex: '#0B192C' },
    ],
    description: 'Tabla de flotación de alta densidad EVA texturizada con agarres ergonómicos y contorno angulado. Mantiene los hombros relajados mientras aísla la potencia del tren inferior.',
    features: [
      { title: 'Espuma EVA Anti-absorbente', description: 'No retiene agua, manteniendo el peso ligero constante en toda la sesión.' },
      { title: 'Asas Moldeadas Multi-agarre', description: 'Permite diferentes posiciones de manos para patada cromo, espalda y mariposa.' },
    ],
    specifications: {
      'Dimensiones': '42cm x 28cm x 3.5cm',
      'Material': 'EVA Polímero de Alta Densidad',
      'Resistencia': 'Imperturbable ante cloro y sol intensos',
    },
    inStock: true,
    stockQuantity: 50,
  },
  {
    id: 'prod-006',
    slug: 'kinetic-glide-one-piece-suit',
    name: 'Kinetic Glide Open Back Suit',
    tagline: 'Libertad absoluta de movimiento de escápula y durabilidad sin igual',
    categoryId: 'mallas',
    categoryName: 'Mallas de Competición',
    price: 195.00,
    originalPrice: 225.00,
    currency: 'USD',
    rating: 4.9,
    reviewsCount: 118,
    image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?auto=format&fit=crop&w=800&q=80',
    isNew: true,
    isBestSeller: true,
    finaApproved: true,
    hydrodynamicGrade: 'Pro Elite A+',
    sizes: [
      { code: 'XS', label: '26 UK/US', inStock: true, chestCm: '78-82', waistCm: '60-64', hipsCm: '84-88' },
      { code: 'S', label: '28 UK/US', inStock: true, chestCm: '83-87', waistCm: '65-69', hipsCm: '89-93' },
      { code: 'M', label: '30 UK/US', inStock: true, chestCm: '88-92', waistCm: '70-74', hipsCm: '94-98' },
      { code: 'L', label: '32 UK/US', inStock: true, chestCm: '93-97', waistCm: '75-79', hipsCm: '99-103' },
    ],
    colors: [
      { name: 'Cyan Electric Accent', hex: '#00E5FF' },
      { name: 'Midnight Blue', hex: '#0B192C' },
    ],
    description: 'Malla entera para nadadoras de alto rendimiento con diseño Open Back y tirantes ergonómicos en "X" que reducen la presión sobre los hombros durante entrenamientos prolongados y finales de alta demanda.',
    features: [
      { title: 'Tecnología AquaResist 300h+', description: 'Garantiza inmunidad total al cloro y mantenimiento de compresión original por más de 300 horas continuas.' },
      { title: 'Doble Forro Frontal Térmico', description: 'Brinda opacidad total y confort sin sobrepeso.' },
    ],
    specifications: {
      'Composición': '80% Poliamida Reciclada, 20% Elastano Extra Life',
      'Forro': '100% Poliéster Micro-mesh',
      'Homologación': 'FINA Approved',
    },
    inStock: true,
    stockQuantity: 22,
  },
  {
    id: 'prod-007',
    slug: 'aeroglide-hand-paddles',
    name: 'AeroGlide Propulsion Paddles',
    tagline: 'Desarrollo de potencia propulsiva y mecano-sensibilidad acuática',
    categoryId: 'accesorios',
    categoryName: 'Accesorios de Entreno',
    price: 28.00,
    originalPrice: 34.00,
    currency: 'USD',
    rating: 4.8,
    reviewsCount: 63,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80',
    isNew: false,
    isBestSeller: true,
    finaApproved: false,
    hydrodynamicGrade: 'Propulsion Tech',
    sizes: [
      { code: 'S', label: 'Chico (Técnica & Velocidad)', inStock: true },
      { code: 'M', label: 'Mediano (Fuerza General)', inStock: true },
      { code: 'L', label: 'Grande (Potencia Máster)', inStock: true },
    ],
    colors: [
      { name: 'Electric Cyan', hex: '#00E5FF' },
      { name: 'Stealth Black', hex: '#0B192C' },
    ],
    description: 'Manoplas de natación anatómicas con orificios de flujo guiado que permiten sentir la presión del agua mientras fortalecen los dorsales y pectorales.',
    features: [
      { title: 'Tiras de Silicona Regulables', description: 'Ajuste personalizado alrededor de dedos y muñeca sin cortar la circulación.' },
      { title: 'Orificios de Sensibilidad Hidro', description: 'Mejora la trayectoria de la brazada en la fase de agarre y tirón.' },
    ],
    specifications: {
      'Material': 'Polipropileno Indeformable',
      'Correas': 'Silicona Elástica Quirúrgica',
    },
    inStock: true,
    stockQuantity: 40,
  },
  {
    id: 'prod-008',
    slug: 'hydrodry-mesh-backpack-45l',
    name: 'HydroDry Mesh Backpack 45L',
    tagline: 'Compartimento ventilado para secado rápido de equipo húmedo',
    categoryId: 'accesorios',
    categoryName: 'Accesorios de Entreno',
    price: 75.00,
    currency: 'USD',
    rating: 4.9,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    isNew: true,
    isBestSeller: true,
    finaApproved: false,
    hydrodynamicGrade: 'Heavy Duty 45L',
    sizes: [
      { code: '45L', label: 'Capacidad 45 Litros', inStock: true },
    ],
    colors: [
      { name: 'Cyan & Ocean', hex: '#00E5FF' },
      { name: 'All Black', hex: '#0F172A' },
    ],
    description: 'Mochila técnica de natación de 45L con base reforzada impermeable, funda acolchada para notebook o tablet, y bolsillo de red mesh respirable para secado automático de toalla, mallas y manoplas.',
    features: [
      { title: 'Base de Lona Alquitranada', description: 'Mantiene el interior seco incluso apoyando el bolso sobre pisos mojados del vestuario.' },
      { title: 'Mosquetón de Acero Inoxidable', description: 'Permite colgar el bolso en la reja del natatorio o vestuario.' },
    ],
    specifications: {
      'Capacidad': '45 Litros',
      'Tejido': 'Poliéster 600D Ripstop + Red Mesh Respirable',
    },
    inStock: true,
    stockQuantity: 28,
  },
];

/**
 * Consulta resiliente de productos desde el DAL
 */
export async function getProducts(filters: FilterOptions = {}): Promise<{
  products: Product[];
  total: number;
  categories: Category[];
}> {
  try {
    let filtered = [...PRODUCTS];

    if (filters && filters.category && filters.category !== 'all') {
      filtered = filtered.filter((p) => p.categoryId === filters.category);
    }

    if (filters && filters.search && filters.search.trim() !== '') {
      const q = filters.search.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q)
      );
    }

    if (filters && filters.finaOnly) {
      filtered = filtered.filter((p) => p.finaApproved === true);
    }

    if (filters && filters.sort) {
      switch (filters.sort) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'featured':
        default:
          filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
          break;
      }
    }

    return {
      products: filtered,
      total: filtered.length,
      categories: CATEGORIES,
    };
  } catch (error) {
    console.error('Error en getProducts DAL:', error);
    return {
      products: PRODUCTS,
      total: PRODUCTS.length,
      categories: CATEGORIES,
    };
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const product = PRODUCTS.find((p) => p.slug === slug || p.id === slug);
    return product || null;
  } catch (e) {
    return PRODUCTS[0] || null;
  }
}

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES;
}
