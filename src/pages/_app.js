import '@styles/custom.css';
import {CartProvider} from 'react-use-cart';
import {Elements} from '@stripe/react-stripe-js';

//internal import

import {UserProvider} from '@context/UserContext';
import DefaultSeo from '@component/common/DefaultSeo';
import {SidebarProvider} from '@context/SidebarContext';
import {SessionProvider} from 'next-auth/react';

import {appWithTranslation} from 'next-i18next';
import i18n from '../../i18n';

function MyApp({Component, pageProps}) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <UserProvider>
          <SidebarProvider>
            <CartProvider>
              <DefaultSeo />
              <Component {...pageProps} />
            </CartProvider>
          </SidebarProvider>
        </UserProvider>
      </SessionProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
