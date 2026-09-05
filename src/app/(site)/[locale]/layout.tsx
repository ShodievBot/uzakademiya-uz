import type {Metadata, Viewport} from 'next';
import {Inter} from 'next/font/google';
import '../../globals.css';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {hasLocale} from 'next-intl';
import {routing} from '@/i18n/routing';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';

const inter = Inter({
  subsets: ['latin', 'cyrillic', 'latin-ext'],
  display: 'swap',
  variable: '--font-sans'
});

const SITE_URL = process.env.SITE_URL || 'https://uzakademiya.uz';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'UzAkademiya.uz',
    template: '%s | UzAkademiya.uz'
  },
  description:
    'Каталог научных журналов и справочная платформа по Scopus, ВАК/OAK и публикационным требованиям.',
  applicationName: 'UzAkademiya.uz',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [{url: '/favicon.ico'}],
    apple: [{url: '/favicon.ico'}]
  },
  openGraph: {
    type: 'website',
    siteName: 'UzAkademiya.uz',
    title: 'UzAkademiya.uz',
    description:
      'Каталог научных журналов, руководства по Scopus и ВАК/OAK, полезные материалы.',
    url: SITE_URL,
    locale: 'ru_RU',
    alternateLocale: ['uz_UZ', 'en_US']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UzAkademiya.uz',
    description:
      'Каталог научных журналов и справочная платформа по Scopus, ВАК/OAK.'
  },
  other: {
    'yandex-verification': process.env.YANDEX_VERIFICATION || ''
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FF6C26'
};

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

const OG_LOCALE: Record<string, string> = {
  ru: 'ru_RU',
  uz: 'uz_UZ',
  en: 'en_US'
};

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'UzAkademiya.uz',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    sameAs: [] as string[]
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'UzAkademiya.uz',
    url: SITE_URL,
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/${locale}/journals?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(orgJsonLd)}}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(websiteJsonLd)}}
        />
        <meta property="og:locale" content={OG_LOCALE[locale] || 'ru_RU'} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="min-h-screen bg-white text-slate-900">
            <SiteHeader locale={locale} />
            {children}
            <SiteFooter locale={locale} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
