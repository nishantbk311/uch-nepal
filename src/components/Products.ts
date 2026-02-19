import  { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Fine Diamond Stole 100% Cashmere',
    category: 'Shawl',
    price: 150.00,
    image: '/images/home/item1/01.jpeg',
    additionalImages: [
     '/images/home/item1/02.jpeg',
     '/images/home/item1/03.jpeg',
     '/images/home/item1/04.jpeg',
     '/images/home/item1/05.jpeg',
    ],
    description: 'A blend of silk and organic bamboo, offering unmatched drape. Hand-loom woven by master artisans in the valley.',
    colors: ['red', 'gray'],
    sizes: ['OS'],
    weight: '120gms',
    dimensions: '70cm x 200cm'
  },
  {
    id: '2',
    name: '100% Green Pigeon Pashmina Printed',
    category: 'Shawl',
    price: 124.00,
    image: '/images/home/item2/01.jpeg',
    additionalImages: [
     '/images/home/item2/02.jpeg',
     '/images/home/item2/03.jpeg',
    ],
    description: 'Hand-woven with golden bamboo threads that catch the morning light perfectly.',
    colors: ['#1C2832','#ACCFBC'],
    sizes: ['OS'],
    weight: '150gms',
    dimensions: '75cm x 210cm'
  },
  {
    id: '3',
    name: '100% Pashmina Printed Stole',
    category: 'Stole',
    price: 124.00,
    image: '/images/home/item3/01.jpeg',
    additionalImages: [
     '/images/home/item3/02.jpeg',
     '/images/home/item3/03.jpeg',
    ],
    description: 'Narrow elegant stole naturally dyed with wild mountain flower petals.',
    colors: ['#F2BA85', '#375898'],
    sizes: ['S', 'M'],
    weight: '80gms',
    dimensions: '50cm x 180cm'
  },
  {
    id: '4',
    name: '100% Pashmina Printed Stole',
    category: 'Stole',
    price: 124.00,
   image: '/images/home/item4/01.jpeg',
    additionalImages: [
     '/images/home/item4/02.jpeg',
    ],
    description: 'Deep indigo saturation with a formal sheen. Perfect for evening occasions.',
    colors: ['#468DC7', '#705C5E'],
    sizes: ['M', 'L'],
    weight: '90gms',
    dimensions: '50cm x 180cm'
  }
];
