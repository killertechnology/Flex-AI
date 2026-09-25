export type ThemeId = 'premium-ice' | 'pro-shop' | 'penguin-modern' | 'penguin-classic';

export type Theme = {
  id: ThemeId;
  name: string;
  tagline: string;
  heroTitle: string;
  heroKicker: string;
  heroBody: string;
  primaryCta: string;
  secondaryCta: string;
  className: string;
  heroImage: string;
};

export const themes: Record<ThemeId, Theme> = {
  'premium-ice': {
    id: 'premium-ice',
    name: 'Premium Ice',
    tagline: 'Hockey • Figure Skating • Goalie',
    heroTitle: 'Built for the ice.',
    heroKicker: 'Penguin Skate & Sports Supply',
    heroBody: 'A polished specialty retail experience for skaters who care about fit, steel, support, and the details that make every session sharper.',
    primaryCta: 'Shop Hockey',
    secondaryCta: 'Shop Figure Skating',
    className: 'theme-premium',
    heroImage: '/images/heroes/premium-ice.webp'
  },
  'pro-shop': {
    id: 'pro-shop',
    name: 'Pro Shop',
    tagline: 'Performance hockey equipment',
    heroTitle: 'Gear up. Hit the ice.',
    heroKicker: 'Built for game night',
    heroBody: 'A high-contrast pro-shop presentation with technical product details, fast paths to gear, and a cart flow ready for a future Shopify checkout.',
    primaryCta: 'Shop Hockey',
    secondaryCta: 'Shop Goalie',
    className: 'theme-pro',
    heroImage: '/images/heroes/pro-shop.webp'
  },
  'penguin-modern': {
    id: 'penguin-modern',
    name: 'Penguin Modern',
    tagline: 'Local expertise for every skater',
    heroTitle: 'Everything you need for the ice.',
    heroKicker: 'From first skates to game night',
    heroBody: 'A friendly modern storefront balancing hockey, figure skating, goalie, apparel, accessories, and the in-store services Penguin is known for.',
    primaryCta: 'Hockey',
    secondaryCta: 'Figure Skating',
    className: 'theme-modern',
    heroImage: '/images/heroes/penguin-modern.webp'
  },
  'penguin-classic': {
    id: 'penguin-classic',
    name: 'Penguin Classic',
    tagline: 'Ice Sports - Hockey and Figure Skating',
    heroTitle: 'Get the latest ice sport equipment and gear up!',
    heroKicker: 'Penguin Skate & Sports Supply',
    heroBody: 'We are the largest distributor of ice sports, hockey, and figure skating equipment in LA County and beyond. Shop the prototype catalog, then choose shipping or store pickup.',
    primaryCta: 'Shop Now',
    secondaryCta: 'Our Store',
    className: 'theme-classic',
    heroImage: '/images/heroes/premium-ice.webp'
  }
};

export function getActiveTheme(): Theme {
  const envTheme = import.meta.env.VITE_THEME as ThemeId | undefined;
  const portTheme = location.port === '8089' ? 'pro-shop' : location.port === '8090' ? 'penguin-modern' : location.port === '8091' ? 'penguin-classic' : 'premium-ice';
  return themes[envTheme ?? portTheme] ?? themes['premium-ice'];
}
