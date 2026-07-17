import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {hasLocale} from 'next-intl';
import {routing} from '@/i18n/routing';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';
import LocaleHtmlUpdater from '@/components/locale-html-updater';

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleHtmlUpdater />
      <div className="min-h-screen bg-white text-slate-900">
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </NextIntlClientProvider>
  );
}
