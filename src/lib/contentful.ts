import { createClient, Entry, EntrySkeletonType } from 'contentful';

// ランタイムでクライアントを取得する関数
function getContentfulClient() {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  if (!space || !accessToken) {
    console.error('Contentful credentials missing:', {
      space: !!space,
      accessToken: !!accessToken,
    });
    throw new Error('Contentful credentials are not configured');
  }

  return createClient({
    space,
    accessToken,
  });
}

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

export async function getAllProducts(limit = 6): Promise<Product[]> {
  try {
    const client = getContentfulClient();
    console.log('Fetching products from Contentful...');
    console.log('Space ID configured:', !!process.env.CONTENTFUL_SPACE_ID);
    console.log('Access Token configured:', !!process.env.CONTENTFUL_ACCESS_TOKEN);

    const entries = await client.getEntries<ProductSkeleton>({
      content_type: 'product',
      limit,
      order: ['-sys.createdAt'],
    });
    console.log(`Fetched ${entries.items.length} products.`);
    return entries.items;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const client = getContentfulClient();
    const response = await client.getEntries<ProductSkeleton>({
      content_type: 'product',
      'fields.slug': slug,
      limit: 1,
    } as any);

    return response.items[0] || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const response = await getContentfulClient().getEntries<ProductSkeleton>({
    content_type: 'product',
    'fields.category': category,
    order: ['-fields.publishedDate'] as any,
  } as any);

  return response.items;
}

// 関連商品を取得（同カテゴリー + 価格帯が近い商品）
export async function getRelatedProducts(
  currentProductId: string,
  category: string,
  price: number,
  limit = 5
): Promise<Product[]> {
  try {
    const client = getContentfulClient();

    // 同カテゴリーの商品を取得
    const entries = await client.getEntries<ProductSkeleton>({
      content_type: 'product',
      'fields.category': category,
      limit: 20, // 多めに取得してフィルタリング
    } as any);

    // 現在の商品を除外し、価格が近い順にソート
    const relatedProducts = entries.items
      .filter((item) => item.sys.id !== currentProductId)
      .map((item) => ({
        product: item,
        priceDiff: Math.abs((item.fields.price as number) - price),
      }))
      .sort((a, b) => a.priceDiff - b.priceDiff)
      .slice(0, limit)
      .map((item) => item.product);

    return relatedProducts;
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}
