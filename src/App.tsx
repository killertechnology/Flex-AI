import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ChevronDown, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { analytics } from './core/analytics';
import { assetUrl } from './core/assets';
import { formatMoney, titleFromHandle } from './core/format';
import { clearFavoriteTeam, createThemeCssVariables, getFavoriteTeam, setFavoriteTeam } from './core/themeEngine';
import { normalize, productRepository } from './commerce/ProductRepository';
import { useCart } from './commerce/CartContext';
import type { Product, Variant } from './commerce/types';
import { getTeamTheme, nhlTeams } from './data/nhlTeams';
import { getActiveTheme } from './themes/themes';

const theme = getActiveTheme();
const heroImage = assetUrl(theme.heroImage);
type NavEntry = { label: string; href: string; children?: { label: string; href: string; description?: string }[] };

const navItems: NavEntry[] = [
  { label: 'HOCKEY', href: '/collections/hockey', children: [
    { label: 'Hockey Skates', href: '/collections/hockey-skates' },
    { label: 'Composite Sticks', href: '/collections/composite-sticks' },
    { label: 'Hockey Gloves', href: '/collections/hockey-gloves' },
    { label: 'Helmets', href: '/collections/helmets' },
    { label: 'Protective Gear', href: '/collections/protective' }
  ] },
  { label: 'FIGURE SKATING', href: '/collections/figure-skating', children: [
    { label: 'Figure Skates', href: '/collections/figure-skates' },
    { label: 'Figure Boots', href: '/collections/figure-boots' },
    { label: 'Figure Blades', href: '/collections/figure-blades' },
    { label: 'Skate Guards', href: '/collections/skate-guards' }
  ] },
  { label: 'GOALIE', href: '/collections/goalie', children: [
    { label: 'Goalie Pads', href: '/collections/goalie-pads' },
    { label: 'Goalie Gloves', href: '/collections/goalie-gloves' },
    { label: 'Goalie Masks', href: '/collections/goalie-masks' },
    { label: 'Chest Protectors', href: '/collections/goalie-chest-protectors' }
  ] },
  { label: 'ACCESSORIES', href: '/collections/accessories', children: [
    { label: 'Bags', href: '/collections/bags' },
    { label: 'Laces', href: '/collections/laces' },
    { label: 'Skate Guards', href: '/collections/skate-guards' },
    { label: 'Stick Bags', href: '/collections/stick-bags' }
  ] },
  { label: 'APPAREL', href: '/collections/apparel', children: [
    { label: 'Hoodies', href: '/collections/hoodies' },
    { label: 'Jackets', href: '/collections/jackets' },
    { label: 'Shirts', href: '/collections/shirts' },
    { label: 'Shorts', href: '/collections/shorts' },
    { label: 'Hats', href: '/collections/hats' }
  ] },
  { label: 'SERVICES', href: '/services', children: [
    { label: 'Sharpening', href: '/products/performance-skate-sharpening-service' },
    { label: 'Profiling', href: '/products/precision-skate-profiling-service' },
    { label: 'Blade Mounting', href: '/products/blade-mounting-holder-alignment-service' },
    { label: 'Heat Molding', href: '/products/skate-heat-molding-service' },
    { label: 'Repairs', href: '/products/general-skate-repair-inspection' }
  ] },
];
const classicNavItems: NavEntry[] = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT US', href: '/services' },
  { label: 'OUR STORE', href: '/brands', children: [
    { label: 'Shop by Brand', href: '/brands', description: 'Browse Bauer, CCM, Warrior, Jackson, Edea, and Penguin Services.' },
    { label: 'Hockey Department', href: '/collections/hockey', description: 'Skates, sticks, gloves, helmets, and protective gear.' },
    { label: 'Figure Skating Department', href: '/collections/figure-skating', description: 'Boots, blades, figure skates, guards, and accessories.' },
    { label: 'Goalie Department', href: '/collections/goalie', description: 'Pads, gloves, masks, and goalie protection.' },
    { label: 'Skate Services', href: '/services', description: 'Sharpening, profiling, fitting, mounting, and repair.' }
  ] },
  { label: 'SHOP', href: '/collections/hockey', children: [
    { label: 'Skates', href: '/collections/skates', description: 'Hockey skates, figure skates, boots, blades, and service pairings.' },
    { label: 'Sticks', href: '/collections/sticks', description: 'Composite sticks with hand, flex, and curve options.' },
    { label: 'Gloves', href: '/collections/hockey-gloves', description: 'Senior and performance gloves for protection and feel.' },
    { label: 'Helmets', href: '/collections/helmets', description: 'Helmet options to review for comfort and secure fit.' },
    { label: 'Protective Gear', href: '/collections/protective', description: 'Shoulder, elbow, shin, pants, and core protection.' },
    { label: 'Apparel', href: '/collections/apparel', description: 'Hoodies, jackets, shirts, shorts, and hats.' },
    { label: 'Accessories', href: '/collections/accessories', description: 'Bags, guards, laces, stick bags, and rink essentials.' }
  ] },
  { label: 'CONTACT US', href: '/contact', children: [
    { label: 'Store Location', href: '/contact#location', description: 'Address, phone, and store contact details.' },
    { label: 'Service Questions', href: '/contact#services', description: 'Ask about sharpening, profiling, mounting, and repairs.' },
    { label: 'Team Orders', href: '/contact#teams', description: 'Start a conversation about bulk gear and team needs.' },
    { label: 'Pickup Support', href: '/contact#pickup', description: 'Coordinate fit checks, pickup, and product availability.' }
  ] }
];
const allProducts = productRepository.getAllProducts();

function useScrollReveal() {
  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!revealNodes.length) return;

    if (!('IntersectionObserver' in window)) {
      revealNodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 12% 0px' });

    revealNodes.forEach((node) => observer.observe(node));
    window.setTimeout(() => revealNodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        node.classList.add('is-visible');
        observer.unobserve(node);
      }
    }), 250);
    return () => observer.disconnect();
  }, []);
}

export function App() {
  const location = useLocation();
  const [favoriteTeamId, setFavoriteTeamId] = useState(() => getFavoriteTeam());
  const selectedTeam = getTeamTheme(favoriteTeamId);
  useScrollReveal();

  useEffect(() => {
    analytics.track('page_view', { path: location.pathname, theme: theme.id });
    if (location.hash) {
      window.setTimeout(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ block: 'start' }), 0);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className={`app ${theme.className} ${selectedTeam ? 'team-theme-active' : ''}`} style={createThemeCssVariables(selectedTeam)} data-favorite-team={selectedTeam?.id ?? 'default'}>
      <Header favoriteTeamId={favoriteTeamId} onFavoriteTeamChange={setFavoriteTeamId} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections/:handle" element={<CollectionPage />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/brands/:brand" element={<BrandPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function Header({ favoriteTeamId, onFavoriteTeamChange }: { favoriteTeamId: string | null; onFavoriteTeamChange: (teamId: string | null) => void }) {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const suggestions = query.length > 1 ? productRepository.searchProducts(query).slice(0, 5) : [];

  function submit(event: FormEvent) {
    event.preventDefault();
    if (query.trim()) {
      analytics.track('search', { query });
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setOpen(false);
    }
  }

  return (
    <>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Penguin Skate & Sports Supply home">
          <img className="brand-logo" src={assetUrl('/images/brand/penguin-logo-header.png')} alt="Penguin Skate & Sports Supply" />
        </Link>
        <nav className="desktop-nav" aria-label="Primary">
          {(theme.id === 'penguin-classic' ? classicNavItems : navItems).map((item) => (
            <DesktopNavItem key={`${item.label}-${item.href}`} item={item} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          ))}
        </nav>
        <form className="search-box" onSubmit={submit}>
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search gear, brands, services" aria-label="Search products" />
          {suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.map((product) => <Link key={product.id} to={`/products/${product.slug}`}>{product.brand} {product.title}</Link>)}
            </div>
          )}
        </form>
        <FavoriteTeamSelector favoriteTeamId={favoriteTeamId} onFavoriteTeamChange={onFavoriteTeamChange} />
        <Link className="icon-link" to="/brands" aria-label="Account"><UserRound size={21} /></Link>
        <Link className="cart-link" to="/cart" aria-label={`Cart with ${count} items`}><ShoppingBag size={21} /><span>{count}</span></Link>
        <button className="mobile-menu-button" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu /></button>
      </header>
      {open && (
        <div className="drawer-layer">
          <button className="drawer-backdrop" type="button" onClick={() => setOpen(false)} aria-label="Close navigation" />
          <div className="drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation">
            <button className="drawer-close" onClick={() => setOpen(false)} aria-label="Close navigation"><X /></button>
            <form className="drawer-search" onSubmit={submit}>
              <Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" />
            </form>
            <FavoriteTeamSelector favoriteTeamId={favoriteTeamId} onFavoriteTeamChange={onFavoriteTeamChange} compact />
            {(theme.id === 'penguin-classic' ? classicNavItems : navItems).map((item) => (
              <div className="drawer-nav-group" key={`${item.label}-${item.href}`}>
                <NavLink to={item.href} onClick={() => setOpen(false)}>{item.label}</NavLink>
                {item.children && <div className="drawer-subnav">{item.children.map((child) => <Link key={child.href} to={child.href} onClick={() => setOpen(false)}>{child.label}</Link>)}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function FavoriteTeamSelector({ favoriteTeamId, onFavoriteTeamChange, compact = false }: { favoriteTeamId: string | null; onFavoriteTeamChange: (teamId: string | null) => void; compact?: boolean }) {
  const selectedTeam = getTeamTheme(favoriteTeamId);

  function updateFavoriteTeam(teamId: string) {
    if (!teamId) {
      clearFavoriteTeam();
      onFavoriteTeamChange(null);
      analytics.track('favorite_team_reset', { theme: theme.id });
      return;
    }

    const nextTeam = getTeamTheme(teamId);
    if (!nextTeam) return;
    setFavoriteTeam(nextTeam.id);
    onFavoriteTeamChange(nextTeam.id);
    analytics.track('favorite_team_select', { team: nextTeam.abbreviation, theme: theme.id });
  }

  return (
    <label className={`team-selector ${compact ? 'compact' : ''}`}>
      <span>Favorite NHL Team</span>
      <div className="team-select-control">
        <select value={selectedTeam?.id ?? ''} onChange={(event) => updateFavoriteTeam(event.target.value)} aria-label="Favorite NHL Team">
          <option value="">Penguinscape Default</option>
          {nhlTeams.map((team) => (
            <option value={team.id} key={team.id}>{team.name} ({team.abbreviation})</option>
          ))}
        </select>
        <div className="team-swatches" aria-hidden="true">
          {(selectedTeam ? [selectedTeam.primary, selectedTeam.secondary, selectedTeam.accent] : ['#111111', '#f2c500', '#ffffff']).map((color) => (
            <span style={{ background: color }} key={color} />
          ))}
        </div>
      </div>
    </label>
  );
}

function DesktopNavItem({ item, activeMenu, setActiveMenu }: { item: NavEntry; activeMenu: string; setActiveMenu: (label: string) => void }) {
  if (!item.children?.length) return <NavLink to={item.href}>{item.label}</NavLink>;
  const isOpen = activeMenu === item.label;
  return (
    <div
      className={`nav-item ${isOpen ? 'open' : ''}`}
      onMouseEnter={() => setActiveMenu(item.label)}
      onMouseLeave={() => setActiveMenu('')}
      onFocus={() => setActiveMenu(item.label)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setActiveMenu('');
      }}
    >
      <NavLink className="nav-trigger" to={item.href} aria-haspopup="true" aria-expanded={isOpen}>{item.label}<ChevronDown size={14} strokeWidth={3} /></NavLink>
      <div className="nav-dropdown" role="menu" aria-label={`${item.label} menu`}>
        {item.children.map((child) => (
          <Link key={child.href} to={child.href} role="menuitem" onClick={() => setActiveMenu('')}>
            <strong>{child.label}</strong>
            {child.description && <span>{child.description}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}

function HomePage() {
  const featured = allProducts.filter((product) => product.featured).slice(0, 4);
  const newArrivals = allProducts.filter((product) => product.newArrival).slice(0, 4);
  const under75 = [...allProducts].filter((product) => product.price < 75).sort((a, b) => a.price - b.price).slice(0, 8);
  const sale = allProducts.filter((product) => product.sale).slice(0, 4);
  return (
    <>
      <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, var(--hero-scrim), transparent), url(${heroImage})` }}>
        <div className="hero-copy">
          <p>{theme.heroKicker}</p>
          <h1>{theme.heroTitle}</h1>
          <span>{theme.tagline}</span>
          <p>{theme.heroBody}</p>
          <div className="hero-actions">
            <Link className="button primary" to="/collections/hockey">{theme.primaryCta}</Link>
            <Link className="button secondary" to="/collections/figure-skating">{theme.secondaryCta}</Link>
          </div>
        </div>
        {theme.id === 'penguin-classic' && (
          <img className="classic-hero-player" src={heroImage} alt="" aria-hidden="true" />
        )}
      </section>
      <ScrollStory />
      <CategoryNavigation />
      <ProductRail title="Featured Products" products={featured} />
      <ProductRail title="Under $75 Picks" products={under75} href="/collections/under-75?sort=price-asc" />
      <ProductRail title="New Arrivals" products={newArrivals} />
      <ShopSections />
      <ProductRail title="Sale Products" products={sale} />
      <ServicesBand />
      <StoreBand />
      <SignupBand />
    </>
  );
}

function ScrollStory() {
  const storyPanels = [
    {
      eyebrow: "Let's hit the ice!",
      title: 'Skate beyond your limits.',
      body: 'Penguin Skate is more than a gear wall. The concept carries the original store energy into a guided shopping experience for hockey, figure skating, goalie, and service needs.',
      href: '/collections/hockey',
      cta: 'Shop Hockey'
    },
    {
      eyebrow: 'Master your sport',
      title: 'Fit, steel, support, and service for every session.',
      body: 'From blade mounting to sharpening and repairs, each path keeps skaters moving toward the right product, the right service, and the right pickup conversation.',
      href: '/services',
      cta: 'Explore Services'
    },
    {
      eyebrow: 'First time shopping with us?',
      title: 'A clear offer path for new customers.',
      body: 'The homepage now supports introductory offers, featured products, sale gear, and store contact points so visitors can move from inspiration to action quickly.',
      href: '/collections/under-75?sort=price-asc',
      cta: 'View Starter Picks'
    }
  ];

  return (
    <section className="scroll-story" aria-label="Penguin Skate shopping story">
      <div className="scroll-story-track">
        {storyPanels.map((panel, index) => (
          <article className="story-panel" data-reveal style={{ transitionDelay: `${index * 120}ms` }} key={panel.title}>
            <p className="eyebrow">{panel.eyebrow}</p>
            <h2>{panel.title}</h2>
            <p>{panel.body}</p>
            <Link className={index === 1 ? 'button secondary' : 'button primary'} to={panel.href}>{panel.cta}</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function CategoryNavigation() {
  const categories = [
    ['Hockey', '/collections/hockey', theme.id === 'penguin-classic' ? assetUrl('/images/categories/hockey-action.webp') : assetUrl('/images/categories/hockey.webp')],
    ['Figure Skating', '/collections/figure-skating', assetUrl('/images/categories/figure-skating.webp')],
    ['Goalie', '/collections/goalie', assetUrl('/images/categories/goalie.webp')],
    ['Skates', '/collections/skates', assetUrl('/images/categories/skates.webp')],
    ['Accessories', '/collections/accessories', assetUrl('/images/categories/accessories.webp')],
    ['Apparel', '/collections/apparel', assetUrl('/images/categories/apparel.webp')],
    ['Skate Services', '/services', assetUrl('/images/categories/skate-services.webp')]
  ];
  return (
    <section className="category-strip" aria-label="Primary category navigation">
      {categories.map(([label, href, image]) => (
        <Link className="category-tile" to={href} key={href}>
          <img src={image} alt={`${label} category`} loading="lazy" width="360" height="240" />
          <strong>{label}</strong>
        </Link>
      ))}
    </section>
  );
}

function ProductRail({ title, products, href = '/collections/hockey' }: { title: string; products: Product[]; href?: string }) {
  return (
    <section className="section">
      <div className="section-heading"><h2>{title}</h2><Link to={href}>View all</Link></div>
      <div className="product-grid compact">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link to={`/products/${product.slug}`} onClick={() => analytics.track('select_item', { productId: product.id })}>
        <img src={product.featuredImage} alt={product.altText} loading="lazy" width="420" height="330" />
        <div className="badges">{product.sale && <span>Sale</span>}{product.newArrival && <span>New</span>}</div>
        <p>{product.brand}</p>
        <h3>{product.title}</h3>
        <Price product={product} />
      </Link>
    </article>
  );
}

function Price({ product, variant }: { product: Product; variant?: Variant }) {
  const price = variant?.price ?? product.price;
  return (
    <div className="price">
      <strong>{formatMoney(price, product.currency)}</strong>
      {product.compareAtPrice && <s>{formatMoney(product.compareAtPrice, product.currency)}</s>}
    </div>
  );
}

function CollectionPage() {
  const { handle = '' } = useParams();
  const baseProducts = productRepository.getProductsByCollection(handle);
  return <CollectionView title={handle === 'sale' ? 'Sale' : titleFromHandle(handle)} products={baseProducts} />;
}

function CollectionView({ title, products }: { title: string; products: Product[] }) {
  const [params, setParams] = useSearchParams();
  const [mobileFilters, setMobileFilters] = useState(false);
  const sort = params.get('sort') ?? 'price-asc';
  const filterKeys = ['brand', 'category', 'size', 'color', 'skillLevel', 'availability', 'ageClass', 'hand', 'flex', 'curve', 'fit', 'width', 'sale', 'new'];
  const filters = Object.fromEntries(filterKeys.map((key) => [key, params.get(key) ?? '']));
  const options = getFilterOptions(products);
  const filtered = sortProducts(products.filter((product) => matchesFilters(product, filters)), sort);

  function update(key: string, value: string) {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next);
  }

  return (
    <section className="collection-page">
      <div className="collection-head">
        <div><p>{filtered.length} of {products.length} products</p><h1>{title}</h1></div>
        <button className="filter-toggle" onClick={() => setMobileFilters(true)}>Filters</button>
        <label>Sort <select value={sort} onChange={(event) => update('sort', event.target.value)}><option value="featured">Featured</option><option value="price-asc">Price low to high</option><option value="price-desc">Price high to low</option><option value="new">Newest</option></select></label>
      </div>
      <div className="collection-layout">
        <FilterPanel options={options} filters={filters} update={update} />
        <div className="product-grid">{filtered.length ? filtered.map((product) => <ProductCard key={product.id} product={product} />) : <ZeroState />}</div>
      </div>
      {mobileFilters && <div className="drawer filters-drawer" role="dialog" aria-modal="true"><button className="drawer-close" onClick={() => setMobileFilters(false)}><X /></button><FilterPanel options={options} filters={filters} update={update} /></div>}
    </section>
  );
}

function getFilterOptions(products: Product[]) {
  const add = (set: Set<string>, values?: string[] | string) => {
    if (Array.isArray(values)) values.forEach((value) => set.add(value));
    else if (values) set.add(values);
  };
  const options: Record<string, Set<string>> = {
    brand: new Set(), category: new Set(), size: new Set(), color: new Set(), skillLevel: new Set(), availability: new Set(),
    ageClass: new Set(), hand: new Set(), flex: new Set(), curve: new Set(), fit: new Set(), width: new Set(), sale: new Set(['Sale']), new: new Set(['New Arrival'])
  };
  for (const product of products) {
    options.brand.add(product.brand); options.category.add(product.subcategory); options.availability.add(product.inventoryStatus);
    add(options.size, product.sizes); add(options.color, product.colors); add(options.skillLevel, product.skillLevel); add(options.ageClass, product.ageClass);
    add(options.hand, product.handedness); add(options.flex, product.flex); add(options.curve, product.curve); add(options.fit, product.fit); add(options.width, product.width);
  }
  return Object.fromEntries(Object.entries(options).map(([key, value]) => [key, Array.from(value).filter(Boolean).sort()]));
}

function FilterPanel({ options, filters, update }: { options: Record<string, string[]>; filters: Record<string, string>; update: (key: string, value: string) => void }) {
  const labels: Record<string, string> = { brand: 'Brand', category: 'Category', size: 'Size', color: 'Color', skillLevel: 'Skill level', availability: 'Availability', ageClass: 'Age class', hand: 'Hand', flex: 'Flex', curve: 'Curve', fit: 'Fit', width: 'Width', sale: 'Sale', new: 'New arrivals' };
  return (
    <aside className="filters" aria-label="Product filters">
      <h2>Filters</h2>
      {Object.entries(options).filter(([, values]) => values.length > 0).map(([key, values]) => (
        <label key={key}>{labels[key]}
          <select value={filters[key] ?? ''} onChange={(event) => update(key, event.target.value)}>
            <option value="">Any</option>
            {values.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
      ))}
    </aside>
  );
}

function matchesFilters(product: Product, filters: Record<string, string>) {
  const contains = (values: unknown, filter: string) => Array.isArray(values) ? values.includes(filter) : values === filter;
  return Object.entries(filters).every(([key, value]) => {
    if (!value) return true;
    if (key === 'brand') return product.brand === value;
    if (key === 'category') return product.subcategory === value;
    if (key === 'size') return contains(product.sizes, value);
    if (key === 'color') return contains(product.colors, value);
    if (key === 'skillLevel') return product.skillLevel === value;
    if (key === 'availability') return product.inventoryStatus === value;
    if (key === 'ageClass') return product.ageClass === value;
    if (key === 'hand') return contains(product.handedness, value);
    if (key === 'flex') return contains(product.flex, value);
    if (key === 'curve') return contains(product.curve, value);
    if (key === 'fit') return contains(product.fit, value);
    if (key === 'width') return contains(product.width, value);
    if (key === 'sale') return product.sale;
    if (key === 'new') return product.newArrival;
    return true;
  });
}

function sortProducts(products: Product[], sort: string) {
  return [...products].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'new') return Number(b.newArrival) - Number(a.newArrival);
    return Number(b.featured) - Number(a.featured);
  });
}

function ProductPage() {
  const { slug = '' } = useParams();
  const product = productRepository.getProductBySlug(slug);
  const { addItem } = useCart();
  const [image, setImage] = useState(product?.featuredImage ?? '');
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState<Record<string, string>>(() => product?.variants[0]?.options ?? {});
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      analytics.track('view_item', { productId: product.id });
      const viewed = JSON.parse(localStorage.getItem('penguin-recently-viewed') ?? '[]') as string[];
      localStorage.setItem('penguin-recently-viewed', JSON.stringify([product.id, ...viewed.filter((id) => id !== product.id)].slice(0, 4)));
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      setImage(product.featuredImage);
      setSelected(product.variants[0]?.options ?? {});
      setQuantity(1);
    }
  }, [product?.id]);

  if (!product) return <ZeroState title="Product not found" />;
  const currentProduct = product;
  const isService = currentProduct.department === 'Services';
  const isStick = currentProduct.category === 'Sticks' || currentProduct.subcategory === 'Composite Sticks';
  const optionNames = Array.from(new Set(currentProduct.variants.flatMap((variant) => Object.keys(variant.options))));
  const selectedVariant = currentProduct.variants.find((variant) => optionNames.every((name) => variant.options[name] === selected[name])) ?? currentProduct.variants[0];
  const related = currentProduct.relatedProductIds.map((id) => productRepository.getProductById(id)).filter(Boolean) as Product[];
  const nextStick = isStick ? related.find((candidate) => candidate.category === 'Sticks' || candidate.subcategory === 'Composite Sticks') : undefined;
  const recentIds = JSON.parse(localStorage.getItem('penguin-recently-viewed') ?? '[]') as string[];
  const recent = recentIds.map((id) => productRepository.getProductById(id)).filter((candidate): candidate is Product => Boolean(candidate && candidate.id !== currentProduct.id));

  function addToCart(buyNow = false) {
    addItem(currentProduct.id, selectedVariant.id, quantity);
    if (buyNow) navigate('/cart?checkout=demo');
  }

  return (
    <section className="pdp">
      <div className="gallery">
        <img className="main-image" src={image} alt={product.altText} width="720" height="560" />
        <div className="thumbs">{product.images.map((src) => <button key={src} onClick={() => setImage(src)}><img src={src} alt="" /></button>)}</div>
      </div>
      <div className="pdp-info">
        <p className="eyebrow">{product.brand} / {product.subcategory}</p>
        <h1>{product.title}</h1>
        <Price product={product} variant={selectedVariant} />
        <p>{product.shortDescription}</p>
        <p className="stock">{isService ? `${product.inventoryStatus} · timing confirmed at drop-off` : `${product.inventoryStatus} · availability shown for store planning`}</p>
        <div className="variant-stack">
          {optionNames.map((name) => (
            <fieldset key={name}><legend>{name}</legend>
              <div>{Array.from(new Set(product.variants.map((variant) => variant.options[name]).filter(Boolean))).map((value) => (
                <button className={selected[name] === value ? 'selected' : ''} key={value} onClick={() => setSelected({ ...selected, [name]: value })}>{value}</button>
              ))}</div>
            </fieldset>
          ))}
        </div>
        <label className="quantity">Quantity <input type="number" min="1" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} /></label>
        <div className="pdp-actions"><button className="button primary" onClick={() => addToCart(false)}>{isService ? 'Add Service' : 'Add to Cart'}</button><button className="button secondary" onClick={() => addToCart(true)}>{isService ? 'Plan Visit' : 'Review Checkout'}</button></div>
        {nextStick && (
          <Link className="next-product-card" to={`/products/${nextStick.slug}`}>
            <img src={nextStick.featuredImage} alt="" />
            <span>Next Stick</span>
            <strong>{nextStick.title}</strong>
          </Link>
        )}
        <div className="message-grid">{isService ? <><span>Bring both skates so the bench can check balance, steel, and hardware together.</span><span>Pickup timing is confirmed by Penguin staff when the service is accepted.</span></> : <><span>Ship-to-home and pickup messaging can be connected during Shopify setup.</span><span>Confirm fit and availability with the shop before final purchase.</span></>}</div>
        <details open><summary>Description</summary><p>{product.description}</p></details>
        <details open><summary>Specifications</summary><dl>{Object.entries(product.specifications).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl></details>
        <details><summary>Fit and size guidance</summary><p>Bring skates to the shop for fit confirmation, heat molding, sharpening, and service recommendations before final purchase.</p></details>
      </div>
      <div className="pdp-rails"><ProductRail title="Related Products" products={related} />{recent.length > 0 && <ProductRail title="Recently Viewed" products={recent} />}</div>
    </section>
  );
}

function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get('q') ?? '';
  const results = productRepository.searchProducts(query);
  return <CollectionView title={query ? `Search: ${query}` : 'Search'} products={results} />;
}

function BrandsPage() {
  const brands = productRepository.getBrands();
  return (
    <section className="section page">
      <h1>Shop by Brand</h1>
      <div className="brand-grid">{brands.map((brand) => <Link key={brand} to={`/brands/${normalize(brand)}`}>{brand}<span>{allProducts.filter((product) => product.brand === brand).length} products</span></Link>)}</div>
    </section>
  );
}

function BrandPage() {
  const { brand = '' } = useParams();
  const products = allProducts.filter((product) => normalize(product.brand) === brand);
  return <CollectionView title={products[0]?.brand ?? titleFromHandle(brand)} products={products} />;
}

function ServicesPage() {
  const services = [
    ['Skate sharpening', 'Fresh, consistent edges matched to the skater, ice conditions, and preferred bite or glide.', '/products/performance-skate-sharpening-service'],
    ['Precision profiling', 'Runner shape adjustments for skaters chasing better balance, agility, acceleration, or stability.', '/products/precision-skate-profiling-service'],
    ['Blade mounting', 'Careful figure blade and hockey holder alignment for clean tracking and confident edge work.', '/products/blade-mounting-holder-alignment-service'],
    ['Heat molding', 'Compatible boot molding to improve wrap, heel lock, and break-in comfort.', '/products/skate-heat-molding-service'],
    ['Boot adjustment', 'Targeted punch and stretch work for pressure points after size and model are confirmed.', '/products/boot-punch-fit-adjustment-service'],
    ['Rivet and eyelet repair', 'Hardware repairs for loose holders, pulled eyelets, and worn rivets before they become rink problems.', '/products/rivet-eyelet-repair-service'],
    ['Repair inspection', 'Bench review for edge damage, boot issues, holder movement, and repair planning.', '/products/general-skate-repair-inspection']
  ];
  return (
    <section className="section page services-page">
      <div><p className="eyebrow">Penguin Skate Services</p><h1>Keep your skates fast, comfortable, and dependable.</h1><p>From routine sharpening to fit work and blade repairs, Penguin staff can help skaters solve the small equipment issues that show up in stride, edge control, comfort, and confidence.</p></div>
      <img src={assetUrl('/images/services/skate-services.webp')} alt="Professional skate service bench with skates, steel runners, and sharpening equipment" />
      <div className="service-grid">{services.map(([service, description, href]) => <article key={service}><h3>{service}</h3><p>{description}</p><Link to={href}>View service</Link></article>)}</div>
    </section>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    analytics.track('contact_form_submit', {
      topic: formData.get('topic'),
      preferredContact: formData.get('preferredContact')
    });
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <section className="section page contact-page">
      <div>
        <p className="eyebrow">Contact Penguin Skate</p>
        <h1>Talk with the shop before your next skate.</h1>
        <p>Use the contact paths below to plan a visit, ask about service timing, coordinate pickup, or start a team gear conversation.</p>
      </div>
      <div className="contact-layout">
        <form className="contact-form" onSubmit={submitInquiry}>
          <div className="form-head">
            <h2>Send a Message</h2>
            <p>This proof-of-concept form captures the customer inquiry flow. A future Twilio integration can send the completed message to Penguin Skate staff.</p>
          </div>
          {submitted && (
            <div className="prototype-state" role="status">
              <strong>Message preview submitted.</strong> In the live version, this inquiry would be routed to the shop for follow-up.
            </div>
          )}
          <div className="field-grid">
            <label>
              First name
              <input name="firstName" placeholder="Alex" autoComplete="given-name" required />
            </label>
            <label>
              Last name
              <input name="lastName" placeholder="Morgan" autoComplete="family-name" required />
            </label>
          </div>
          <div className="field-grid">
            <label>
              Email
              <input name="email" type="email" placeholder="alex@example.com" autoComplete="email" required />
            </label>
            <label>
              Phone
              <input name="phone" type="tel" placeholder="661-555-0144" autoComplete="tel" />
            </label>
          </div>
          <div className="field-grid">
            <label>
              What can we help with?
              <select name="topic" defaultValue="general">
                <option value="general">General question</option>
                <option value="skate-service">Skate service or repair</option>
                <option value="product-fit">Product fit or availability</option>
                <option value="team-order">Team or group order</option>
                <option value="pickup">Store pickup support</option>
              </select>
            </label>
            <label>
              Preferred reply
              <select name="preferredContact" defaultValue="email">
                <option value="email">Email</option>
                <option value="phone">Phone call</option>
                <option value="text">Text message</option>
              </select>
            </label>
          </div>
          <label>
            Message
            <textarea name="message" placeholder="Tell us what you are looking for, your skater's level, service timing, product questions, or pickup details." rows={7} required />
          </label>
          <button className="button primary" type="submit">Submit Inquiry Preview</button>
        </form>
        <aside className="contact-aside">
          <h2>Helpful Details</h2>
          <p>For faster service, include the skater's age, approximate skill level, skate model, service need, and when you hope to pick up the gear.</p>
          <p><strong>Service note:</strong> bring both skates for sharpening, profiling, blade mounting, rivet repair, or fit adjustments.</p>
          <p><strong>Team note:</strong> include roster size, age group, league timeline, and whether you need sticks, apparel, protective gear, or accessories.</p>
        </aside>
      </div>
      <div className="contact-grid">
        <article id="location">
          <h2>Store Location</h2>
          <p>25379 Rye Canyon Rd, Santa Clarita, CA 91355</p>
          <p><strong>Phone:</strong> 661-625-2697</p>
          <p><strong>Email:</strong> info@penguinskateandsportssupply.com</p>
        </article>
        <article id="services">
          <h2>Service Questions</h2>
          <p>Ask about sharpening hollows, profiling recommendations, heat molding, blade mounting, boot punches, rivets, eyelets, and repair timing.</p>
          <Link className="button primary" to="/services">View Services</Link>
        </article>
        <article id="teams">
          <h2>Team Orders</h2>
          <p>Penguin can help coaches, managers, and families compare team needs across sticks, protective gear, apparel, accessories, and pickup timing.</p>
          <Link className="button secondary" to="/collections/hockey">Shop Hockey</Link>
        </article>
        <article id="pickup">
          <h2>Pickup Support</h2>
          <p>Confirm fit, service readiness, and store pickup details with staff before making a rink-day trip.</p>
          <Link className="button secondary" to="/brands">Browse Brands</Link>
        </article>
      </div>
    </section>
  );
}

function CartPage() {
  const { lines, subtotal, savings, updateQuantity, removeItem } = useCart();
  const [params] = useSearchParams();
  useEffect(() => analytics.track(params.get('checkout') ? 'begin_checkout' : 'view_cart', {}), [params]);
  return (
    <section className="section page cart-page">
      <h1>Cart</h1>
      {params.get('checkout') && <div className="prototype-state"><strong>Checkout preview.</strong> Final payment, appointment scheduling, and pickup confirmation would be completed with Penguin Skate staff.</div>}
      {lines.length === 0 ? <ZeroState title="Your cart is ready for gear." /> : (
        <div className="cart-layout">
          <div className="cart-lines">{lines.map((line) => (
            <article className="cart-line" key={`${line.productId}-${line.variantId}`}>
              <img src={line.product.featuredImage} alt={line.product.altText} />
              <div><h3>{line.product.title}</h3><p>{Object.entries(line.variant.options).map(([key, value]) => `${key}: ${value}`).join(' · ')}</p><Price product={line.product} variant={line.variant} /></div>
              <input aria-label={`Quantity for ${line.product.title}`} type="number" min="0" value={line.quantity} onChange={(event) => updateQuantity(line.productId, line.variantId, Number(event.target.value))} />
              <button onClick={() => removeItem(line.productId, line.variantId)}>Remove</button>
            </article>
          ))}</div>
          <aside className="summary"><h2>Order Summary</h2><p><span>Subtotal</span><strong>{formatMoney(subtotal)}</strong></p><p><span>Savings</span><strong>{formatMoney(savings)}</strong></p><Link className="button primary" to="/cart?checkout=demo">Continue to Checkout Preview</Link><Link className="button secondary" to="/collections/hockey">Continue Shopping</Link></aside>
        </div>
      )}
    </section>
  );
}

function ShopSections() {
  return (
    <section className="shop-sections">
      <div><h2>Shop by Sport</h2><Link to="/collections/hockey">Hockey</Link><Link to="/collections/figure-skating">Figure Skating</Link><Link to="/collections/goalie">Goalie</Link></div>
      <div><h2>Shop by Equipment</h2><Link to="/collections/skates">Skates</Link><Link to="/collections/protective">Protective</Link><Link to="/collections/accessories">Accessories</Link></div>
      <div><h2>Shop by Brand</h2>{productRepository.getBrands().slice(0, 5).map((brand) => <Link key={brand} to={`/brands/${normalize(brand)}`}>{brand}</Link>)}</div>
    </section>
  );
}

function ServicesBand() {
  return <section className="band services-band"><div><p className="eyebrow">Skate Services</p><h2>Sharpening, profiling, heat molding, blade mounting, and repair.</h2><Link className="button primary" to="/services">Explore Services</Link></div></section>;
}

function StoreBand() {
  return (
    <section className="home-contact" id="location">
      <div className="home-contact-copy" data-reveal>
        <p className="eyebrow">Find us in California</p>
        <h2>Contact Penguin Skate & Sports Supply.</h2>
        <p>Visit the Santa Clarita shop for fitting guidance, service timing, pickup details, and hands-on gear support.</p>
        <div className="home-contact-details">
          <a href="https://www.google.com/maps/search/?api=1&query=25379%20Rye%20Canyon%20Rd%2C%20Santa%20Clarita%2C%20CA%2091355" target="_blank" rel="noreferrer">25379 Rye Canyon Rd, Santa Clarita, CA 91355</a>
          <a href="tel:16616252697">661-625-2697</a>
          <a href="mailto:info@penguinskateandsportssupply.com">info@penguinskateandsportssupply.com</a>
        </div>
        <div className="home-contact-actions">
          <Link className="button primary" to="/contact">Contact Us</Link>
          <a className="button secondary" href="https://www.google.com/maps/search/?api=1&query=25379%20Rye%20Canyon%20Rd%2C%20Santa%20Clarita%2C%20CA%2091355" target="_blank" rel="noreferrer">Open Map</a>
        </div>
      </div>
      <div className="home-contact-map" data-reveal style={{ transitionDelay: '120ms' }}>
        <iframe
          title="Penguin Skate & Sports Supply location map"
          src="https://www.google.com/maps?q=25379%20Rye%20Canyon%20Rd%2C%20Santa%20Clarita%2C%20CA%2091355&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

function SignupBand() {
  return <section className="signup"><h2>Get rink-ready updates</h2><form><input placeholder="Email or mobile number" aria-label="Email or mobile number" /><button className="button primary" type="button">Join Updates</button></form><p>Be first to hear about service availability, back-in-stock gear, pickup updates, and rink-ready offers.</p></section>;
}

function ZeroState({ title = 'No products found' }: { title?: string }) {
  return <div className="zero-state"><h2>{title}</h2><p>Try a different search, remove a filter, or continue browsing the Penguin Skate catalog.</p><Link className="button secondary" to="/">Return Home</Link></div>;
}

function Footer() {
  return (
    <footer>
      <div><strong>Penguin Skate & Sports Supply</strong><p>Storefront planning concept with MSRP/reference pricing, service details, and in-store pickup guidance.</p></div>
      <nav>{(theme.id === 'penguin-classic' ? [...classicNavItems, ...navItems.slice(5, 9)] : navItems).map((item) => <Link key={`${item.label}-${item.href}`} to={item.href}>{item.label}</Link>)}</nav>
    </footer>
  );
}
