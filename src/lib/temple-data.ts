import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export type Temple = {
  id: string;
  slug: string;
  name: string;
  location: string;
  shortDescription: string;
  description: string;
  history: string;
  timings: string;
  image: ImagePlaceholder;
  mapImage: ImagePlaceholder;
  highlights: string;
  howToReach: string;
  touristTips: string;
};

function findImage(id: string): ImagePlaceholder {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    throw new Error(`Image with id "${id}" not found.`);
  }
  return image;
}

export const temples: Temple[] = [
  {
    id: '1',
    slug: 'somnath',
    name: 'Somnath Temple',
    location: 'Prabhas Patan, Gujarat',
    shortDescription: 'The first among the twelve Jyotirlinga shrines of Shiva.',
    description: 'Somnath Temple, located in Prabhas Patan near Veraval in Saurashtra on the western coast of Gujarat, is believed to be the first among the twelve Jyotirlinga shrines of Shiva. It is an important pilgrimage and tourist spot of Gujarat.',
    history: 'The site of Somnath has been a pilgrimage site from ancient times on account of being a Triveni sangam (the confluence of three rivers: Kapila, Hiran and Sarasvati). The temple has been destroyed and rebuilt several times in the past, a testament to its resilience and importance.',
    timings: 'Darshan: 6:00 AM - 9:30 PM | Aarti: 7:00 AM, 12:00 PM, 7:00 PM',
    image: findImage('somnath-temple'),
    mapImage: findImage('somnath-map'),
    highlights: 'The grand evening Aarti with light and sound show, the Triveni Sangam ghat, and the beautiful seaside location are major attractions.',
    howToReach: 'Nearest railway station is Veraval (7 km). Nearest airport is in Diu (80 km). Regular state transport buses are available from major cities.',
    touristTips: 'Dress modestly. Photography is prohibited inside the temple. Mobile phones must be deposited at the locker facility before entering.',
  },
  {
    id: '2',
    slug: 'dwarka',
    name: 'Dwarkadhish Temple',
    location: 'Dwarka, Gujarat',
    shortDescription: 'A Hindu temple dedicated to Lord Krishna.',
    description: 'The Dwarkadhish temple, also known as the Jagat Mandir, is a Hindu temple dedicated to Lord Krishna, who is worshipped here by the name Dwarkadhish, or "King of Dwarka". The temple is located at Dwarka, Gujarat, which is one of the destinations of the Char Dham, a Hindu pilgrimage circuit.',
    history: 'The main temple at Dwarka is believed to have been originally built by Vajranabha, the great-grandson of Krishna, over the hari-griha (Lord Krishna\'s residential place). The current structure was erected in the 16th century.',
    timings: 'Darshan: 6:30 AM - 1:00 PM & 5:00 PM - 9:30 PM',
    image: findImage('dwarka-temple'),
    mapImage: findImage('dwarka-map'),
    highlights: 'The 5-story temple building supported by 72 pillars, the Gomti Ghat, and the flag changing ceremony are key attractions.',
    howToReach: 'Dwarka has its own railway station. The nearest airport is in Jamnagar (137 km). It is well-connected by road to other cities in Gujarat.',
    touristTips: 'Take a holy dip in the Gomti river. Visit Bet Dwarka and Nageshwar Jyotirlinga temple nearby. Be aware of the temple timings as it closes in the afternoon.',
  },
  {
    id: '3',
    slug: 'ambaji',
    name: 'Ambaji Temple',
    location: 'Ambaji, Gujarat',
    shortDescription: 'One of the 51 Shakti Peethas in India.',
    description: 'Ambaji is a major Hindu pilgrimage site in Gujarat, India. It is one of the 51 Shakti Peethas. It is believed that the heart of Sati Devi has fallen here. The original temple is on the Gabbar hilltop in the town.',
    history: 'The Ambaji temple is a revered shrine. There is no idol in the temple, but a "Vishwa Yantra" which is worshipped. The temple has a golden dome and is a fine example of traditional architecture.',
    timings: 'Darshan: 7:00 AM - 11:30 AM, 12:30 PM - 4:30 PM, 6:30 PM - 9:00 PM',
    image: findImage('ambaji-temple'),
    mapImage: findImage('ambaji-map'),
    highlights: 'The Gabbar Hill ropeway, the Kumbhariya Jain temples, and the vibrant Bhadarvi Poonam fair are major attractions.',
    howToReach: 'The nearest railway station is Abu Road (20 km). The nearest airport is in Ahmedabad (187 km). It is well connected by state transport buses.',
    touristTips: 'The Bhadarvi Poonam fair in September attracts millions of devotees, plan accordingly. The ropeway to Gabbar Hill offers panoramic views.',
  },
  {
    id: '4',
    slug: 'pavagadh',
    name: 'Kalika Mata Temple, Pavagadh',
    location: 'Pavagadh, Gujarat',
    shortDescription: 'A Hindu goddess temple complex on Pavagadh Hill.',
    description: 'The Kalika Mata Temple at Pavagadh is a Hindu goddess temple complex and pilgrimage centre located on the summit of Pavagadh Hill in Panchmahal district, Gujarat. The temple is the site of one of the 51 Shakti Peethas.',
    history: 'This temple is believed to date from the 10th-11th centuries. It has three images of goddesses: the central image is of Kalika Mata, flanked by Kali on the right and Bahucharamata on the left. The temple was recently redeveloped with a new spire and facilities.',
    timings: 'Darshan: 5:00 AM - 7:00 PM',
    image: findImage('pavagadh-temple'),
    mapImage: findImage('pavagadh-map'),
    highlights: 'The ropeway journey up the hill, the historical ruins of Champaner-Pavagadh Archaeological Park (a UNESCO World Heritage Site), and the scenic views.',
    howToReach: 'The nearest railway station is Champaner Road (8 km). The nearest major city is Vadodara (50 km), which has an airport and major railway station.',
    touristTips: 'Be prepared for a climb, either by steps or by using the ropeway. The area is a UNESCO World Heritage site, so allow time to explore the archaeological park.',
  },
];
