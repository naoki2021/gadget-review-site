import { createClient, Entry, EntrySkeletonType } from 'contentful';

const space = process.env.CONTENTFUL_SPACE_ID!;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN!;

export const contentfulClient = createClient({
  space,
  accessToken,
});

// Contentful EntrySkeletonTypeに準拠した型定義
export interface ProductFields {
  title: string;
  slug: string;
  category: string;
  brand?: string;
  price: number;
  rakutenUrl: string;
  amazonUrl?: string;
  mainImage?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  specs?: any;
  rating?: number;
  reviewContent?: any;
  pros?: string[];
  cons?: string[];
  publishedDate: string;
}

export interface ProductSkeleton extends EntrySkeletonType {
  contentTypeId: 'product';
  fields: ProductFields;
}

export type Product = Entry<ProductSkeleton, undefined, string>;

export async function getAllProducts(): Promise<Product[]> {
  const response = await contentfulClient.getEntries<ProductSkeleton>({
    content_type: 'product',
    order: ['-fields.publishedDate'] as any,
  });

  return response.items;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const response = await contentfulClient.getEntries<ProductSkeleton>({
    content_type: 'product',
    'fields.slug': slug,
    limit: 1,
  } as any);

  if (response.items.length === 0) {
    return null;
  }

  return response.items[0];
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const response = await contentfulClient.getEntries<ProductSkeleton>({
    content_type: 'product',
    'fields.category': category,
    order: ['-fields.publishedDate'] as any,
  } as any);

  return response.items;
}
