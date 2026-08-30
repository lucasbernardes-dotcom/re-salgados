import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rê Salgados | Caseiros. Fresquinhos. Especiais.',
  description: 'Salgados artesanais feitos sob encomenda em Erechim, RS. Retirada no bairro Bela Vista.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
