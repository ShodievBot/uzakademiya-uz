'use client';

import {useEffect} from 'react';
import {useParams} from 'next/navigation';

const supportedLocales = new Set(['ru', 'uz', 'en']);

export default function LocaleHtmlUpdater() {
  const params = useParams();
  const localeParam = params?.locale;

  const locale =
    typeof localeParam === 'string' && supportedLocales.has(localeParam)
      ? localeParam
      : 'ru';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.setAttribute('dir', 'ltr');
  }, [locale]);

  return null;
}
