import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Phone, MapPin, Clock, Facebook, Instagram,
  ChevronDown, Star, Download, Menu, X,
  ChevronRight, Mail, ChevronLeft, Quote
} from 'lucide-react';
import { ConnoisseurStackInteractor } from '@/components/ui/connoisseur-stack-interactor';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Language translations
const translations = {
  en: {
    nav: { menu: 'Menu', catering: 'Catering', about: 'About Us', reviews: 'Reviews' },
    hero: {
      headline: "Gabriela's",
      headline2: "European Deli",
      subheadline: 'Authentic European Flavors in Toms River',
      tagline: 'Pierogi, salads, crepes & hot dishes—made the traditional way.',
      cta: 'Explore Our Story',
      location: 'Toms River, NJ'
    },
    about: {
      title: 'Our Story',
      subtitle: 'A Taste of Europe in New Jersey',
      description: 'For over 15 years, Gabriela\'s European Deli has been bringing authentic European flavors to Toms River. What started as a small family dream has grown into a beloved local institution, serving generations of families with recipes passed down through the ages.',
      description2: 'From our hand-folded pierogi to our carefully curated selection of imported cheeses and cured meats, every item in our deli tells a story of tradition, quality, and love for European culinary heritage.',
      location: 'Located at 1825 Hooper Avenue',
      slides: ['Our Charming Storefront', 'Inside Our Deli', 'Outdoor Seating']
    },
    featured: {
      title: 'Our Specialties',
      subtitle: 'Explore our most beloved European delicacies',
      items: [
        { num: '01', name: 'Handmade Pierogi' },
        { num: '02', name: 'Imported Cheeses' },
        { num: '03', name: 'European Sausages' }
      ]
    },
    features: {
      pierogi: {
        eyebrow: 'House Favorite',
        title: 'Pierogi',
        description: 'Hand-folded dumplings with classic fillings: potato, cheese, sauerkraut & mushroom, and sweet farmer\'s cheese.',
        cta: 'See all pierogi'
      },
      salads: {
        eyebrow: 'Fresh & Crisp',
        title: 'Salads',
        description: 'Cabbage slaw, cucumber-dill, beet salad, and layered herring—bright, tangy, made daily.',
        cta: 'See all salads'
      },
      crepes: {
        eyebrow: 'Sweet & Savory',
        title: 'Crepes',
        description: 'Thin, golden, and filled your way: cheese & ham, mushrooms, or sweet farmer\'s cheese with fruit.',
        cta: 'See all crepes'
      },
      hotdishes: {
        eyebrow: 'Hearty Classics',
        title: 'Hot Dishes',
        description: 'Stuffed cabbage, meatballs in dill sauce, roast pork loin, and daily specials—comfort food, European style.',
        cta: 'See all hot dishes'
      }
    },
    reviews: {
      title: 'What Our Customers Say',
      subtitle: 'Real stories from real people who love our food',
      items: [
        {
          name: 'Maria K.',
          text: 'The pierogi reminds me of my grandmother\'s cooking in Poland. Absolutely authentic and delicious!',
          rating: 5
        },
        {
          name: 'John S.',
          text: 'Best European deli in New Jersey. The kielbasa is incredible and the staff treats you like family.',
          rating: 5
        },
        {
          name: 'Eva T.',
          text: 'We order catering for all our family gatherings. Everyone always asks where the food is from!',
          rating: 5
        },
        {
          name: 'Michael R.',
          text: 'Found this gem 3 years ago and haven\'t stopped coming back. The cheese selection is outstanding.',
          rating: 5
        }
      ]
    },
    catering: {
      title: 'Catering Menu',
      subtitle: 'Trays, platters & hot dishes for gatherings—ready to pick up.',
      cta: 'Download PDF Menu',
      orders: {
        title: 'Catering Orders',
        phone: '732-279-3999',
        cta: 'Call to Order',
        address: 'Pickup at 1825 Hooper Avenue, Toms River, NJ'
      }
    },
    menu: {
      title: 'Our Menu',
      categories: {
        pierogi: 'Pierogi',
        salads: 'Salads',
        crepes: 'Crepes',
        hotdishes: 'Hot Dishes',
        additional: 'Additional Dishes'
      }
    },
    contact: {
      title: 'Request Catering',
      subtitle: 'Tell us date, headcount, and dishes. We\'ll confirm within 24 hours.',
      form: {
        name: 'Name',
        phone: 'Phone',
        email: 'Email',
        date: 'Event Date',
        guests: 'Guest Count',
        message: 'Message',
        submit: 'Send Request'
      },
      info: {
        address: '1825 Hooper Avenue, Toms River, NJ 08753',
        phone: '732-279-3999',
        email: 'hello@gabrielasdeli.com',
        hours: 'Hours: Tue–Sat 9am–6pm | Sun 10am–4pm'
      }
    },
    footer: {
      copyright: '© 2025 Gabriela\'s European Deli. All rights reserved.'
    }
  },
  sk: {
    nav: { menu: 'Menu', catering: 'Catering', about: 'O Nás', reviews: 'Recenzie' },
    hero: {
      headline: 'Gabriela\'s',
      headline2: 'European Deli',
      subheadline: 'Autentické európske chute v Toms River',
      tagline: 'Pierogi, šaláty, palacinky a horúce jedlá—pripravené tradičným spôsobom.',
      cta: 'Objavte Náš Príbeh',
      location: 'Toms River, NJ'
    },
    about: {
      title: 'Náš Príbeh',
      subtitle: 'Chuť Európy v New Jersey',
      description: 'Už viac ako 15 rokov prináša Gabriela\'s European Deli autentické európske chute do Toms River. To, čo začalo ako malý rodinný sen, sa rozrástlo na obľúbenú miestnu inštitúciu, ktorá obsluhuje generácie rodín receptami odovzdávanými z pokolenia na pokolenie.',
      description2: 'Od našich ručne skladaných pierogi po náš starostlivo vyberaný výber importovaných syrov a údenín—každá položka v našom deli rozpráva príbeh tradície, kvality a lásky k európskemu kulinárskemu dedičstvu.',
      location: 'Nachádzame sa na 1825 Hooper Avenue',
      slides: ['Naša Okúzľujúca Predajňa', 'Vo vnútri Nášho Deli', ' Vonkajšie Sedenie']
    },
    featured: {
      title: 'Naše Špeciality',
      subtitle: 'Objavte naše najobľúbenejšie európske lahôdky',
      items: [
        { num: '01', name: 'Ručné Pierogi' },
        { num: '02', name: 'Importované Syry' },
        { num: '03', name: 'Európske Klobásy' }
      ]
    },
    features: {
      pierogi: {
        eyebrow: 'Obľúbené',
        title: 'Pierogi',
        description: 'Ručne skladané knedle s klasickými plnkami: zemiaky, syr, kyslá kapusta a huby, a sladký tvaroh.',
        cta: 'Všetky pierogi'
      },
      salads: {
        eyebrow: 'Čerstvé & Chrumkavé',
        title: 'Šaláty',
        description: 'Kapustový šalát, uhorkový s kôprom, cviklový šalát a vrstvený sleď—svieži, kyslý, pripravený denne.',
        cta: 'Všetky šaláty'
      },
      crepes: {
        eyebrow: 'Sladké & Slané',
        title: 'Palacinky',
        description: 'Tenké, zlaté a plnené podľa vášho výberu: syr a šunka, huby, alebo sladký tvaroh s ovocím.',
        cta: 'Všetky palacinky'
      },
      hotdishes: {
        eyebrow: 'Sýte Klasiky',
        title: 'Horúce Jedlá',
        description: 'Plnená kapusta, mäsové guľky v kôprovej omáčke, pečená bravčová panenka a denné špeciály—europské pohodlie.',
        cta: 'Všetky horúce jedlá'
      }
    },
    reviews: {
      title: 'Čo Hovoria Naši Zákazníci',
      subtitle: 'Skutočné príbehy od skutočných ľudí, ktorí milujú naše jedlo',
      items: [
        {
          name: 'Maria K.',
          text: 'Pierogi mi pripomínajú varenie mojej babičky v Poľsku. Absolútne autentické a chutné!',
          rating: 5
        },
        {
          name: 'John S.',
          text: 'Najlepšie európske deli v New Jersey. Klobása je neuveriteľná a personál sa k vám správa ako k rodine.',
          rating: 5
        },
        {
          name: 'Eva T.',
          text: 'Objednávame catering na všetky naše rodinné stretnutia. Vždy sa všetci pýtajú, odkiaľ je jedlo!',
          rating: 5
        },
        {
          name: 'Michael R.',
          text: 'Našiel som tento drahokam pred 3 rokmi a neprestal som sa vracať. Výber syrov je vynikajúci.',
          rating: 5
        }
      ]
    },
    catering: {
      title: 'Catering Menu',
      subtitle: 'Podnosy, taniere a horúce jedlá pre stretnutia—pripravené na vyzdvihnutie.',
      cta: 'Stiahnuť PDF Menu',
      orders: {
        title: 'Catering Objednávky',
        phone: '732-279-3999',
        cta: 'Zavolať na Objednávku',
        address: 'Vyzdvihnutie: 1825 Hooper Avenue, Toms River, NJ'
      }
    },
    menu: {
      title: 'Naše Menu',
      categories: {
        pierogi: 'Pierogi',
        salads: 'Šaláty',
        crepes: 'Palacinky',
        hotdishes: 'Horúce Jedlá',
        additional: 'Ďalšie Jedlá'
      }
    },
    contact: {
      title: 'Požiadať o Catering',
      subtitle: 'Povedzte nám dátum, počet hostí a jedlá. Potvrdíme do 24 hodín.',
      form: {
        name: 'Meno',
        phone: 'Telefón',
        email: 'Email',
        date: 'Dátum Udalosti',
        guests: 'Počet Hostí',
        message: 'Správa',
        submit: 'Odoslať Žiadosť'
      },
      info: {
        address: '1825 Hooper Avenue, Toms River, NJ 08753',
        phone: '732-279-3999',
        email: 'hello@gabrielasdeli.com',
        hours: 'Otváracie hodiny: Ut–So 9:00–18:00 | Ne 10:00–16:00'
      }
    },
    footer: {
      copyright: '© 2025 Gabriela\'s European Deli. Všetky práva vyhradené.'
    }
  },
  pl: {
    nav: { menu: 'Menu', catering: 'Catering', about: 'O Nas', reviews: 'Opinie' },
    hero: {
      headline: 'Gabriela\'s',
      headline2: 'European Deli',
      subheadline: 'Autentyczne Europejskie Smaki w Toms River',
      tagline: 'Pierogi, sałatki, naleśniki i dania gorące—przygotowane tradycyjnym sposobem.',
      cta: 'Odkryj Naszą Historię',
      location: 'Toms River, NJ'
    },
    about: {
      title: 'Nasza Historia',
      subtitle: 'Smak Europy w New Jersey',
      description: 'Od ponad 15 lat Gabriela\'s European Deli przywozi autentyczne europejskie smaki do Toms River. To, co zaczęło się jako mały rodzinny sen, rozrosło się w ukochaną lokalną instytucję, obsługującą pokolenia rodzin przepisami przekazywanymi z pokolenia na pokolenie.',
      description2: 'Od naszych ręcznie lepionych pierogi po nasz starannie dobrany wybór importowanych serów i wędlin—każdy produkt w naszym deli opowiada historię tradycji, jakości i miłości do europejskiego dziedzictwa kulinarnego.',
      location: 'Znajdujemy się przy 1825 Hooper Avenue',
      slides: ['Nasz Urokliwy Sklep', 'Wewnątrz Naszego Deli', 'Siedzenie na Zewnątrz']
    },
    featured: {
      title: 'Nasze Specjały',
      subtitle: 'Odkryj nasze najbardziej ukochane europejskie przysmaki',
      items: [
        { num: '01', name: 'Ręczne Pierogi' },
        { num: '02', name: 'Importowane Sery' },
        { num: '03', name: 'Europejskie Kiełbasy' }
      ]
    },
    features: {
      pierogi: {
        eyebrow: 'Ulubione',
        title: 'Pierogi',
        description: 'Ręcznie lepione pierogi z klasycznymi farszami: ziemniaki, ser, kapusta kiszona i grzyby, oraz słodki twaróg.',
        cta: 'Wszystkie pierogi'
      },
      salads: {
        eyebrow: 'Świeże & Chrupiące',
        title: 'Sałatki',
        description: 'Surówka z kapusty, ogórkowa z koperkiem, buraczkowa i śledź pod pierzynką—świeże, kwaśne, robione codziennie.',
        cta: 'Wszystkie sałatki'
      },
      crepes: {
        eyebrow: 'Słodkie & Wytrawne',
        title: 'Naleśniki',
        description: 'Cienkie, złote i nadziewane po Twojemu: ser i szynka, grzyby, lub słodki twaróg z owocami.',
        cta: 'Wszystkie naleśniki'
      },
      hotdishes: {
        eyebrow: 'Sycące Klasyki',
        title: 'Dania Gorące',
        description: 'Gołąbki, pulpety w sosie koperkowym, pieczona szynka i dania dnia—europejski comfort food.',
        cta: 'Wszystkie dania gorące'
      }
    },
    reviews: {
      title: 'Co Mówią Nasi Klienci',
      subtitle: 'Prawdziwe historie od prawdziwych ludzi, którzy kochają nasze jedzenie',
      items: [
        {
          name: 'Maria K.',
          text: 'Pierogi przypominają mi gotowanie mojej babci w Polsce. Absolutnie autentyczne i pyszne!',
          rating: 5
        },
        {
          name: 'John S.',
          text: 'Najlepsze europejskie deli w New Jersey. Kiełbasa jest niesamowita, a personel traktuje cię jak rodzinę.',
          rating: 5
        },
        {
          name: 'Eva T.',
          text: 'Zamawiamy catering na wszystkie nasze spotkania rodzinne. Zawsze wszyscy pytają, skąd jest jedzenie!',
          rating: 5
        },
        {
          name: 'Michael R.',
          text: 'Znalazłem ten klejnot 3 lata temu i nie przestałem wracać. Wybór serów jest wyjątkowy.',
          rating: 5
        }
      ]
    },
    catering: {
      title: 'Menu Cateringowe',
      subtitle: 'Patery, półmiski i dania gorące na spotkania—gotowe do odbioru.',
      cta: 'Pobierz PDF Menu',
      orders: {
        title: 'Zamówienia Cateringowe',
        phone: '732-279-3999',
        cta: 'Zadzwoń by Zamówić',
        address: 'Odbiór: 1825 Hooper Avenue, Toms River, NJ'
      }
    },
    menu: {
      title: 'Nasze Menu',
      categories: {
        pierogi: 'Pierogi',
        salads: 'Sałatki',
        crepes: 'Naleśniki',
        hotdishes: 'Dania Gorące',
        additional: 'Dodatkowe Dania'
      }
    },
    contact: {
      title: 'Zapytaj o Catering',
      subtitle: 'Powiedz nam datę, liczbę gości i dania. Potwierdzimy w ciągu 24 godzin.',
      form: {
        name: 'Imię',
        phone: 'Telefon',
        email: 'Email',
        date: 'Data Wydarzenia',
        guests: 'Liczba Gości',
        message: 'Wiadomość',
        submit: 'Wyślij Zapytanie'
      },
      info: {
        address: '1825 Hooper Avenue, Toms River, NJ 08753',
        phone: '732-279-3999',
        email: 'hello@gabrielasdeli.com',
        hours: 'Godziny: Wt–So 9:00–18:00 | Nd 10:00–16:00'
      }
    },
    footer: {
      copyright: '© 2025 Gabriela\'s European Deli. Wszelkie prawa zastrzeżone.'
    }
  },
  hu: {
    nav: { menu: 'Menü', catering: 'Catering', about: 'Rólunk', reviews: 'Vélemények' },
    hero: {
      headline: 'Gabriela\'s',
      headline2: 'European Deli',
      subheadline: 'Autentikus Európai Ízek Toms Riverben',
      tagline: 'Pierogi, saláták, palacsinták és meleg ételek—hagyományos módon készítve.',
      cta: 'Fedezze Fel Történetünket',
      location: 'Toms River, NJ'
    },
    about: {
      title: 'Történetünk',
      subtitle: 'Európa Íze New Jersey-ben',
      description: 'Több mint 15 éve a Gabriela\'s European Deli autentikus európai ízeket hoz Toms Riverbe. Amit kis családi álomként kezdődött, az egy kedvelt helyi intézménnyé nőtt, amely generációk óta szolgálja ki a családokat nemzedékről nemzedékre átadott receptekkel.',
      description2: 'A kézzel hajtogatott pierogi-tól kezdve a gondosan összeválogatott importált sajtok és felvágottak választékáig—minden termékünk egy történetet mesél el a hagyományról, a minőségről és az európai kulináris örökség szeretetéről.',
      location: 'Címünk: 1825 Hooper Avenue',
      slides: ['Bájos Üzletünk', 'Deli-nk Belseje', 'Kültéri Ülőhely']
    },
    featured: {
      title: 'Különlegességeink',
      subtitle: 'Fedezze fel legkedveltebb európai finomságainkat',
      items: [
        { num: '01', name: 'Kézműves Pierogi' },
        { num: '02', name: 'Importált Sajtok' },
        { num: '03', name: 'Európai Kolbászok' }
      ]
    },
    features: {
      pierogi: {
        eyebrow: 'Kedvenc',
        title: 'Pierogi',
        description: 'Kézzel hajtogatott gombócok klasszikus töltelékekkel: burgonya, sajt, savanyú káposzta és gomba, és édes túró.',
        cta: 'Összes pierogi'
      },
      salads: {
        eyebrow: 'Friss & Ropogós',
        title: 'Saláták',
        description: 'Káposztasaláta, uborka-kapor, céklasaláta és réteges hering—friss, savanykás, naponta készítve.',
        cta: 'Összes saláta'
      },
      crepes: {
        eyebrow: 'Édes & Sós',
        title: 'Palacsinták',
        description: 'Vékony, arany és az ízlésed szerint töltve: sajt és sonka, gomba, vagy édes túró gyümölccsel.',
        cta: 'Összes palacsinta'
      },
      hotdishes: {
        eyebrow: 'Laktató Klasszikusok',
        title: 'Meleg Ételek',
        description: 'Töltött káposzta, kapormártásos húsgombóc, sült sertésszűz és napi ajánlatok—európai comfort food.',
        cta: 'Összes meleg étel'
      }
    },
    reviews: {
      title: 'Mit Mondanak Vásárlóink',
      subtitle: 'Valódi történetek valódi emberektől, akik szeretik az ételünket',
      items: [
        {
          name: 'Maria K.',
          text: 'A pierogi emlékeztet a nagyanyám főztjére Lengyelországban. Abszolút autentikus és finom!',
          rating: 5
        },
        {
          name: 'John S.',
          text: 'A legjobb európai deli New Jersey-ben. A kolbász hihetetlen és a személyzet családként kezel.',
          rating: 5
        },
        {
          name: 'Eva T.',
          text: 'Minden családi összejövetelre catering-et rendelünk. Mindig mindenki megkérdezi, honnan van az étel!',
          rating: 5
        },
        {
          name: 'Michael R.',
          text: '3 éve találtam ezt a gyöngyszemet és nem hagytam abba a visszajárást. A sajt választék kiemelkedő.',
          rating: 5
        }
      ]
    },
    catering: {
      title: 'Catering Menü',
      subtitle: 'Tálak, tányérok és meleg ételek összejövetelekre—átvételre készen.',
      cta: 'PDF Menü Letöltése',
      orders: {
        title: 'Catering Rendelések',
        phone: '732-279-3999',
        cta: 'Hívás Rendeléshez',
        address: 'Átvétel: 1825 Hooper Avenue, Toms River, NJ'
      }
    },
    menu: {
      title: 'Menünk',
      categories: {
        pierogi: 'Pierogi',
        salads: 'Saláták',
        crepes: 'Palacsinták',
        hotdishes: 'Meleg Ételek',
        additional: 'További Ételek'
      }
    },
    contact: {
      title: 'Catering Kérés',
      subtitle: 'Mondja meg a dátumot, a vendégek számát és az ételeket. 24 órán belül visszaigazolunk.',
      form: {
        name: 'Név',
        phone: 'Telefon',
        email: 'Email',
        date: 'Esemény Dátuma',
        guests: 'Vendégek Száma',
        message: 'Üzenet',
        submit: 'Kérés Küldése'
      },
      info: {
        address: '1825 Hooper Avenue, Toms River, NJ 08753',
        phone: '732-279-3999',
        email: 'hello@gabrielasdeli.com',
        hours: 'Nyitvatartás: K–Szo 9:00–18:00 | V 10:00–16:00'
      }
    },
    footer: {
      copyright: '© 2025 Gabriela\'s European Deli. Minden jog fenntartva.'
    }
  },
  de: {
    nav: { menu: 'Menü', catering: 'Catering', about: 'Über Uns', reviews: 'Bewertungen' },
    hero: {
      headline: 'Gabriela\'s',
      headline2: 'European Deli',
      subheadline: 'Authentische Europäische Aromen in Toms River',
      tagline: 'Pierogi, Salate, Crêpes & warme Gerichte—auf traditionelle Weise zubereitet.',
      cta: 'Entdecken Sie Unsere Geschichte',
      location: 'Toms River, NJ'
    },
    about: {
      title: 'Unsere Geschichte',
      subtitle: 'Ein Geschmack von Europa in New Jersey',
      description: 'Seit über 15 Jahren bringt Gabriela\'s European Deli authentische europäische Aromen nach Toms River. Was als kleiner Familientraum begann, ist zu einer beliebten lokalen Institution geworden, die Generationen von Familien mit Rezepten bedient, die von Generation zu Generation weitergegeben werden.',
      description2: 'Von unseren handgefalteten Pierogi bis hin zu unserer sorgfältig kuratierten Auswahl an importierten Käsesorten und Wurstwaren—jedes Produkt in unserem Deli erzählt eine Geschichte von Tradition, Qualität und Liebe zum europäischen kulinarischen Erbe.',
      location: 'Wir befinden uns an der 1825 Hooper Avenue',
      slides: ['Unser Charmantes Geschäft', 'Innen in Unserem Deli', 'Sitzplätze im Freien']
    },
    featured: {
      title: 'Unsere Spezialitäten',
      subtitle: 'Entdecken Sie unsere beliebtesten europäischen Delikatessen',
      items: [
        { num: '01', name: 'Handgemachte Pierogi' },
        { num: '02', name: 'Importierte Käse' },
        { num: '03', name: 'Europäische Würste' }
      ]
    },
    features: {
      pierogi: {
        eyebrow: 'Hausfavorit',
        title: 'Pierogi',
        description: 'Handgefaltete Teigtaschen mit klassischen Füllungen: Kartoffel, Käse, Sauerkraut & Pilze, und süßer Quark.',
        cta: 'Alle Pierogi'
      },
      salads: {
        eyebrow: 'Frisch & Knackig',
        title: 'Salate',
        description: 'Krautsalat, Gurke-Dill, Rote-Bete-Salat und geschichteter Hering—hell, würzig, täglich frisch.',
        cta: 'Alle Salate'
      },
      crepes: {
        eyebrow: 'Süß & Herzhaft',
        title: 'Crêpes',
        description: 'Dünn, golden und nach Ihrem Geschmack gefüllt: Käse & Schinken, Pilze, oder süßer Quark mit Obst.',
        cta: 'Alle Crêpes'
      },
      hotdishes: {
        eyebrow: 'Herzhafte Klassiker',
        title: 'Warme Gerichte',
        description: 'Kohlrouladen, Fleischbällchen in Dillsoße, Schweinebraten und Tagesgerichte—europäisches Comfort Food.',
        cta: 'Alle warmen Gerichte'
      }
    },
    reviews: {
      title: 'Was Unsere Kunden Sagen',
      subtitle: 'Echte Geschichten von echten Menschen, die unsere Speisen lieben',
      items: [
        {
          name: 'Maria K.',
          text: 'Die Pierogi erinnern mich an das Kochen meiner Großmutter in Polen. Absolut authentisch und köstlich!',
          rating: 5
        },
        {
          name: 'John S.',
          text: 'Bestes europäisches Deli in New Jersey. Die Kielbasa ist unglaublich und das Personal behandelt Sie wie Familie.',
          rating: 5
        },
        {
          name: 'Eva T.',
          text: 'Wir bestellen Catering für alle unsere Familientreffen. Jeder fragt immer, wo das Essen her ist!',
          rating: 5
        },
        {
          name: 'Michael R.',
          text: 'Habe dieses Juwel vor 3 Jahren gefunden und nicht aufgehört zurückzukommen. Die Käseauswahl ist herausragend.',
          rating: 5
        }
      ]
    },
    catering: {
      title: 'Catering-Menü',
      subtitle: 'Tabletts, Platten & warme Gerichte für Zusammenkünfte—bereit zur Abholung.',
      cta: 'PDF-Menü Herunterladen',
      orders: {
        title: 'Catering-Bestellungen',
        phone: '732-279-3999',
        cta: 'Anrufen zum Bestellen',
        address: 'Abholung: 1825 Hooper Avenue, Toms River, NJ'
      }
    },
    menu: {
      title: 'Unser Menü',
      categories: {
        pierogi: 'Pierogi',
        salads: 'Salate',
        crepes: 'Crêpes',
        hotdishes: 'Warme Gerichte',
        additional: 'Weitere Gerichte'
      }
    },
    contact: {
      title: 'Catering Anfragen',
      subtitle: 'Teilen Sie uns Datum, Gästeanzahl und Gerichte mit. Wir bestätigen innerhalb von 24 Stunden.',
      form: {
        name: 'Name',
        phone: 'Telefon',
        email: 'Email',
        date: 'Veranstaltungsdatum',
        guests: 'Gästeanzahl',
        message: 'Nachricht',
        submit: 'Anfrage Senden'
      },
      info: {
        address: '1825 Hooper Avenue, Toms River, NJ 08753',
        phone: '732-279-3999',
        email: 'hello@gabrielasdeli.com',
        hours: 'Öffnungszeiten: Di–Sa 9:00–18:00 | So 10:00–16:00'
      }
    },
    footer: {
      copyright: '© 2025 Gabriela\'s European Deli. Alle Rechte vorbehalten.'
    }
  }
};

type Language = 'en' | 'sk' | 'pl' | 'hu' | 'de';

function App() {
  const [lang, setLang] = useState<Language>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const t = translations[lang];
  
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const pierogiRef = useRef<HTMLDivElement>(null);
  const saladsRef = useRef<HTMLDivElement>(null);
  const cateringHeaderRef = useRef<HTMLDivElement>(null);
  const crepesRef = useRef<HTMLDivElement>(null);
  const hotdishesRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const storefrontImages = [
    { src: '/storefront-1.jpg', caption: t.about.slides[0] },
    { src: '/storefront-2.jpg', caption: t.about.slides[1] },
    { src: '/storefront-3.jpg', caption: t.about.slides[2] }
  ];

  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % storefrontImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [storefrontImages.length]);

  // Handle scroll for nav
  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.lang-dropdown')) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const heroTl = gsap.timeline();
      heroTl
        .fromTo('.hero-headline', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
        .fromTo('.hero-headline2', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
        .fromTo('.hero-subheadline', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .fromTo('.hero-tagline', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .fromTo('.hero-cta', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2');

      // Floating deli items parallax
      gsap.utils.toArray<HTMLElement>('.floating-item').forEach((item) => {
        const speed = parseFloat(item.dataset.speed || '0.5');
        gsap.to(item, {
          y: () => window.innerHeight * speed * 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
          }
        });
      });

      // About section animation
      gsap.fromTo('.about-content',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.about-slider',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Feature sections
      const featureSections = [
        { ref: pierogiRef, class: 'pierogi' },
        { ref: saladsRef, class: 'salads' },
        { ref: crepesRef, class: 'crepes' },
        { ref: hotdishesRef, class: 'hotdishes' }
      ];

      const mobile = window.innerWidth < 1024;

      featureSections.forEach(({ ref, class: className }) => {
        if (mobile) {
          // Simple fade-in on mobile instead of pinning
          gsap.fromTo(`.${className}-text`,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
              scrollTrigger: {
                trigger: ref.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        } else {
          ScrollTrigger.create({
            trigger: ref.current,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
            onUpdate: (self) => {
              const progress = self.progress;
              const image = `.${className}-image`;
              const text = `.${className}-text`;

              if (progress <= 0.3) {
                const enterProgress = progress / 0.3;
                gsap.set(image, { x: 60 * (1 - enterProgress) + 'vw', opacity: enterProgress });
                gsap.set(text, { x: -40 * (1 - enterProgress) + 'vw', opacity: enterProgress });
              } else if (progress <= 0.7) {
                gsap.set(image, { x: 0, opacity: 1 });
                gsap.set(text, { x: 0, opacity: 1 });
              } else {
                const exitProgress = (progress - 0.7) / 0.3;
                gsap.set(image, { x: -28 * exitProgress + 'vw', opacity: 1 - exitProgress * 0.7 });
                gsap.set(text, { x: 18 * exitProgress + 'vw', opacity: 1 - exitProgress * 0.7 });
              }
            }
          });
        }
      });

      // Catering header
      if (mobile) {
        gsap.fromTo('.catering-header-content',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
            scrollTrigger: {
              trigger: cateringHeaderRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      } else {
        ScrollTrigger.create({
          trigger: cateringHeaderRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress <= 0.3) {
              const enterProgress = progress / 0.3;
              gsap.set('.catering-header-content', {
                y: 40 * (1 - enterProgress) + 'vh',
                opacity: enterProgress
              });
            } else if (progress <= 0.7) {
              gsap.set('.catering-header-content', { y: 0, opacity: 1 });
            } else {
              const exitProgress = (progress - 0.7) / 0.3;
              gsap.set('.catering-header-content', {
                y: -18 * exitProgress + 'vh',
                opacity: 1 - exitProgress * 0.75
              });
            }
          }
        });
      }

      // Reviews section
      gsap.fromTo('.review-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: reviewsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Closing section
      if (mobile) {
        gsap.fromTo('.closing-content',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
            scrollTrigger: {
              trigger: closingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      } else {
        ScrollTrigger.create({
          trigger: closingRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress <= 0.3) {
              const enterProgress = progress / 0.3;
              gsap.set('.closing-content', {
                y: 45 * (1 - enterProgress) + 'vh',
                opacity: enterProgress
              });
            } else if (progress <= 0.7) {
              gsap.set('.closing-content', { y: 0, opacity: 1 });
            } else {
              const exitProgress = (progress - 0.7) / 0.3;
              gsap.set('.closing-content', {
                opacity: 1 - exitProgress * 0.7
              });
            }
          }
        });
      }

      // Flowing sections animations
      gsap.utils.toArray<HTMLElement>('.menu-category').forEach((category) => {
        gsap.fromTo(category, 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: category,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, []);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'sk', label: 'Slovenský', flag: '🇸🇰' },
    { code: 'pl', label: 'Polski', flag: '🇵🇱' },
    { code: 'hu', label: 'Magyar', flag: '🇭🇺' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % storefrontImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + storefrontImages.length) % storefrontImages.length);
  };

  return (
    <div className="relative">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-gold focus:text-navy focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold">
        Skip to content
      </a>

      {/* Fixed Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        navScrolled ? 'bg-navy/95 backdrop-blur-md shadow-xl' : 'bg-transparent'
      }`}>
        {/* Top Bar */}
        <div className={`transition-all duration-300 ${navScrolled ? 'bg-navy-dark' : 'bg-navy/50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="text-cream/70 hover:text-gold transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="text-cream/70 hover:text-gold transition-colors">
                <Instagram size={18} />
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:732-279-3999" className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors">
                <Phone size={16} />
                <span className="text-sm font-semibold hidden sm:inline">732-279-3999</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Main Nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* Hamburger Menu - Left */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-cream hover:text-gold transition-colors p-2"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={24} />
          </button>
          
          {/* Logo - Center */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <img src="/logo.png" alt="Gabriela's European Deli" className="h-10 sm:h-14 w-auto" />
          </div>
          
          {/* Language Selector - Right */}
          <div className="relative lang-dropdown">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowLangDropdown(!showLangDropdown); }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-navy-light/50 border border-gold/30 text-cream hover:border-gold hover:bg-navy-light transition-all"
            >
              <span className="text-lg">{languages.find(l => l.code === lang)?.flag}</span>
              <span className="text-sm font-medium hidden sm:inline">{languages.find(l => l.code === lang)?.label}</span>
              <ChevronDown size={14} className={`transition-transform ${showLangDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showLangDropdown && (
              <div className="absolute right-0 top-full mt-2 bg-navy border border-gold/30 rounded-xl shadow-2xl py-2 min-w-[160px] overflow-hidden">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setShowLangDropdown(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gold/10 transition-colors flex items-center gap-3 ${
                      lang === l.code ? 'text-gold bg-gold/5' : 'text-cream/80'
                    }`}
                  >
                    <span className="text-lg">{l.flag}</span>
                    <span className="font-medium">{l.label}</span>
                    {lang === l.code && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      <div className={`fixed inset-0 z-[60] transition-all duration-500 ${
        mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-navy/98 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)} />
        <div className={`relative h-full flex flex-col items-center justify-center gap-8 transition-transform duration-500 ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-10'
        }`}>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-cream hover:text-gold transition-colors"
            aria-label="Close navigation menu"
          >
            <X size={32} />
          </button>
          
          <img src="/logo.png" alt="Logo" className="h-16 w-auto mb-8" />
          
          <nav className="flex flex-col items-center gap-6">
            <button onClick={() => scrollToSection(aboutRef)} className="text-2xl text-cream hover:text-gold transition-colors font-playfair">
              {t.nav.about}
            </button>
            <button onClick={() => scrollToSection(pierogiRef)} className="text-2xl text-cream hover:text-gold transition-colors font-playfair">
              {t.nav.menu}
            </button>
            <button onClick={() => scrollToSection(reviewsRef)} className="text-2xl text-cream hover:text-gold transition-colors font-playfair">
              {t.nav.reviews}
            </button>
            <button onClick={() => scrollToSection(contactRef)} className="text-2xl text-cream hover:text-gold transition-colors font-playfair">
              {t.nav.catering}
            </button>
          </nav>
          
          <div className="mt-12 flex items-center gap-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
               className="text-cream/60 hover:text-gold transition-colors">
              <Facebook size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               className="text-cream/60 hover:text-gold transition-colors">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Section 1: Hero */}
      <main id="main-content">
      <section ref={heroRef} className="section-pinned bg-navy relative z-10" role="banner">
        <div className="absolute inset-0 wood-texture opacity-15 mix-blend-multiply" />
        <div className="absolute inset-0 paper-grain" />
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-navy/80" />
        
        <div className="relative h-full flex flex-col justify-center items-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="hero-subheadline text-gold text-sm sm:text-base tracking-[0.3em] uppercase mb-4 font-medium">
              {t.hero.subheadline}
            </p>
            <h1 className="hero-headline font-playfair text-cream text-[clamp(48px,10vw,100px)] leading-[0.9] font-bold mb-2">
              {t.hero.headline}
            </h1>
            <h1 className="hero-headline2 font-playfair text-cream text-[clamp(36px,8vw,80px)] leading-[0.9] font-bold mb-8">
              {t.hero.headline2}
            </h1>
            <p className="hero-tagline text-cream/70 text-lg sm:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              {t.hero.tagline}
            </p>
            <button onClick={() => scrollToSection(aboutRef)} className="hero-cta btn-gold text-base sm:text-lg">
              {t.hero.cta}
            </button>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <span className="text-cream/40 text-xs tracking-widest uppercase">{t.hero.location}</span>
            <div className="w-6 h-10 border-2 border-cream/30 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: About Us with Image Slider */}
      <section ref={aboutRef} className="relative z-20 bg-navy py-20 sm:py-32">
        <div className="absolute inset-0 wood-texture opacity-10 mix-blend-multiply" />
        <div className="absolute inset-0 paper-grain" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div className="about-content order-2 lg:order-1">
              <span className="eyebrow mb-4 block">{t.hero.location}</span>
              <h2 className="font-playfair text-cream text-[clamp(32px,5vw,56px)] font-bold mb-4">
                {t.about.title}
              </h2>
              <p className="text-gold text-xl sm:text-2xl font-playfair italic mb-6">
                {t.about.subtitle}
              </p>
              <p className="text-cream/80 text-base sm:text-lg leading-relaxed mb-4">
                {t.about.description}
              </p>
              <p className="text-cream/70 text-base leading-relaxed mb-8">
                {t.about.description2}
              </p>
              <div className="flex items-center gap-3 text-gold">
                <MapPin size={20} />
                <span className="font-medium">{t.about.location}</span>
              </div>
            </div>
            
            {/* Image Slider */}
            <div className="about-slider order-1 lg:order-2">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                {storefrontImages.map((img, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-all duration-700 ${
                      i === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                  >
                    <img src={img.src} alt={img.caption} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-cream text-lg font-playfair">{img.caption}</p>
                    </div>
                  </div>
                ))}
                
                {/* Slider Controls */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-navy/60 backdrop-blur-sm border border-gold/30 flex items-center justify-center text-cream hover:bg-gold hover:text-navy transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-navy/60 backdrop-blur-sm border border-gold/30 flex items-center justify-center text-cream hover:bg-gold hover:text-navy transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight size={20} />
                </button>
                
                {/* Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {storefrontImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentSlide ? 'bg-gold w-6' : 'bg-cream/40 hover:bg-cream/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="relative z-25 bg-navy overflow-hidden">
        <div className="absolute inset-0 wood-texture opacity-10 mix-blend-multiply" />
        <div className="absolute inset-0 paper-grain" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center pt-16 sm:pt-24 px-4">
            <span className="eyebrow mb-4 block">{t.nav.menu}</span>
            <h2 className="font-playfair text-cream text-[clamp(32px,5vw,56px)] font-bold mb-4">
              {t.featured.title}
            </h2>
            <p className="text-cream/60 text-lg max-w-xl mx-auto">
              {t.featured.subtitle}
            </p>
          </div>

          <ConnoisseurStackInteractor
            items={t.featured.items.map((item: { num: string; name: string }, i: number) => ({
              ...item,
              clipId: ['clip-original', 'clip-hexagons', 'clip-pixels'][i],
              image: ['/specialty-pierogi.jpg', '/specialty-cheeses.jpg', '/specialty-sausages.jpg'][i]
            }))}
          />
        </div>
      </section>

      {/* Section 3: Pierogi Feature */}
      <section ref={pierogiRef} className={`${isMobile ? 'py-16 sm:py-20' : 'section-pinned'} bg-navy relative z-30`}>
        <div className="absolute inset-0 wood-texture opacity-15 mix-blend-multiply" />
        <div className="absolute inset-0 paper-grain" />

        <div className={`relative ${isMobile ? '' : 'h-full'} flex flex-col lg:flex-row items-center px-[6vw] sm:px-[8vw] gap-8 lg:gap-0`}>
          <div className="pierogi-text w-full lg:w-[40%] pr-0 lg:pr-8">
            <span className="eyebrow mb-4 block">{t.features.pierogi.eyebrow}</span>
            <h2 className="font-playfair text-cream text-[clamp(36px,5vw,64px)] font-bold mb-6">
              {t.features.pierogi.title}
            </h2>
            <p className="feature-text text-base sm:text-lg mb-6">
              {t.features.pierogi.description}
            </p>
            <button onClick={() => scrollToSection(menuRef)} className="text-gold hover:text-gold-light flex items-center gap-2 transition-colors">
              {t.features.pierogi.cta}
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="hidden lg:block w-px h-[40vh] bg-gold/40 mx-12" />

          <div className="pierogi-image w-full lg:w-[50%] max-w-[700px]">
            <div className="image-card aspect-[4/3] lg:animate-float">
              <img
                src="/specialty-pierogi.jpg"
                alt="Hand-folded pierogi served on a plate"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Salads Feature */}
      <section ref={saladsRef} className={`${isMobile ? 'py-16 sm:py-20' : 'section-pinned'} bg-navy relative z-40`}>
        <div className="absolute inset-0 wood-texture opacity-15 mix-blend-multiply" />
        <div className="absolute inset-0 paper-grain" />

        <div className={`relative ${isMobile ? '' : 'h-full'} flex flex-col lg:flex-row items-center px-[6vw] sm:px-[8vw] gap-8 lg:gap-0`}>
          <div className="salads-text w-full lg:w-[40%] pr-0 lg:pr-8">
            <span className="eyebrow mb-4 block">{t.features.salads.eyebrow}</span>
            <h2 className="font-playfair text-cream text-[clamp(36px,5vw,64px)] font-bold mb-6">
              {t.features.salads.title}
            </h2>
            <p className="feature-text text-base sm:text-lg mb-6">
              {t.features.salads.description}
            </p>
            <button onClick={() => scrollToSection(menuRef)} className="text-gold hover:text-gold-light flex items-center gap-2 transition-colors">
              {t.features.salads.cta}
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="hidden lg:block w-px h-[40vh] bg-gold/40 mx-12" />

          <div className="salads-image w-full lg:w-[50%] max-w-[700px]">
            <div className="image-card aspect-[4/3] lg:animate-float">
              <img
                src="/specialty-cheeses.jpg"
                alt="Selection of imported European cheeses and salads"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Catering Header */}
      <section ref={cateringHeaderRef} className={`${isMobile ? 'py-20 sm:py-28' : 'section-pinned'} bg-navy relative z-50`}>
        <div className="absolute inset-0 wood-texture opacity-20 mix-blend-multiply" />
        <div className="absolute inset-0 paper-grain" />

        <div className={`catering-header-content relative ${isMobile ? '' : 'h-full'} flex flex-col justify-center items-center px-4`}>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-playfair text-cream text-[clamp(36px,6vw,72px)] font-bold mb-6">
              {t.catering.title}
            </h2>
            <p className="text-cream/70 text-lg sm:text-xl mb-8">
              {t.catering.subtitle}
            </p>
            <a
              href="/catering-menu.jpg"
              download
              className="btn-gold inline-flex items-center gap-2"
              aria-label="Download catering menu as PDF"
            >
              <Download size={18} />
              {t.catering.cta}
            </a>
          </div>
        </div>
      </section>

      {/* Section 6: Crepes Feature */}
      <section ref={crepesRef} className={`${isMobile ? 'py-16 sm:py-20' : 'section-pinned'} bg-navy relative z-[60]`}>
        <div className="absolute inset-0 wood-texture opacity-15 mix-blend-multiply" />
        <div className="absolute inset-0 paper-grain" />

        <div className={`relative ${isMobile ? '' : 'h-full'} flex flex-col lg:flex-row items-center px-[6vw] sm:px-[8vw] gap-8 lg:gap-0`}>
          <div className="crepes-text w-full lg:w-[40%] pr-0 lg:pr-8">
            <span className="eyebrow mb-4 block">{t.features.crepes.eyebrow}</span>
            <h2 className="font-playfair text-cream text-[clamp(36px,5vw,64px)] font-bold mb-6">
              {t.features.crepes.title}
            </h2>
            <p className="feature-text text-base sm:text-lg mb-6">
              {t.features.crepes.description}
            </p>
            <button onClick={() => scrollToSection(menuRef)} className="text-gold hover:text-gold-light flex items-center gap-2 transition-colors">
              {t.features.crepes.cta}
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="hidden lg:block w-px h-[40vh] bg-gold/40 mx-12" />

          <div className="crepes-image w-full lg:w-[50%] max-w-[700px]">
            <div className="image-card aspect-[4/3] lg:animate-float">
              <img
                src="/specialty-baked.jpg"
                alt="Fresh baked crepes and European pastries"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Hot Dishes Feature */}
      <section ref={hotdishesRef} className={`${isMobile ? 'py-16 sm:py-20' : 'section-pinned'} bg-navy relative z-[70]`}>
        <div className="absolute inset-0 wood-texture opacity-15 mix-blend-multiply" />
        <div className="absolute inset-0 paper-grain" />

        <div className={`relative ${isMobile ? '' : 'h-full'} flex flex-col lg:flex-row items-center px-[6vw] sm:px-[8vw] gap-8 lg:gap-0`}>
          <div className="hotdishes-text w-full lg:w-[40%] pr-0 lg:pr-8">
            <span className="eyebrow mb-4 block">{t.features.hotdishes.eyebrow}</span>
            <h2 className="font-playfair text-cream text-[clamp(36px,5vw,64px)] font-bold mb-6">
              {t.features.hotdishes.title}
            </h2>
            <p className="feature-text text-base sm:text-lg mb-6">
              {t.features.hotdishes.description}
            </p>
            <button onClick={() => scrollToSection(menuRef)} className="text-gold hover:text-gold-light flex items-center gap-2 transition-colors">
              {t.features.hotdishes.cta}
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="hidden lg:block w-px h-[40vh] bg-gold/40 mx-12" />

          <div className="hotdishes-image w-full lg:w-[50%] max-w-[700px]">
            <div className="image-card aspect-[4/3] lg:animate-float">
              <img
                src="/specialty-sausages.jpg"
                alt="European sausages and hot dishes selection"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Reviews */}
      <section ref={reviewsRef} className="relative z-[80] bg-navy py-20 sm:py-32">
        <div className="absolute inset-0 wood-texture opacity-10 mix-blend-multiply" />
        <div className="absolute inset-0 paper-grain" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-cream text-[clamp(32px,5vw,56px)] font-bold mb-4">
              {t.reviews.title}
            </h2>
            <p className="text-cream/60 text-lg">
              {t.reviews.subtitle}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.reviews.items.map((review, i) => (
              <div key={i} className="review-card bg-navy-light/50 backdrop-blur-sm border border-gold/20 rounded-xl p-6 hover:border-gold/40 transition-colors">
                <Quote className="text-gold/40 mb-4" size={32} />
                <p className="text-cream/80 text-sm leading-relaxed mb-6">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="text-gold fill-gold" size={14} />
                  ))}
                </div>
                <p className="text-gold font-medium">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Closing Scene */}
      <section ref={closingRef} className={`${isMobile ? 'py-20 sm:py-28' : 'section-pinned'} bg-navy relative z-[90]`}>
        <div className="absolute inset-0 wood-texture opacity-20 mix-blend-multiply" />
        <div className="absolute inset-0 paper-grain" />

        <div className={`closing-content relative ${isMobile ? '' : 'h-full'} flex flex-col justify-center items-center px-4`}>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-playfair text-cream text-[clamp(28px,4vw,48px)] font-bold mb-4">
              {t.catering.orders.title}
            </h2>
            <a 
              href="tel:732-279-3999"
              className="font-playfair text-gold text-[clamp(28px,6vw,64px)] font-bold block mb-6 hover:text-gold-light transition-colors"
            >
              {t.catering.orders.phone}
            </a>
            <a 
              href="tel:732-279-3999"
              className="btn-gold-solid inline-flex items-center gap-2 mb-6"
            >
              <Phone size={20} />
              {t.catering.orders.cta}
            </a>
            <p className="text-cream/60 text-base sm:text-lg">
              {t.catering.orders.address}
            </p>
          </div>
        </div>
      </section>

      {/* Section 10: Menu List */}
      <section ref={menuRef} className="relative z-[100] bg-cream py-20 sm:py-32">
        <div className="absolute inset-0 paper-grain" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-navy text-[clamp(32px,5vw,56px)] font-bold mb-4">
              {t.menu.title}
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Pierogi */}
            <div className="menu-category">
              <h3 className="font-playfair text-navy text-2xl font-bold mb-4 pb-2 border-b-2 border-navy/20">
                {t.menu.categories.pierogi}
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Potato & Cheese', price: '$10/dozen' },
                  { name: 'Sauerkraut & Mushroom', price: '$10/dozen' },
                  { name: 'Meat', price: '$11/dozen' },
                  { name: 'Sweet Cheese', price: '$11/dozen' },
                  { name: 'Blueberry', price: '$11/dozen' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-navy/10">
                    <span className="text-navy/80">{item.name}</span>
                    <span className="font-semibold text-navy">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Salads */}
            <div className="menu-category">
              <h3 className="font-playfair text-navy text-2xl font-bold mb-4 pb-2 border-b-2 border-navy/20">
                {t.menu.categories.salads}
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Potato Salad (Small/Large)', price: '$40/$75' },
                  { name: 'Coleslaw (Small/Large)', price: '$35/$65' },
                  { name: 'Greek Salad (Small/Large)', price: '$35/$65' },
                  { name: 'Beet Salad', price: '$40/lb' },
                  { name: 'Herring in Cream', price: '$45/lb' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-navy/10">
                    <span className="text-navy/80">{item.name}</span>
                    <span className="font-semibold text-navy">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Crepes */}
            <div className="menu-category">
              <h3 className="font-playfair text-navy text-2xl font-bold mb-4 pb-2 border-b-2 border-navy/20">
                {t.menu.categories.crepes}
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Crepes with Apples', price: '$2.50/pc' },
                  { name: 'Crepes with Cheese', price: '$2.50/pc' },
                  { name: 'Crepes with Blueberries', price: '$2.50/pc' },
                  { name: 'Crepes with Cherries', price: '$2.50/pc' },
                  { name: 'Savory Ham & Cheese', price: '$3.50/pc' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-navy/10">
                    <span className="text-navy/80">{item.name}</span>
                    <span className="font-semibold text-navy">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hot Dishes */}
            <div className="menu-category">
              <h3 className="font-playfair text-navy text-2xl font-bold mb-4 pb-2 border-b-2 border-navy/20">
                {t.menu.categories.hotdishes}
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Stuffed Cabbage (Small/Large)', price: '$45/$90' },
                  { name: 'Meatballs in Dill Sauce', price: '$50/lb' },
                  { name: 'Roast Pork Loin', price: '$55/lb' },
                  { name: 'Chicken Cutlets', price: '$50/lb' },
                  { name: 'Beef Stew', price: '$60/lb' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-navy/10">
                    <span className="text-navy/80">{item.name}</span>
                    <span className="font-semibold text-navy">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Full Menu PDF */}
          <div className="mt-16 text-center">
            <a 
              href="/catering-menu.jpg" 
              target="_blank"
              className="inline-flex items-center gap-3 px-8 py-4 bg-navy text-cream font-semibold hover:bg-navy-light transition-colors rounded-lg"
            >
              <Download size={20} />
              {t.catering.cta}
            </a>
          </div>
        </div>
      </section>

      {/* Section 11: Contact + Form */}
      <section ref={contactRef} className="relative z-[110] bg-navy py-20 sm:py-32">
        <div className="absolute inset-0 wood-texture opacity-15 mix-blend-multiply" />
        <div className="absolute inset-0 paper-grain" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-playfair text-cream text-[clamp(28px,4vw,48px)] font-bold mb-4">
                {t.contact.title}
              </h2>
              <p className="text-cream/70 mb-8">
                {t.contact.subtitle}
              </p>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-gold" size={20} />
                  </div>
                  <div>
                    <p className="text-cream font-medium">{t.contact.info.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-gold" size={20} />
                  </div>
                  <a href={`tel:${t.contact.info.phone}`} className="text-cream font-medium hover:text-gold transition-colors">
                    {t.contact.info.phone}
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-gold" size={20} />
                  </div>
                  <a href={`mailto:${t.contact.info.email}`} className="text-cream font-medium hover:text-gold transition-colors">
                    {t.contact.info.email}
                  </a>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="text-gold" size={20} />
                  </div>
                  <p className="text-cream/80">{t.contact.info.hours}</p>
                </div>
              </div>
              
              {/* Map */}
              <div className="mt-8 aspect-video bg-navy-light rounded-xl overflow-hidden border border-gold/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.3975784327!2d-74.2085!3d40.0184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDAxJzA2LjIiTiA3NMKwMTInMzAuNiJX!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(30%) brightness(0.9)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gabriela's European Deli Location"
                />
              </div>
            </div>
            
            {/* Form */}
            <div className="bg-cream rounded-xl p-6 sm:p-8 relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gold rounded-t-xl" />
              <h3 className="font-playfair text-navy text-2xl font-bold mb-6">
                {t.contact.title}
              </h3>
              
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Thank you! We will contact you within 24 hours.'); }}>
                <div>
                  <label className="block text-navy/70 text-sm mb-1.5 font-medium">{t.contact.form.name}</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-cream-dark border border-navy/20 text-navy rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-navy/70 text-sm mb-1.5 font-medium">{t.contact.form.phone}</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-3 bg-cream-dark border border-navy/20 text-navy rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                      placeholder="Your phone"
                    />
                  </div>
                  <div>
                    <label className="block text-navy/70 text-sm mb-1.5 font-medium">{t.contact.form.email}</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 bg-cream-dark border border-navy/20 text-navy rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-navy/70 text-sm mb-1.5 font-medium">{t.contact.form.date}</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-3 bg-cream-dark border border-navy/20 text-navy rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-navy/70 text-sm mb-1.5 font-medium">{t.contact.form.guests}</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-3 bg-cream-dark border border-navy/20 text-navy rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                      placeholder="Number of guests"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-navy/70 text-sm mb-1.5 font-medium">{t.contact.form.message}</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 bg-cream-dark border border-navy/20 text-navy rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all resize-none"
                    placeholder="Tell us about your event..."
                  />
                </div>
                <button type="submit" className="w-full bg-navy text-cream py-4 rounded-lg font-semibold hover:bg-navy-light transition-colors">
                  {t.contact.form.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      </main>

      {/* Footer */}
      <footer className="relative z-[120] bg-navy-dark py-8 border-t border-gold/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
            </div>
            <p className="text-cream/50 text-sm text-center">
              {t.footer.copyright}
            </p>
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="text-cream/50 hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="text-cream/50 hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Deli Items with Parallax */}
      <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden hidden lg:block">
        {[
          { src: '/deli-sausage.png', left: '3%', top: '15%', size: 70, speed: '0.3' },
          { src: '/deli-cheese.png', right: '5%', top: '25%', size: 60, speed: '0.4' },
          { src: '/deli-bread.png', left: '5%', top: '45%', size: 65, speed: '0.35' },
          { src: '/deli-pepper.png', right: '3%', top: '55%', size: 50, speed: '0.45' },
          { src: '/deli-pierogi.png', left: '8%', top: '70%', size: 55, speed: '0.25' },
          { src: '/deli-dill.png', right: '8%', top: '75%', size: 45, speed: '0.5' },
          { src: '/deli-mustard.png', left: '2%', top: '85%', size: 40, speed: '0.3' },
          { src: '/deli-salami.png', right: '6%', top: '88%', size: 55, speed: '0.4' },
        ].map((item, i) => (
          <img
            key={i}
            src={item.src}
            alt=""
            data-speed={item.speed}
            className="floating-item absolute opacity-30"
            style={{
              left: item.left,
              right: item.right,
              top: item.top,
              width: item.size,
              height: 'auto',
            }}
          />
        ))}
      </div>

      {/* Mobile Call Button */}
      <a 
        href="tel:732-279-3999"
        className="fixed bottom-6 right-6 z-[130] bg-gold text-navy p-4 rounded-full shadow-xl hover:bg-gold-light transition-all hover:scale-110 lg:hidden"
      >
        <Phone size={24} />
      </a>
    </div>
  );
}

export default App;
