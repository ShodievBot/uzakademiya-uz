import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://uzakademiya.uz'),
  title: {
    default: 'UzAkademiya.uz',
    template: '%s | UzAkademiya.uz'
  },
  description:
    'Каталог научных журналов и справочная платформа по Scopus, OAK и публикационным требованиям.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
