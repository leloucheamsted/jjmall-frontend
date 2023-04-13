import React from 'react';
import Image from 'next/image';
import i18next from 'i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';

const LanguageSwitcher = ({ British, French }) => {
  const router = useRouter();
  const changeLanguage = lng => {
    i18next.changeLanguage(lng, (error, t) => {
      if (error) {
        console.log('Something went wrong loading English translation: ', error);
        console.log(t('groups'));
      }
      router.push(router.pathname, router.asPath, { locale: lng });
    }); //change the language in i18next
  };

  console.log('language', i18next.language);

  return (
    <div className="h-8 w-8 flex items-center justify-center">
      {i18next.language === 'fr' ? (
        <div onClick={() => changeLanguage('en')} className="h-8 w-8 flex items-center justify-center rounded-full overflow-hidden">
          <Image src={British} width={'100%'} height={'100%'} className="object-cover" />
        </div>
      ) : (
        <div onClick={() => changeLanguage('fr')}>
          <Image src={French} width={'100%'} height={'100%'} className="object-cover" />
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
