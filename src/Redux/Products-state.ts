import CategoryModel from "../Models/Category-Model";
import ProductModel from "../Models/Product-Model";
import SubCategoryModel from "../Models/sub-category-model";

export class ProductsState {
      public products: ProductModel[] = [];
      public categories: CategoryModel[] = [];
      public subCategories: SubCategoryModel[] = [];

}

export enum ProductsActionType {
      FetchProducts = "FetchProducts",
      AddProduct = "AddProduct",
      RemoveProduct = "RemoveProduct",
      FetchCategories = "FetchCategories",
      AddCategory = "AddCategory",
      FetchSubCategories = "FetchSubCategories",
}

export interface ProductsAction {
      type: ProductsActionType;
      payload?: any;
}

export function fetchAllProductsAction(products: ProductModel[]): ProductsAction {
      return { type: ProductsActionType.FetchProducts, payload: products };
}
export function addProductAction(product: ProductModel): ProductsAction {
      return { type: ProductsActionType.AddProduct, payload: product };
}
export function removeProductAction(productIdToDelete: string): ProductsAction {
      return { type: ProductsActionType.RemoveProduct, payload: productIdToDelete };
}

export function fetchAllCategoriesAction(categories: CategoryModel[]): ProductsAction {
      return { type: ProductsActionType.FetchCategories, payload: categories };
}
export function addCategory(category: CategoryModel): ProductsAction {
      return { type: ProductsActionType.AddCategory, payload: category };
}

export function fetchAllSubCategoriesAction(subCategories: SubCategoryModel[]): ProductsAction {
      return { type: ProductsActionType.FetchSubCategories, payload: subCategories };
}

export function ProductReducer(currentProductsState: ProductsState = new ProductsState(), action: ProductsAction): ProductsState {

      const newProductsState = { ...currentProductsState };

      switch (action.type) {
            case ProductsActionType.FetchProducts:
                  newProductsState.products = action.payload;
                  break;

            case ProductsActionType.FetchCategories:
                  newProductsState.categories = action.payload;
                  break;

            case ProductsActionType.FetchSubCategories:
                  newProductsState.subCategories = action.payload;
                  break

            case ProductsActionType.AddProduct:
                  newProductsState.products.push(action.payload);
                  break;

            case ProductsActionType.RemoveProduct:
                  const newList = newProductsState.products.filter(p => p.productId !== action.payload);
                  newProductsState.products = newList;
                  break;

            case ProductsActionType.AddCategory:
                  newProductsState.categories.push(action.payload);
                  break;
      }

      return newProductsState;

}