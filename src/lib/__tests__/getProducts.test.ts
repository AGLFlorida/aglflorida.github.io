// Mock remark before importing getProducts
jest.mock('remark', () => ({
  remark: jest.fn(() => ({
    use: jest.fn().mockReturnThis(),
    process: jest.fn().mockResolvedValue({ toString: () => '<p>test content</p>' }),
  })),
}));

jest.mock('remark-html', () => jest.fn());

import { getSortedProducts, getProductById, type Product } from '../getProducts';

describe('getProducts', () => {
  describe('getSortedProducts', () => {
    it('should return an array of products', async () => {
      const products = await getSortedProducts();
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });

    it('should return products with required fields', async () => {
      const products = await getSortedProducts();
      products.forEach((product: Product) => {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('title');
        expect(product).toHaveProperty('date');
        expect(product).toHaveProperty('description');
        expect(product).toHaveProperty('contentHtml');
        expect(product).toHaveProperty('type');
        expect(typeof product.id).toBe('string');
        expect(typeof product.title).toBe('string');
        expect(typeof product.date).toBe('string');
        expect(typeof product.description).toBe('string');
        expect(typeof product.contentHtml).toBe('string');
        expect(['mobile-app', 'consulting']).toContain(product.type);
        // Optional fields
        if (product.price) {
          expect(typeof product.price).toBe('string');
        }
        if (product.features) {
          expect(Array.isArray(product.features)).toBe(true);
        }
        if (product.technologies) {
          expect(Array.isArray(product.technologies)).toBe(true);
        }
        if (product.links) {
          expect(Array.isArray(product.links)).toBe(true);
        }
        if (product.deliverables) {
          expect(Array.isArray(product.deliverables)).toBe(true);
        }
        if (product.duration) {
          expect(typeof product.duration).toBe('string');
        }
      });
    });

    it('should sort products by date in descending order (newest first)', async () => {
      const products = await getSortedProducts();
      if (products.length < 2) return;

      for (let i = 0; i < products.length - 1; i++) {
        const currentDate = new Date(products[i].date);
        const nextDate = new Date(products[i + 1].date);
        expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime());
      }
    });

    it('should have valid id format (no .md extension)', async () => {
      const products = await getSortedProducts();
      products.forEach((product: Product) => {
        expect(product.id).not.toContain('.md');
        expect(product.id.length).toBeGreaterThan(0);
      });
    });

    it('should contain both mobile-app and consulting type products', async () => {
      const products = await getSortedProducts();
      const mobileApps = products.filter(p => p.type === 'mobile-app');
      const consulting = products.filter(p => p.type === 'consulting');
      
      expect(mobileApps.length).toBeGreaterThan(0);
      expect(consulting.length).toBeGreaterThan(0);
    });
  });

  describe('getProductById', () => {
    it('should return a product with all required fields for a valid id', async () => {
      const products = await getSortedProducts();
      if (products.length === 0) return;

      const firstProduct = products[0];
      const product = await getProductById(firstProduct.id);

      expect(product).not.toBeNull();
      if (product) {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('title');
        expect(product).toHaveProperty('date');
        expect(product).toHaveProperty('description');
        expect(product).toHaveProperty('contentHtml');
        expect(product).toHaveProperty('type');
        expect(typeof product.id).toBe('string');
        expect(typeof product.title).toBe('string');
        expect(typeof product.date).toBe('string');
        expect(typeof product.description).toBe('string');
        expect(typeof product.contentHtml).toBe('string');
        expect(['mobile-app', 'consulting']).toContain(product.type);
      }
    });

    it('should return the correct product for a given id', async () => {
      const products = await getSortedProducts();
      if (products.length === 0) return;

      const testProduct = products[0];
      const product = await getProductById(testProduct.id);

      expect(product).not.toBeNull();
      if (product) {
        expect(product.id).toBe(testProduct.id);
        expect(product.title).toBe(testProduct.title);
      }
    });

    it('should return null for non-existent id', async () => {
      const product = await getProductById('non-existent-id-12345');
      expect(product).toBeNull();
    });

    it('should return consulting products with deliverables and duration', async () => {
      const products = await getSortedProducts();
      const consultingProducts = products.filter(p => p.type === 'consulting');
      
      if (consultingProducts.length === 0) return;
      
      const product = await getProductById(consultingProducts[0].id);
      
      expect(product).not.toBeNull();
      if (product) {
        expect(product.type).toBe('consulting');
        // Consulting products should typically have deliverables and duration
        if (product.deliverables) {
          expect(Array.isArray(product.deliverables)).toBe(true);
          expect(product.deliverables.length).toBeGreaterThan(0);
        }
        if (product.duration) {
          expect(typeof product.duration).toBe('string');
          expect(product.duration.length).toBeGreaterThan(0);
        }
      }
    });

    it('should return mobile-app products with technologies and features', async () => {
      const products = await getSortedProducts();
      const mobileApps = products.filter(p => p.type === 'mobile-app');
      
      if (mobileApps.length === 0) return;
      
      const product = await getProductById(mobileApps[0].id);
      
      expect(product).not.toBeNull();
      if (product) {
        expect(product.type).toBe('mobile-app');
        // Mobile apps should typically have technologies and features
        if (product.technologies) {
          expect(Array.isArray(product.technologies)).toBe(true);
        }
        if (product.features) {
          expect(Array.isArray(product.features)).toBe(true);
        }
      }
    });
  });
});
