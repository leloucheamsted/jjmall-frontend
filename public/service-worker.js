if(!self.define){let e,s={};const c=(c,a)=>(c=new URL(c+".js",a).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let r={};const t=e=>c(e,n),d={module:{uri:n},exports:r,require:t};s[n]=Promise.all(a.map((e=>d[e]||t(e)))).then((e=>(i(...e),r)))}}define(["./workbox-6a1bf588"],(function(e){"use strict";importScripts("fallback-Kn88cY8MCtMSdSOrlI8sR.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/404.svg",revision:"d38ac435783a21f1956e5ca6c207228d"},{url:"/_next/static/Kn88cY8MCtMSdSOrlI8sR/_buildManifest.js",revision:"a769c829981b86818ccf44eae7aa30e3"},{url:"/_next/static/Kn88cY8MCtMSdSOrlI8sR/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0c428ae2-73bcb5c0cc1b19c8.js",revision:"73bcb5c0cc1b19c8"},{url:"/_next/static/chunks/1590-d42e35bfc5749063.js",revision:"d42e35bfc5749063"},{url:"/_next/static/chunks/228771e0-1847fb34b4287f6e.js",revision:"1847fb34b4287f6e"},{url:"/_next/static/chunks/2400-f1c75af0177cc3c0.js",revision:"f1c75af0177cc3c0"},{url:"/_next/static/chunks/2621-4ae679d8427e554f.js",revision:"4ae679d8427e554f"},{url:"/_next/static/chunks/2688-6eae37ffaf5de4bc.js",revision:"6eae37ffaf5de4bc"},{url:"/_next/static/chunks/2866-659b2cddeb372f93.js",revision:"659b2cddeb372f93"},{url:"/_next/static/chunks/3061-b6e91c54fa4b8533.js",revision:"b6e91c54fa4b8533"},{url:"/_next/static/chunks/31664189-53fb3c0ce9204034.js",revision:"53fb3c0ce9204034"},{url:"/_next/static/chunks/3220-20b87aa387516c82.js",revision:"20b87aa387516c82"},{url:"/_next/static/chunks/3720-7af1cee831eb985a.js",revision:"7af1cee831eb985a"},{url:"/_next/static/chunks/3768-57f5ca4d1273d9e1.js",revision:"57f5ca4d1273d9e1"},{url:"/_next/static/chunks/421-ed2a2a32ed47bc57.js",revision:"ed2a2a32ed47bc57"},{url:"/_next/static/chunks/4430.177e17803c999756.js",revision:"177e17803c999756"},{url:"/_next/static/chunks/4546-244745122b83f6b4.js",revision:"244745122b83f6b4"},{url:"/_next/static/chunks/4579.ada46c993922e641.js",revision:"ada46c993922e641"},{url:"/_next/static/chunks/4737-ebe5d420311d8420.js",revision:"ebe5d420311d8420"},{url:"/_next/static/chunks/4924-99ae130faef192d0.js",revision:"99ae130faef192d0"},{url:"/_next/static/chunks/5181-cfc33cc30153a276.js",revision:"cfc33cc30153a276"},{url:"/_next/static/chunks/5246-b00410874e6b649e.js",revision:"b00410874e6b649e"},{url:"/_next/static/chunks/5478-41013ebd083fd04c.js",revision:"41013ebd083fd04c"},{url:"/_next/static/chunks/5569-dc1d0d47416db6bc.js",revision:"dc1d0d47416db6bc"},{url:"/_next/static/chunks/5688-31d3312dcc2513ba.js",revision:"31d3312dcc2513ba"},{url:"/_next/static/chunks/5779-b7eb21750b3cc462.js",revision:"b7eb21750b3cc462"},{url:"/_next/static/chunks/5930-514f7da5451f9978.js",revision:"514f7da5451f9978"},{url:"/_next/static/chunks/6108.58f3327f020e7291.js",revision:"58f3327f020e7291"},{url:"/_next/static/chunks/6183-65d178eb290c3bb0.js",revision:"65d178eb290c3bb0"},{url:"/_next/static/chunks/65291039-8b0b929c9f4c25ca.js",revision:"8b0b929c9f4c25ca"},{url:"/_next/static/chunks/6963-f38924894df0247d.js",revision:"f38924894df0247d"},{url:"/_next/static/chunks/7274-8d7ab482df518a60.js",revision:"8d7ab482df518a60"},{url:"/_next/static/chunks/74fdba35-e23e83161853d420.js",revision:"e23e83161853d420"},{url:"/_next/static/chunks/7d0bf13e-de64577dc2fe43f3.js",revision:"de64577dc2fe43f3"},{url:"/_next/static/chunks/8275-b571bae2a910d365.js",revision:"b571bae2a910d365"},{url:"/_next/static/chunks/8319-dedcba2f9d6d4834.js",revision:"dedcba2f9d6d4834"},{url:"/_next/static/chunks/8682-824b22f68bc12a4b.js",revision:"824b22f68bc12a4b"},{url:"/_next/static/chunks/8769-ce90a6427d0b2adb.js",revision:"ce90a6427d0b2adb"},{url:"/_next/static/chunks/8798-0ca862f305d74205.js",revision:"0ca862f305d74205"},{url:"/_next/static/chunks/8891-27dd357f6c6414ed.js",revision:"27dd357f6c6414ed"},{url:"/_next/static/chunks/9009-9b73d65f51e9a5e3.js",revision:"9b73d65f51e9a5e3"},{url:"/_next/static/chunks/91eb3b05-c71b83d9710e8afe.js",revision:"c71b83d9710e8afe"},{url:"/_next/static/chunks/9361.965505af00caf094.js",revision:"965505af00caf094"},{url:"/_next/static/chunks/9438-dcbcf9c522fd3f76.js",revision:"dcbcf9c522fd3f76"},{url:"/_next/static/chunks/9826-aa0dce7b7421c38d.js",revision:"aa0dce7b7421c38d"},{url:"/_next/static/chunks/a1b9b43f-33dff9af57f60fc3.js",revision:"33dff9af57f60fc3"},{url:"/_next/static/chunks/ae51ba48-4cf457a7e1475069.js",revision:"4cf457a7e1475069"},{url:"/_next/static/chunks/c9184924-345260867d682635.js",revision:"345260867d682635"},{url:"/_next/static/chunks/d64684d8-0676cf0b660339d7.js",revision:"0676cf0b660339d7"},{url:"/_next/static/chunks/d7eeaac4-a8598dbc8332d3ef.js",revision:"a8598dbc8332d3ef"},{url:"/_next/static/chunks/framework-d805b48c0466ba30.js",revision:"d805b48c0466ba30"},{url:"/_next/static/chunks/main-f71e2a4f4fddad91.js",revision:"f71e2a4f4fddad91"},{url:"/_next/static/chunks/pages/404-316f845017981a3d.js",revision:"316f845017981a3d"},{url:"/_next/static/chunks/pages/_app-46b2b80b7e0f29be.js",revision:"46b2b80b7e0f29be"},{url:"/_next/static/chunks/pages/_error-f2496e8b9fdedb89.js",revision:"f2496e8b9fdedb89"},{url:"/_next/static/chunks/pages/_offline-1942ec646ed06eda.js",revision:"1942ec646ed06eda"},{url:"/_next/static/chunks/pages/about-us-10b3678f4c4ec62f.js",revision:"10b3678f4c4ec62f"},{url:"/_next/static/chunks/pages/auth/reset-password-5b84f3ee0e50f60a.js",revision:"5b84f3ee0e50f60a"},{url:"/_next/static/chunks/pages/auth/reset-password02-08975fb94affc949.js",revision:"08975fb94affc949"},{url:"/_next/static/chunks/pages/auth/signin-fecde96fca9dfce1.js",revision:"fecde96fca9dfce1"},{url:"/_next/static/chunks/pages/chat/chat-37760145be76920d.js",revision:"37760145be76920d"},{url:"/_next/static/chunks/pages/chat/old-chat-9dd3efcb57fdc877.js",revision:"9dd3efcb57fdc877"},{url:"/_next/static/chunks/pages/checkout-a49f1bb194265126.js",revision:"a49f1bb194265126"},{url:"/_next/static/chunks/pages/contact-us-2c92c6bd703f3ad7.js",revision:"2c92c6bd703f3ad7"},{url:"/_next/static/chunks/pages/faq-62e8c9912b833d83.js",revision:"62e8c9912b833d83"},{url:"/_next/static/chunks/pages/generic-product/generic-product-dbd663bca3be3152.js",revision:"dbd663bca3be3152"},{url:"/_next/static/chunks/pages/generic-product/list-generic-products-0632cb8134470d95.js",revision:"0632cb8134470d95"},{url:"/_next/static/chunks/pages/group_details/%5Bid%5D-b81a285ffa929892.js",revision:"b81a285ffa929892"},{url:"/_next/static/chunks/pages/index-1e1bd0a0f77a2d7d.js",revision:"1e1bd0a0f77a2d7d"},{url:"/_next/static/chunks/pages/offer-ed303d22c651c897.js",revision:"ed303d22c651c897"},{url:"/_next/static/chunks/pages/order/%5Bid%5D-4dc1333fd4af0902.js",revision:"4dc1333fd4af0902"},{url:"/_next/static/chunks/pages/order/order-list-1cd927818e2a5bc8.js",revision:"1cd927818e2a5bc8"},{url:"/_next/static/chunks/pages/order/purchaseProgress-55c4919faf58e6c4.js",revision:"55c4919faf58e6c4"},{url:"/_next/static/chunks/pages/privacy-policy-3d6a4b83420e848a.js",revision:"3d6a4b83420e848a"},{url:"/_next/static/chunks/pages/product/%5Bslug%5D-82097f2afa3a1e90.js",revision:"82097f2afa3a1e90"},{url:"/_next/static/chunks/pages/product/addProduct-b630c5c20e7cd642.js",revision:"b630c5c20e7cd642"},{url:"/_next/static/chunks/pages/product/confirmOrder-17a4069f651ac3df.js",revision:"17a4069f651ac3df"},{url:"/_next/static/chunks/pages/product/confirmOrder2-264d06f12a2b43bf.js",revision:"264d06f12a2b43bf"},{url:"/_next/static/chunks/pages/product/confirmOrder3-2ca1f5e21bcc7577.js",revision:"2ca1f5e21bcc7577"},{url:"/_next/static/chunks/pages/product/createGroup-8f5f20d8c261b846.js",revision:"8f5f20d8c261b846"},{url:"/_next/static/chunks/pages/product/detailsProduct-dbbe77d62a2f821d.js",revision:"dbbe77d62a2f821d"},{url:"/_next/static/chunks/pages/product/groupBuy-e9e48cae040e71ab.js",revision:"e9e48cae040e71ab"},{url:"/_next/static/chunks/pages/product/historyStocks-d26ea4e5180b30b2.js",revision:"d26ea4e5180b30b2"},{url:"/_next/static/chunks/pages/product/myGroup-eecec2f6b8d27f60.js",revision:"eecec2f6b8d27f60"},{url:"/_next/static/chunks/pages/products-230bd5ba73db8ede.js",revision:"230bd5ba73db8ede"},{url:"/_next/static/chunks/pages/search-a66294fc03b27f7f.js",revision:"a66294fc03b27f7f"},{url:"/_next/static/chunks/pages/seller/enable-seller-16a1ef1785c1871a.js",revision:"16a1ef1785c1871a"},{url:"/_next/static/chunks/pages/seller/enable-seller2-72fc3a4b1aeb8c00.js",revision:"72fc3a4b1aeb8c00"},{url:"/_next/static/chunks/pages/shop/%5Bid%5D-ee03caa86881ccdf.js",revision:"ee03caa86881ccdf"},{url:"/_next/static/chunks/pages/shop/list-shops-e4201c7527b462f8.js",revision:"e4201c7527b462f8"},{url:"/_next/static/chunks/pages/shop/orders-65e415d4c8fc8b90.js",revision:"65e415d4c8fc8b90"},{url:"/_next/static/chunks/pages/shop/shops-434c7f4d269fd232.js",revision:"434c7f4d269fd232"},{url:"/_next/static/chunks/pages/signup/signup01-f0422ed31ddcd4a8.js",revision:"f0422ed31ddcd4a8"},{url:"/_next/static/chunks/pages/signup/signup02-cca59f76ce780370.js",revision:"cca59f76ce780370"},{url:"/_next/static/chunks/pages/signup/signup03-c30487cd1b15db78.js",revision:"c30487cd1b15db78"},{url:"/_next/static/chunks/pages/signup/signup04-6504c40e0b622b20.js",revision:"6504c40e0b622b20"},{url:"/_next/static/chunks/pages/signup/verif-code-6ce0a439c3eb5f0f.js",revision:"6ce0a439c3eb5f0f"},{url:"/_next/static/chunks/pages/terms-and-conditions-a8b0f2bc490df02c.js",revision:"a8b0f2bc490df02c"},{url:"/_next/static/chunks/pages/user/change-password-fa697145d05c5c11.js",revision:"fa697145d05c5c11"},{url:"/_next/static/chunks/pages/user/dashboard-1b16856703b12acc.js",revision:"1b16856703b12acc"},{url:"/_next/static/chunks/pages/user/email-verification/%5Btoken%5D-87c8207418c2b2e2.js",revision:"87c8207418c2b2e2"},{url:"/_next/static/chunks/pages/user/forget-password/%5Btoken%5D-e635a15969c49391.js",revision:"e635a15969c49391"},{url:"/_next/static/chunks/pages/user/my-orders-4ad89782b58762a0.js",revision:"4ad89782b58762a0"},{url:"/_next/static/chunks/pages/user/recent-order-f414eb5774c5ec55.js",revision:"f414eb5774c5ec55"},{url:"/_next/static/chunks/pages/user/update-profile-f397be512b4bada4.js",revision:"f397be512b4bada4"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-64c8238585344127.js",revision:"64c8238585344127"},{url:"/_next/static/css/6c7987e2821e600c.css",revision:"6c7987e2821e600c"},{url:"/_next/static/css/d7d095a4a9aa1bb4.css",revision:"d7d095a4a9aa1bb4"},{url:"/_next/static/css/f1d5a30b5a4d1378.css",revision:"f1d5a30b5a4d1378"},{url:"/_next/static/css/f2b66a02c2cd9c3c.css",revision:"f2b66a02c2cd9c3c"},{url:"/_next/static/media/best_prices_icon.f1a46853.png",revision:"859062c2e82105e2649d3ca0a07f748c"},{url:"/_next/static/media/best_quality_icon.b4b483fd.png",revision:"cb4b78431ded3c0ead1803259c03f0a1"},{url:"/_next/static/media/british.69d87ddf.png",revision:"450d24ca941c4dbc81727cfad41c595d"},{url:"/_next/static/media/category_nofound.ac4b90a1.svg",revision:"5f45d654ec2a938bd18c751a1c232f21"},{url:"/_next/static/media/chat-group-icon.7134e016.png",revision:"f3e11a98b00c961b7c73930137bbddb8"},{url:"/_next/static/media/delivery-location-img.1b1b64f8.png",revision:"04a2aa2d977673b1d274e5dd1c1198d3"},{url:"/_next/static/media/empty_profile2.1ea292ae.png",revision:"6d3da303459820b5eba3db8f37f05465"},{url:"/_next/static/media/french.12b5d656.png",revision:"cd4214d0e8f8085aed198396b32e14ce"},{url:"/_next/static/media/home_delivery_icon.dbd30ec4.png",revision:"40c26e4b1c2c174557cae191fdcdf56f"},{url:"/_next/static/media/image_not_avalaible.f647bfe6.png",revision:"842f9717e512f16af39334afa3cec7aa"},{url:"/_next/static/media/jjmall_logo.24d1e1e0.png",revision:"79e86103a8aad46255772a1055ef861c"},{url:"/_next/static/media/logo-color.76d1040e.png",revision:"fa727b7deb210008783eb70fb800c07a"},{url:"/_next/static/media/mtn_img.9c35574e.png",revision:"42d431b03c9498ad4262e9020e9785e0"},{url:"/_next/static/media/om_img.67775d35.png",revision:"2fbaebbd5c89b231ef7b05a5a5ae6ab5"},{url:"/_next/static/media/paypal_img.b0e5915b.png",revision:"418e05f75ad8d4c0adcbc8300cae61cc"},{url:"/_next/static/media/saut_pomme1.c6eed52f.png",revision:"5e058056373b13fd7346fa99b3b9c312"},{url:"/_next/static/media/saut_pomme2.80582f68.png",revision:"9654d3e6a7832a4e3246058235f0561e"},{url:"/_next/static/media/saut_pomme3.c345596f.png",revision:"5bf7fb47099715fb35aa4eb34053b3b4"},{url:"/_next/static/media/vieux_sage.0d4d259d.png",revision:"3990bc86ad6bd8731b0c12ae3c2aa607"},{url:"/_next/static/media/visa_img.648e4124.png",revision:"cd4ce68894b54274c79d8bf30e9962c2"},{url:"/_offline",revision:"Kn88cY8MCtMSdSOrlI8sR"},{url:"/about-banner.jpg",revision:"79bcd14e1663eeb10fd2078a1b40a68a"},{url:"/about-us.jpg",revision:"a69c8f7c944c6dd9673e4e8407684ae9"},{url:"/app-download-img-left.png",revision:"72d8da82c11b9694f687e2b24711a82a"},{url:"/app-download-img.png",revision:"22ab424e74d09df11be0f6943a264856"},{url:"/app/app-store.svg",revision:"a717e97b14d37aa12c48a288bddf4bae"},{url:"/app/mastercard-icon.svg",revision:"2f3b7f6dc10d68bf74366ce0e4b39217"},{url:"/app/paypal-icon.svg",revision:"99025da84086629516e323641cdfd73b"},{url:"/app/play-store.svg",revision:"a2b0ad8b1000e23bf80ca9ef30b14b97"},{url:"/app/skrill-icon.svg",revision:"01cb261e1e28b74c3f51a379a63216d3"},{url:"/app/visa-icon.svg",revision:"58cb00fe42ab95ae26c5e7e429f04545"},{url:"/banner-1.jpg",revision:"96eaf5765f56f7574dc21db0424668f3"},{url:"/banner-2.jpg",revision:"d08fc088d9d75823e8259261e9208cf2"},{url:"/british.png",revision:"450d24ca941c4dbc81727cfad41c595d"},{url:"/category_nofound.svg",revision:"5f45d654ec2a938bd18c751a1c232f21"},{url:"/chat-group-icon.png",revision:"f3e11a98b00c961b7c73930137bbddb8"},{url:"/contact-us.png",revision:"1f0a34dcebe83884f7d986c29069cff0"},{url:"/cta-bg.png",revision:"0dd94ded00743cc74d0da8027b579b73"},{url:"/cta/cta-bg-1.jpg",revision:"45b3e432be8fc7f3eb09f2568a61d8c2"},{url:"/cta/cta-bg-2.jpg",revision:"83ca16fa37654fd7de5518d0f347a29c"},{url:"/cta/cta-bg-3.jpg",revision:"42c150e775ca1b35399b3428d5ee2e00"},{url:"/cta/delivery-boy.png",revision:"9914b651b1428467046e8b886166dac9"},{url:"/facebook-page.png",revision:"0a668853fee7423c27bb93b947a6fc1c"},{url:"/faq.svg",revision:"2979a7b97c0c5d96960e9558a389bbd4"},{url:"/favicon.png",revision:"0033e08ea1185a9ef4ddea787f470df5"},{url:"/french.png",revision:"cd4214d0e8f8085aed198396b32e14ce"},{url:"/icon-192x192.png",revision:"47e2812c3e78f1903ccd46f0545f5d48"},{url:"/icon-256x256.png",revision:"5cfadd2f4679b3d86f1d994297809226"},{url:"/icon-384x384.png",revision:"e793bffd9497800be7d461caa873b96b"},{url:"/icon-512x512.png",revision:"b9df59369ad910b5d3e338e9076fd944"},{url:"/image_not_avalaible.png",revision:"842f9717e512f16af39334afa3cec7aa"},{url:"/kachabazar-store-min.png",revision:"6bf12cd3f0a8d7ccf8285ea0672bf182"},{url:"/locales/en/common.json",revision:"99914b932bd37a50b983c5e7c90ae93b"},{url:"/locales/fr/common.json",revision:"99914b932bd37a50b983c5e7c90ae93b"},{url:"/logo/bag-shoping.svg",revision:"54014870b794b613e62017decbe943d0"},{url:"/logo/jjmall_logo.jpg",revision:"bcf7c9248c1abbe7678e0ce22e1c5edc"},{url:"/logo/jjmall_logo.png",revision:"79e86103a8aad46255772a1055ef861c"},{url:"/logo/logo-color.png",revision:"fa727b7deb210008783eb70fb800c07a"},{url:"/logo/logo-color.svg",revision:"9cdfd2a1723ebe5d6fbfeb2a3a07765d"},{url:"/logo/logo-dark-2.svg",revision:"990e13afb1b79734e26b71f2fcc062d9"},{url:"/logo/logo-dark.svg",revision:"3d5619a9dd2312d20ee908259e95a635"},{url:"/logo/logo-light-2.svg",revision:"8e9e97fd3acd9a7aa3525e2c5eb93811"},{url:"/logo/logo-light.svg",revision:"a295f016c697789c084b023006b33ac5"},{url:"/manifest.json",revision:"1bdc898597594f46bcd9b0ae76e7c991"},{url:"/navbarTop/best_prices_icon.png",revision:"859062c2e82105e2649d3ca0a07f748c"},{url:"/navbarTop/best_quality_icon.png",revision:"cb4b78431ded3c0ead1803259c03f0a1"},{url:"/navbarTop/home_delivery_icon.png",revision:"40c26e4b1c2c174557cae191fdcdf56f"},{url:"/no-result.svg",revision:"508b2439b4b83ce579e826c9c625b675"},{url:"/page-header-bg.jpg",revision:"c7cf9224e6c1ae3add73d30c2ae7a8f8"},{url:"/payment-method/payment-logo.png",revision:"469911779f6463e5751cf5b7046384d2"},{url:"/robots.txt",revision:"61c27d2cd39a713f7829422c3d9edcc7"},{url:"/slider/slider-1.jpg",revision:"9611448d0a85493ee21c5317323cb601"},{url:"/slider/slider-2.jpg",revision:"fe98a6e4032332b05d52aa1254f085a7"},{url:"/slider/slider-3.jpg",revision:"06cef52491c3b8682d15596e784362bb"},{url:"/spinner.gif",revision:"9317b1364997865cda53478fb9302977"},{url:"/styles/customStyles.css",revision:"f2565b9a39e22d22ae9813415f4f8131"},{url:"/team/team-1.jpg",revision:"e318a12728d39d01c926be7fbbcd6876"},{url:"/team/team-2.jpg",revision:"ba945720d060272d028634a8729b7d2b"},{url:"/team/team-3.jpg",revision:"dfa429c7e964aa5a8ea01c3959710529"},{url:"/team/team-4.jpg",revision:"490ae645f676543ef728fc2548a6bd3f"},{url:"/team/team-5.jpg",revision:"a345363d59da88084c7fd6de76cc978c"},{url:"/team/team-6.jpg",revision:"39e8a23ea2ae4bc88316d1ddad73132c"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));