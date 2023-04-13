import navbarfr from '@layout/navbar/locales/fr/navbar.json';
import navbarEn from '@layout/navbar/locales/en/navbar.json';
import indexFr from './src/pages/locales/fr/index.json';
import indexEn from './src/pages/locales/en/index.json';
import aboutFr from './src/pages/locales/fr/about.json';
import aboutEn from './src/pages/locales/en/about.json';
import FooterFr from '@layout/footer/locales/fr/footer.json';
import FooterEn from '@layout/footer/locales/en/footer.json';

const resources = {
  en: {
    navbar: navbarEn,
    index: indexEn,
    about: aboutEn,
    footer: FooterEn,
  },
  fr: {
    navbar: navbarfr,
    index: indexFr,
    about: aboutFr,
    footer: FooterFr,
  },
};

export default resources;
