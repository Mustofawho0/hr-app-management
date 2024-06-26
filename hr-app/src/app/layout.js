import { Inter } from 'next/font/google';
import './globals.css';
import BottomNavigator from './../components/BottomNavigator';
import TanstackProvider from './../providers/TanstackProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReduxProvider from '~/providers/ReduxProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='flex justify-center'>
        <div className='container w-[500px] min-w-[500px] max-w-[500px]'>
          <ReduxProvider>
            <ToastContainer />
            <TanstackProvider>
              {children}
              <BottomNavigator />
            </TanstackProvider>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
