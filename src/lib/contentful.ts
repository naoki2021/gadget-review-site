import { createClient } from 'contentful';

const space = process.env.CONTENTFUL_SPACE_ID!;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN!;

export const contentfulClient = createClient({
  space,
  accessToken,
});

export interface Product {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
    category: string;
    brand: string;
    price: number;
    rakutenUrl: string;
    amazonUrl?: string;
    mainImage: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    specs: any;
    rating: number;
    reviewContent: any;
    pros: string[];
    cons: string[];
    publishedDate: string;
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const response = await contentfulClient.getEntries<Product['fields']>({
    content_type: 'product',
    order: ['-fields.publishedDate'],
  });

  return response.items as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const response = await contentfulClient.getEntries<Product['fields']>({
    content_type: 'product',
    'fields.slug': slug,
    limit: 1,
  });

  if (response.items.length === 0) {
    return null;
  }

  return response.items[0] as Product;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const response = await contentfulClient.getEntries<Product['fields']>({
    content_type: 'product',
    'fields.category': category,
    order: ['-fields.publishedDate'],
  });

  return response.items as Product[];
}
