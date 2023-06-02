import RegisterModal from './components/Modals/RegisterModal';
import Navbar from './components/Navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Zhutlo',
  description: 'Apartment search app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <RegisterModal/>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}
