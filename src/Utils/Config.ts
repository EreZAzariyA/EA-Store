abstract class Config {
      public urls = {
            auth: {
                  login: "",
                  register: ""
            },
            admin: {
                  users: {
                        allUsersUrl: "",
                  },
                  products: {
                        addProductUrl: "",
                        addCategoryUrl: "",
                        deleteProductUrl: ""
                  }
            },
            products: {
                  categories: {
                        allCategoriesUrl: "",
                        oneCategoryUrl: "",
                        allSubCategories: "",
                        subCategoriesByCategoryIdUrl: ""
                  },
                  products: {
                        allProductsUrl: "",
                        productsByCategoryIdUrl: "",
                        oneProductUrl: "",
                        productsBySubCategoryIdUrl: ""
                  }
            },
            shoppingCart: {
                  get: {
                        userCartByUserIdUrl: "",
                        allItemsInCartByUserIdUrl: "",
                  },
                  post: {
                        addItemIntoCartUrl: "",
                        createNewShoppingCartUrl: ""
                  },
                  delete: {
                        deleteItemFromCartUrl: ""
                  }

            }
      }

      public constructor(baseUrl: string) {
            this.urls = {
                  auth: {
                        login: baseUrl + "auth/login/",
                        register: baseUrl + "auth/register/"
                  },
                  admin: {
                        users: {
                              allUsersUrl: baseUrl + "users/",
                        },
                        products: {
                              addProductUrl: baseUrl + "products/",
                              addCategoryUrl: baseUrl + "categories/",
                              deleteProductUrl: baseUrl + "products/"
                        }
                  },
                  products: {
                        categories: {
                              allCategoriesUrl: baseUrl + "categories/",
                              oneCategoryUrl: baseUrl + "category/",
                              allSubCategories: baseUrl + "categories/all-sub-categories/",
                              subCategoriesByCategoryIdUrl: baseUrl + "categories/sub-categories-by-category-id/"
                        },
                        products: {
                              allProductsUrl: baseUrl + "products/",
                              productsByCategoryIdUrl: baseUrl + "products/products-by-category-id/",
                              oneProductUrl: baseUrl + "product/",
                              productsBySubCategoryIdUrl: baseUrl + "products/products-by-sub-category-id/"
                        }
                  },
                  shoppingCart: {
                        get: {
                              userCartByUserIdUrl: baseUrl + "cart/user-cart/",
                              allItemsInCartByUserIdUrl: baseUrl + "cart/user-cart-items/"
                        },
                        post: {
                              addItemIntoCartUrl: baseUrl + "cart/user-cart",
                              createNewShoppingCartUrl: baseUrl + "cart/user-cart/"
                        },
                        delete: {
                              deleteItemFromCartUrl: baseUrl + "cart/"
                        }
                  }

            }
      }
}

class DevelopmentConfig extends Config {
      public constructor() {
            super("https://ec2-52-59-210-97.eu-central-1.compute.amazonaws.com/api/")
      }
}

class ProductionConfig extends Config {
      public constructor() {
            super("https://ec2-52-59-210-97.eu-central-1.compute.amazonaws.com/api/")
      }
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;