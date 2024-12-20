import React from 'react';
import Image from 'next/image';
import {useTranslation} from 'next-i18next';
// import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

//internal import
import Layout from '@layout/Layout';
import PageHeader from '@component/header/PageHeader';

const AboutUs = () => {
  const {t: translate} = useTranslation('about');

  // const handleClick = l => () => {
  //   push('/about-us', undefined, {locale: l});
  // };

  return (
    <Layout title="About Us" description="This is about us page">
      <PageHeader title="About Us" />
      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-4 sm:px-10">
          <div className="grid grid-flow-row lg:grid-cols-2 gap-4 lg:gap-16 items-center">
            <div className="">
              <h3 className="text-xl lg:text-3xl mb-2 font-serif font-semibold">
                Welcome to our KachaBazar
                {/* <h4>locale: {locale}</h4> */}
                {/* {t('common:title')} */}
              </h3>
              <div className="mt-3 text-base opacity-90 leading-7">
                <p>
                  {/* Holisticly seize parallel metrics and functional ROI. Seamlessly revolutionize error-free internal or organic sources
                  before effective scenarios. Progressively incentivize state of the art applications for efficient intellectual capital.
                  Credibly leverage existing distinctive mindshare through cutting-edge schemas. Proactively procrastinate team building
                  paradigms coordinate client-centric total transparent internal. */}
                  {translate('aboutfp')}
                </p>

                <p>
                  {/* Dynamically embrace diverse customer service and installed base paradigms. Credibly seize enterprise-wide experiences for
                  end-to-end data. Professionally brand flexible alignments and cost effective architectures. Enthusiastically incentivize
                  seamless communities with seamlessly facilitate revolutionary metrics with strategic theme areas. */}
                  {translate('aboutsp')}
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-2 xl:gap-6 mt-8">
                <div className="p-8 bg-indigo-50 shadow-sm rounded-lg">
                  <span className="text-3xl block font-extrabold font-serif mb-4 text-gray-800">10K</span>
                  <h4 className="text-lg font-serif font-bold mb-1">Listed Products</h4>
                  <p className="mb-0 opacity-90 leading-7">Dynamically morph team driven partnerships after vertical. </p>
                </div>
                <div className="p-8 bg-indigo-50 shadow-sm rounded-lg">
                  <span className="text-3xl block font-extrabold font-serif mb-4 text-gray-800">8K</span>
                  <h4 className="text-lg font-serif font-bold mb-1">Lovely Customer</h4>
                  <p className="mb-0 opacity-90 leading-7">Competently productize virtual models without performance. </p>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <Image width={920} height={750} src="/about-us.jpg" alt="logo" />
            </div>
          </div>
          <div className="mt-10 lg:mt-16 text-base opacity-90 leading-7">
            <p>
              Holisticly seize parallel metrics and functional ROI. Seamlessly revolutionize error-free internal or "organic" sources before
              effective scenarios. Progressively incentivize state of the art applications for efficient intellectual capital. Credibly
              leverage existing distinctive mindshare through cutting-edge schemas. Proactively procrastinate team building paradigms
              coordinate client-centric total transparent internal. Energistically reconceptualize global leadership for high-quality
              networks. Credibly restore an expanded array of systems rather than accurate results. Collaboratively synergize backend
              bandwidth without 24/7 functionalities. Credibly utilize proactive ideas whereas cross-media core competencies. Uniquely
              maximize professional best practices through resource maximizing services. Conveniently architect cross-unit web services for
              e-business imperatives.{' '}
            </p>

            <p>
              {' '}
              Appropriately visualize market-driven data before one-to-one scenarios. Collaboratively productize multifunctional ROI through
              intuitive supply chains. Enthusiastically seize revolutionary value and process-centric services. Competently harness
              intuitive information after interoperable markets. Interactively revolutionize future-proof value before granular sources.
              Dynamically embrace diverse customer service and installed base paradigms. Credibly seize enterprise-wide experiences for
              end-to-end data. Professionally brand flexible alignments and cost effective architectures. Enthusiastically incentivize
              seamless communities with seamlessly facilitate revolutionary metrics with strategic theme areas.
            </p>
          </div>
          <div className="mt-10 lg:mt-12 flex flex-col sm:grid gap-4">
            <Image width={1920} height={570} src="/about-banner.jpg" alt="logo" className="block rounded-lg" />
          </div>
        </div>
        <div className="bg-gray-50 lg:py-20 py-10">
          <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
            <div className="relative flex flex-col sm:flex-row sm:items-end justify-between mb-8">
              <div className="max-w-2xl">
                <h3 className="text-xl lg:text-3xl mb-2 font-serif font-semibold">Our Founder</h3>
                <p className="mt-2 md:mt-3 font-normal block text-base">
                  We’re impartial and independent, and every day we create distinctive, world-class reintermediate backend supply
                  programmes.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-6 xl:gap-x-8">
              <div className="max-w-sm">
                <Image width={420} height={420} src="/team/team-1.jpg" alt="logo" className="block rounded-lg" />
                <div className="py-4">
                  <h5 className="text-lg font-semibold font-serif">Niamh Shea</h5>
                  <span className="opacity-75 text-sm">Co-founder & Executive</span>
                </div>
              </div>
              <div className="max-w-sm">
                <Image width={420} height={420} src="/team/team-2.jpg" alt="logo" className="block rounded-lg" />
                <div className="py-4">
                  <h5 className="text-lg font-semibold font-serif">Orla Dwyer</h5>
                  <span className="opacity-75 text-sm">Chief Executive</span>
                </div>
              </div>
              <div className="max-w-sm">
                <Image width={420} height={420} src="/team/team-3.jpg" alt="logo" className="block rounded-lg" />
                <div className="py-4">
                  <h5 className="text-lg font-semibold font-serif">Danien James</h5>
                  <span className="opacity-75 text-sm">Co-founder, Chairman</span>
                </div>
              </div>
              <div className="max-w-sm">
                <Image width={420} height={420} src="/team/team-4.jpg" alt="logo" className="block rounded-lg" />
                <div className="py-4">
                  <h5 className="text-lg font-semibold font-serif">Dara Frazier</h5>
                  <span className="opacity-75 text-sm">Chief Strategy Officer</span>
                </div>
              </div>
              <div className="max-w-sm">
                <Image width={420} height={420} src="/team/team-5.jpg" alt="logo" className="block rounded-lg" />
                <div className="py-4">
                  <h5 className="text-lg font-semibold font-serif">Glenda Arvidson</h5>
                  <span className="opacity-75 text-sm">HR Officer</span>
                </div>
              </div>
              <div className="max-w-sm">
                <Image width={420} height={420} src="/team/team-6.jpg" alt="logo" className="block rounded-lg" />
                <div className="py-4">
                  <h5 className="text-lg font-semibold font-serif">Melvin Davis</h5>
                  <span className="opacity-75 text-sm">Lead Developer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
