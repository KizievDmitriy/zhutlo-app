import './globals.css';
import { Nunito } from 'next/font/google';

import RegisterModal from './components/Modals/RegisterModal';
import LoginModal from './components/Modals/LoginModal';
import RentModal from './components/Modals/RentModal';
import Navbar from './components/Navbar/Navbar';
import ToasterProvider from './providers/ToasterProvider';
import  getCurrentUser  from './actions/getCurrentUser';
import { Suspense } from 'react';
import Loading from './loading';


const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Zhutlo',
  description: 'Apartment search app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <RentModal/>
        <RegisterModal/>
        <LoginModal/>
        <Navbar currentUser={currentUser}/>
        <Suspense fallback={<Loading/>}>
          <div className='pb-20 pt-28'>
            {children}
          </div>
        </Suspense>
      </body>
    </html>
  )
}
