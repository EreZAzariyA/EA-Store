import axios from "axios";
import CategoryModel from "../Models/Category-Model";
import ProductModel from "../Models/Product-Model";
import SubCategoryModel from "../Models/sub-category-model";
import { fetchAllCategoriesAction, fetchAllProductsAction, fetchAllSubCategoriesAction } from "../Redux/Products-state";
import { productsStore } from "../Redux/Store";
import config from "../Utils/Config";

class ProductsServices {
      public async getAllCategories(): Promise<CategoryModel[]> {
            if (productsStore.getState().categories.length === 0) {
                  const response = await axios.get<CategoryModel[]>(config.urls.products.categories.allCategoriesUrl);
                  const categories = response.data;
                  productsStore.dispatch(fetchAllCategoriesAction(categories));
                  return categories;
            }
            const categories = productsStore.getState().categories;
            return categories;
      }

      public async getOneCategory(categoryId: string): Promise<CategoryModel> {
            if (productsStore.getState().categories.length === 0) {

                  const response = await axios.get<CategoryModel>(config.urls.products.categories.oneCategoryUrl + categoryId);
                  const category = response.data;
                  return category;
            }
            const category = productsStore.getState().categories.find(c => c.categoryId === categoryId);
            return category;
      }

      public async getSubCategoriesByCategoryId(categoryId: string): Promise<SubCategoryModel[]> {
            const response = await axios.get<SubCategoryModel[]>(config.urls.products.categories.subCategoriesByCategoryIdUrl + categoryId);
            const subCategories = response.data;
            return subCategories;

      }

      public async getAllSubCategories(): Promise<SubCategoryModel[]> {
            if (productsStore.getState().subCategories.length === 0) {
                  const response = await axios.get<SubCategoryModel[]>(config.urls.products.categories.allSubCategories);
                  const subCategories = response.data;
                  productsStore.dispatch(fetchAllSubCategoriesAction(subCategories));
                  return subCategories;
            }
            const subCategories = productsStore.getState().subCategories;
            return subCategories;
      }

      public async getAllProducts(): Promise<ProductModel[]> {
            if (productsStore.getState().products.length === 0) {
                  const response = await axios.get<ProductModel[]>(config.urls.products.products.allProductsUrl);
                  const products = response.data;
                  productsStore.dispatch(fetchAllProductsAction(products));
                  return products;
            }
            const products = productsStore.getState().products;
            return products
      }

      public async getOneProduct(productId: string): Promise<ProductModel> {
            if (productsStore.getState().products?.length === 0) {
                  const response = await axios.get<ProductModel>(config.urls.products.products.oneProductUrl + productId);
                  const product = response.data;
                  return product;
            }
            const product = productsStore.getState().products?.find(p => p.productId === productId);
            return product;
      }

      public async getProductsByCategoryId(categoryId: string): Promise<ProductModel[]> {
            if (productsStore.getState().products.length === 0) {
                  const response = await axios.get<ProductModel[]>(config.urls.products.products.productsByCategoryIdUrl + categoryId);
                  const products = response.data;
                  return products;
            }
            const products = productsStore.getState().products.filter(p => p.categoryId === categoryId);
            return products;
      }

      public async getProductsBySubCategoryId(subCategoryId: string): Promise<ProductModel[]> {
            if (productsStore.getState().products.length === 0) {
                  const response = await axios.get<ProductModel[]>(config.urls.products.products.productsBySubCategoryIdUrl + subCategoryId);
                  const products = response.data;
                  return products;
            }
            const products = productsStore.getState().products?.filter(p => p.subCategoryId === subCategoryId);
            return products
      }


}

const productsServices = new ProductsServices();
export default productsServices;