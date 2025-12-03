import heroImage from '../assets/images/hero.png';
import revealImage from '../assets/images/reveal.png';
import detailImage from '../assets/images/detail.png';

export interface Product {
    name: string;
    price: number;
    image: string;
    category: string;
}

export const products: Product[] = [
    {
        name: 'Signature Hoodie',
        price: 299,
        image: heroImage,
        category: 'NEW'
    },
    {
        name: 'Trench Coat',
        price: 499,
        image: revealImage,
        category: 'TRENDING'
    },
    {
        name: 'Tailored Trousers',
        price: 249,
        image: detailImage,
        category: 'NEW'
    },
    {
        name: 'Cotton Tee',
        price: 149,
        image: 'https://picsum.photos/400/600?random=04',
        category: 'CLASSIC'
    },
    {
        name: 'Bomber Jacket',
        price: 399,
        image: 'https://picsum.photos/400/600?random=05',
        category: 'LIMITED'
    },
    {
        name: 'Cashmere Sweater',
        price: 279,
        image: 'https://picsum.photos/400/600?random=06',
        category: 'NEW'
    },
    {
        name: 'Wool Coat',
        price: 599,
        image: 'https://picsum.photos/400/600?random=07',
        category: 'PREMIUM'
    },
    {
        name: 'Silk Blouse',
        price: 189,
        image: 'https://picsum.photos/400/600?random=08',
        category: 'NEW'
    },
    {
        name: 'Denim Jacket',
        price: 329,
        image: 'https://picsum.photos/400/600?random=09',
        category: 'CLASSIC'
    },
    {
        name: 'Leather Boots',
        price: 449,
        image: 'https://picsum.photos/400/600?random=10',
        category: 'LIMITED'
    },
];
