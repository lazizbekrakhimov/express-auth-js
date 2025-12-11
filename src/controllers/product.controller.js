import Product from '../schemas/product.schema.js';
import { BaseController } from './base.controller.js';

class ProductController extends BaseController {
}

export default new ProductController(Product, 'category');