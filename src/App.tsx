import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Phone, MapPin, Clock, Facebook, Instagram,
  ChevronDown, Star, Menu, X, Eye,
  ChevronRight, Mail, ChevronLeft, Users
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
      cta: 'View Our Menu',
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
      cta: 'Zobraziť Menu',
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
      cta: 'Zobacz Menu',
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
      cta: 'Menü Megtekintése',
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
      cta: 'Menü Ansehen',
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
    // Small delay to let layout settle before creating ScrollTriggers
    let ctx: gsap.Context;
    const raf = requestAnimationFrame(() => {
    ctx = gsap.context(() => {
      // Hero entrance animation
      const heroTl = gsap.timeline();
      heroTl
        .fromTo('.hero-headline', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
        .fromTo('.hero-headline2', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
        .fromTo('.hero-subheadline', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .fromTo('.hero-tagline', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .fromTo('.hero-cta', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2');

      // Hero floating deli items — scatter outward on scroll
      gsap.utils.toArray<HTMLElement>('.hero-float-item').forEach((item) => {
        const tx = parseFloat(item.dataset.tx || '0');
        const ty = parseFloat(item.dataset.ty || '0');
        const rot = parseFloat(item.dataset.rot || '0');
        gsap.to(item, {
          x: tx,
          y: ty,
          rotation: rot,
          opacity: 0,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
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
            end: '+=100%',
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.5,
            onUpdate: (self) => {
              const progress = self.progress;
              const image = `.${className}-image`;
              const text = `.${className}-text`;

              if (progress <= 0.25) {
                const enterProgress = progress / 0.25;
                gsap.set(image, { x: 50 * (1 - enterProgress) + 'vw', opacity: enterProgress });
                gsap.set(text, { x: -30 * (1 - enterProgress) + 'vw', opacity: enterProgress });
              } else if (progress <= 0.75) {
                gsap.set(image, { x: 0, opacity: 1 });
                gsap.set(text, { x: 0, opacity: 1 });
              } else {
                const exitProgress = (progress - 0.75) / 0.25;
                gsap.set(image, { x: -20 * exitProgress + 'vw', opacity: 1 - exitProgress * 0.8 });
                gsap.set(text, { x: 14 * exitProgress + 'vw', opacity: 1 - exitProgress * 0.8 });
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
          end: '+=100%',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress <= 0.25) {
              const enterProgress = progress / 0.25;
              gsap.set('.catering-header-content', {
                y: 30 * (1 - enterProgress) + 'vh',
                opacity: enterProgress
              });
            } else if (progress <= 0.75) {
              gsap.set('.catering-header-content', { y: 0, opacity: 1 });
            } else {
              const exitProgress = (progress - 0.75) / 0.25;
              gsap.set('.catering-header-content', {
                y: -14 * exitProgress + 'vh',
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
          end: '+=100%',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress <= 0.25) {
              const enterProgress = progress / 0.25;
              gsap.set('.closing-content', {
                y: 35 * (1 - enterProgress) + 'vh',
                opacity: enterProgress
              });
            } else if (progress <= 0.75) {
              gsap.set('.closing-content', { y: 0, opacity: 1 });
            } else {
              const exitProgress = (progress - 0.75) / 0.25;
              gsap.set('.closing-content', {
                opacity: 1 - exitProgress * 0.8
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

      // Refresh after all triggers are set up
      ScrollTrigger.refresh();

    });

    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
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
      <section ref={heroRef} className="min-h-screen h-screen bg-navy relative z-10 overflow-hidden" role="banner">
        <div className="absolute inset-0 wood-texture opacity-15 mix-blend-multiply" />
        <div className="absolute inset-0 paper-grain" />

        {/* Radial glow behind floating items */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-navy/80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Floating 3D Deli Items — scatter outward on scroll */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          {[
            { src: '/deli-pierogi.png', x: '12%', y: '18%', size: 90, tx: -300, ty: -200, rot: -45, delay: 0 },
            { src: '/deli-cheese.png', x: '78%', y: '15%', size: 80, tx: 280, ty: -180, rot: 35, delay: 0.5 },
            { src: '/deli-sausage.png', x: '8%', y: '55%', size: 75, tx: -350, ty: 100, rot: -30, delay: 1 },
            { src: '/deli-bread.png', x: '85%', y: '50%', size: 85, tx: 320, ty: 80, rot: 25, delay: 0.8 },
            { src: '/deli-salami.png', x: '20%', y: '78%', size: 65, tx: -250, ty: 250, rot: -50, delay: 1.2 },
            { src: '/deli-pepper.png', x: '75%', y: '80%', size: 55, tx: 220, ty: 200, rot: 40, delay: 0.3 },
            { src: '/deli-dill.png', x: '50%', y: '12%', size: 50, tx: 0, ty: -300, rot: 20, delay: 0.7 },
            { src: '/deli-mustard.png', x: '45%', y: '82%', size: 55, tx: -80, ty: 280, rot: -15, delay: 1.5 },
          ].map((item, i) => (
            <img
              key={i}
              src={item.src}
              alt=""
              data-tx={item.tx}
              data-ty={item.ty}
              data-rot={item.rot}
              className="hero-float-item absolute opacity-40 drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:opacity-60 transition-opacity"
              style={{
                left: item.x,
                top: item.y,
                width: item.size,
                height: 'auto',
                transform: 'translate(-50%, -50%)',
                animation: `float ${4 + i * 0.3}s ease-in-out ${item.delay}s infinite`,
                filter: 'drop-shadow(0 4px 20px rgba(255,215,0,0.15))',
              }}
            />
          ))}
        </div>

        <div className="relative h-full flex flex-col justify-center items-center px-4 z-10">
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

      {/* Section 2: About Us — warm cream/gold background to break up blue */}
      <section ref={aboutRef} className="relative z-20 bg-cream py-20 sm:py-32">
        <div className="absolute inset-0 paper-grain" />
        {/* Decorative gold accent at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div className="about-content order-2 lg:order-1">
              <span className="text-gold text-sm font-inter font-semibold tracking-widest uppercase mb-4 block">{t.hero.location}</span>
              <h2 className="font-playfair text-navy text-[clamp(32px,5vw,56px)] font-bold mb-4">
                {t.about.title}
              </h2>
              <p className="text-navy/60 text-xl sm:text-2xl font-playfair italic mb-6">
                {t.about.subtitle}
              </p>
              <p className="text-navy/80 text-base sm:text-lg leading-relaxed mb-4">
                {t.about.description}
              </p>
              <p className="text-navy/60 text-base leading-relaxed mb-8">
                {t.about.description2}
              </p>
              <div className="flex items-center gap-3 text-gold-dark">
                <MapPin size={20} />
                <span className="font-medium">{t.about.location}</span>
              </div>
            </div>

            {/* Image Slider */}
            <div className="about-slider order-1 lg:order-2">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-gold/20">
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

      {/* Featured Products Showcase — wooden background */}
      <section className="relative z-25 overflow-hidden">
        {/* Full wooden background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 wood-texture opacity-100" style={{ backgroundSize: '600px' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#3B2315]/92 via-[#2A1A0E]/88 to-[#3B2315]/92" />
        </div>
        <div className="absolute inset-0 paper-grain" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

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

      {/* Section 5: Catering Header — with event background */}
      <section ref={cateringHeaderRef} className={`${isMobile ? 'py-20 sm:py-28' : 'section-pinned'} relative z-50`}>
        {/* Background image — storefront interior */}
        <div className="absolute inset-0">
          <img src="/storefront-2.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/80 backdrop-blur-[2px]" />
        </div>
        <div className="absolute inset-0 wood-texture opacity-8 mix-blend-multiply" />

        <div className={`catering-header-content relative ${isMobile ? '' : 'h-full'} flex flex-col justify-center items-center px-4`}>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-gold text-sm font-inter font-semibold tracking-widest uppercase mb-6 block">
              <Users size={16} className="inline mr-2 -mt-0.5" />
              Parties & Events
            </span>
            <h2 className="font-playfair text-cream text-[clamp(36px,6vw,72px)] font-bold mb-6">
              {t.catering.title}
            </h2>
            <p className="text-cream/70 text-lg sm:text-xl mb-10 max-w-xl mx-auto">
              {t.catering.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/catering-menu.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2"
                aria-label="View catering menu"
              >
                <Eye size={18} />
                {t.catering.cta}
              </a>
              <a
                href="tel:732-279-3999"
                className="btn-gold-solid inline-flex items-center gap-2"
              >
                <Phone size={18} />
                {t.catering.orders.cta}
              </a>
            </div>
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

      {/* Section 8: Reviews — cream background for contrast */}
      <section ref={reviewsRef} className="relative z-[80] bg-cream py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 paper-grain" />
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-gold/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-gold/5 rounded-full blur-[100px]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold-dark text-sm font-inter font-semibold tracking-widest uppercase mb-4 block">Testimonials</span>
            <h2 className="font-playfair text-navy text-[clamp(32px,5vw,56px)] font-bold mb-4">
              {t.reviews.title}
            </h2>
            <p className="text-navy/50 text-lg max-w-lg mx-auto">
              {t.reviews.subtitle}
            </p>
            <div className="w-24 h-1 bg-gold mx-auto mt-6" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.reviews.items.map((review, i) => (
              <div key={i} className="review-card group bg-white rounded-2xl p-6 shadow-lg border border-gold/10 hover:shadow-xl hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                {/* Gold accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Large decorative quote */}
                <div className="absolute -top-2 -right-2 text-gold/8 font-playfair text-[120px] leading-none select-none pointer-events-none">"</div>

                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="text-gold fill-gold" size={16} />
                  ))}
                </div>
                <p className="text-navy/70 text-sm leading-relaxed mb-6 relative z-10">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gold/10">
                  {/* Avatar circle */}
                  <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-gold-dark font-bold text-sm">{review.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-navy font-semibold text-sm">{review.name}</p>
                    <p className="text-navy/40 text-xs">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Closing Scene — enhanced CTA */}
      <section ref={closingRef} className={`${isMobile ? 'py-20 sm:py-28' : 'section-pinned'} relative z-[90]`}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img src="/storefront-1.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/90" />
        </div>
        <div className="absolute inset-0 wood-texture opacity-10 mix-blend-multiply" />

        <div className={`closing-content relative ${isMobile ? '' : 'h-full'} flex flex-col justify-center items-center px-4`}>
          <div className="text-center max-w-3xl mx-auto">
            {/* Decorative frame */}
            <div className="border-2 border-gold/20 rounded-2xl p-8 sm:p-12 backdrop-blur-sm bg-navy/30">
              <span className="text-gold text-sm font-inter font-semibold tracking-widest uppercase mb-4 block">
                Ready to Order?
              </span>
              <h2 className="font-playfair text-cream text-[clamp(28px,4vw,48px)] font-bold mb-2">
                {t.catering.orders.title}
              </h2>
              <div className="w-16 h-0.5 bg-gold mx-auto my-6" />
              <a
                href="tel:732-279-3999"
                className="font-playfair text-gold text-[clamp(28px,6vw,64px)] font-bold block mb-6 hover:text-gold-light transition-colors"
              >
                {t.catering.orders.phone}
              </a>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <a
                  href="tel:732-279-3999"
                  className="btn-gold-solid inline-flex items-center gap-2 text-lg px-10 py-4"
                >
                  <Phone size={20} />
                  {t.catering.orders.cta}
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-cream/50">
                <MapPin size={16} className="text-gold/60" />
                <p className="text-sm sm:text-base">
                  {t.catering.orders.address}
                </p>
              </div>
            </div>
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
          
          {/* Full Menu — opens in new tab preview */}
          <div className="mt-16 text-center">
            <a
              href="/catering-menu.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-navy text-cream font-semibold hover:bg-navy-light transition-colors rounded-lg"
            >
              <Eye size={20} />
              {t.catering.cta}
            </a>
          </div>
        </div>
      </section>

      {/* Section 11: Contact + Form — cream background for contrast */}
      <section ref={contactRef} className="relative z-[110] bg-cream py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 paper-grain" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        {/* Decorative blurs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-navy/5 rounded-full blur-[120px]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-14">
            <span className="text-gold-dark text-sm font-inter font-semibold tracking-widest uppercase mb-4 block">Get In Touch</span>
            <h2 className="font-playfair text-navy text-[clamp(28px,4vw,48px)] font-bold mb-4">
              {t.contact.title}
            </h2>
            <p className="text-navy/50 text-lg max-w-lg mx-auto">
              {t.contact.subtitle}
            </p>
            <div className="w-24 h-1 bg-gold mx-auto mt-6" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              {/* Contact cards */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <a href={`tel:${t.contact.info.phone}`} className="group bg-white rounded-xl p-5 shadow-md border border-gold/10 hover:border-gold/30 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-3 group-hover:bg-gold/20 transition-colors">
                    <Phone className="text-gold" size={22} />
                  </div>
                  <p className="text-navy/40 text-xs font-semibold uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-navy font-semibold group-hover:text-gold-dark transition-colors">{t.contact.info.phone}</p>
                </a>
                <a href={`mailto:${t.contact.info.email}`} className="group bg-white rounded-xl p-5 shadow-md border border-gold/10 hover:border-gold/30 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-3 group-hover:bg-gold/20 transition-colors">
                    <Mail className="text-gold" size={22} />
                  </div>
                  <p className="text-navy/40 text-xs font-semibold uppercase tracking-wider mb-1">Email</p>
                  <p className="text-navy font-semibold group-hover:text-gold-dark transition-colors text-sm">{t.contact.info.email}</p>
                </a>
                <div className="bg-white rounded-xl p-5 shadow-md border border-gold/10">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-3">
                    <MapPin className="text-gold" size={22} />
                  </div>
                  <p className="text-navy/40 text-xs font-semibold uppercase tracking-wider mb-1">Address</p>
                  <p className="text-navy font-semibold text-sm">{t.contact.info.address}</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-md border border-gold/10">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-3">
                    <Clock className="text-gold" size={22} />
                  </div>
                  <p className="text-navy/40 text-xs font-semibold uppercase tracking-wider mb-1">Hours</p>
                  <p className="text-navy font-semibold text-sm">{t.contact.info.hours}</p>
                </div>
              </div>

              {/* Map */}
              <div className="aspect-video bg-navy-light rounded-2xl overflow-hidden border border-gold/15 shadow-lg">
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

            {/* Enhanced Form */}
            <div className="relative">
              <div className="bg-navy rounded-2xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                {/* Gold accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold/60 via-gold to-gold/60" />
                {/* Subtle texture overlay */}
                <div className="absolute inset-0 wood-texture opacity-5 mix-blend-overlay pointer-events-none" />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center">
                      <Mail className="text-gold" size={18} />
                    </div>
                    <h3 className="font-playfair text-cream text-2xl font-bold">
                      {t.contact.title}
                    </h3>
                  </div>
                  <p className="text-cream/40 text-sm mb-8 pl-[52px]">Fill out the form and we'll get back to you within 24 hours.</p>

                  <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert('Thank you! We will contact you within 24 hours.'); }}>
                    <div>
                      <label className="block text-cream/60 text-xs mb-2 font-semibold uppercase tracking-wider">{t.contact.form.name}</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3.5 bg-navy-light/60 border border-gold/15 text-cream rounded-xl focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/15 transition-all placeholder:text-cream/25"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-cream/60 text-xs mb-2 font-semibold uppercase tracking-wider">{t.contact.form.phone}</label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3.5 bg-navy-light/60 border border-gold/15 text-cream rounded-xl focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/15 transition-all placeholder:text-cream/25"
                          placeholder="(732) 000-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-cream/60 text-xs mb-2 font-semibold uppercase tracking-wider">{t.contact.form.email}</label>
                        <input
                          type="email"
                          className="w-full px-4 py-3.5 bg-navy-light/60 border border-gold/15 text-cream rounded-xl focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/15 transition-all placeholder:text-cream/25"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-cream/60 text-xs mb-2 font-semibold uppercase tracking-wider">{t.contact.form.date}</label>
                        <input
                          type="date"
                          className="w-full px-4 py-3.5 bg-navy-light/60 border border-gold/15 text-cream rounded-xl focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/15 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-cream/60 text-xs mb-2 font-semibold uppercase tracking-wider">{t.contact.form.guests}</label>
                        <input
                          type="number"
                          className="w-full px-4 py-3.5 bg-navy-light/60 border border-gold/15 text-cream rounded-xl focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/15 transition-all placeholder:text-cream/25"
                          placeholder="e.g. 25"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-cream/60 text-xs mb-2 font-semibold uppercase tracking-wider">{t.contact.form.message}</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3.5 bg-navy-light/60 border border-gold/15 text-cream rounded-xl focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/15 transition-all resize-none placeholder:text-cream/25"
                        placeholder="Tell us about your event, preferred dishes, dietary needs..."
                      />
                    </div>
                    <button type="submit" className="w-full bg-gold text-navy py-4 rounded-xl font-bold text-base hover:bg-gold-light transition-all shadow-lg shadow-gold/20 hover:shadow-gold/30 hover:-translate-y-0.5 active:translate-y-0">
                      {t.contact.form.submit}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>

      {/* Premium Footer */}
      <footer className="relative z-[120] overflow-hidden">
        {/* Wood texture background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 wood-texture opacity-100" style={{ backgroundSize: '600px' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f08]/95 via-[#1a0f08]/92 to-[#0d0704]/97" />
        </div>
        <div className="absolute inset-0 paper-grain" />
        {/* Gold top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main footer content */}
          <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Brand Column — wider */}
            <div className="md:col-span-5 flex flex-col items-center md:items-start">
              <img src="/logo.png" alt="Gabriela's European Deli" className="h-14 w-auto mb-5" />
              <p className="text-cream/50 text-sm leading-relaxed text-center md:text-left max-w-sm mb-6">
                Authentic European flavors in Toms River, NJ. Serving handmade pierogi, imported cheeses, and traditional dishes since 2009.
              </p>
              {/* Storefront image in footer */}
              <div className="w-full max-w-xs rounded-xl overflow-hidden border border-gold/15 shadow-lg mb-6 hidden md:block">
                <img src="/storefront-1.jpg" alt="Our storefront" className="w-full h-32 object-cover" loading="lazy" />
              </div>
              <div className="flex items-center gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                   className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-cream/50 hover:text-gold hover:bg-gold/20 hover:border-gold/40 transition-all">
                  <Facebook size={18} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                   className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-cream/50 hover:text-gold hover:bg-gold/20 hover:border-gold/40 transition-all">
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 flex flex-col items-center md:items-start">
              <h4 className="text-gold text-xs font-inter font-bold tracking-widest uppercase mb-5">Quick Links</h4>
              <nav className="flex flex-col gap-3.5">
                <button onClick={() => scrollToSection(aboutRef)} className="text-cream/50 hover:text-gold hover:translate-x-1 transition-all text-sm text-center md:text-left flex items-center gap-2">
                  <ChevronRight size={14} className="text-gold/40" />
                  {t.nav.about}
                </button>
                <button onClick={() => scrollToSection(menuRef)} className="text-cream/50 hover:text-gold hover:translate-x-1 transition-all text-sm text-center md:text-left flex items-center gap-2">
                  <ChevronRight size={14} className="text-gold/40" />
                  {t.nav.menu}
                </button>
                <button onClick={() => scrollToSection(reviewsRef)} className="text-cream/50 hover:text-gold hover:translate-x-1 transition-all text-sm text-center md:text-left flex items-center gap-2">
                  <ChevronRight size={14} className="text-gold/40" />
                  {t.nav.reviews}
                </button>
                <button onClick={() => scrollToSection(contactRef)} className="text-cream/50 hover:text-gold hover:translate-x-1 transition-all text-sm text-center md:text-left flex items-center gap-2">
                  <ChevronRight size={14} className="text-gold/40" />
                  {t.nav.catering}
                </button>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start">
              <h4 className="text-gold text-xs font-inter font-bold tracking-widest uppercase mb-5">Visit Us</h4>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="text-gold" size={14} />
                  </div>
                  <span className="text-cream/50 text-sm leading-relaxed">{t.contact.info.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-gold" size={14} />
                  </div>
                  <a href={`tel:${t.contact.info.phone}`} className="text-cream/50 hover:text-gold transition-colors text-sm font-medium">
                    {t.contact.info.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-gold" size={14} />
                  </div>
                  <a href={`mailto:${t.contact.info.email}`} className="text-cream/50 hover:text-gold transition-colors text-sm">
                    {t.contact.info.email}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="text-gold" size={14} />
                  </div>
                  <span className="text-cream/50 text-sm">{t.contact.info.hours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gold/10 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-cream/30 text-xs text-center">
              {t.footer.copyright}
            </p>
            <div className="flex items-center gap-2 text-cream/20 text-xs">
              <MapPin size={12} />
              <span>1825 Hooper Avenue, Toms River, NJ 08753</span>
            </div>
          </div>
        </div>
      </footer>

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
