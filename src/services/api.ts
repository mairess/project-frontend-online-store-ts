export async function getCategories() {
  const CATEGORY_API = 'https://api.mercadolibre.com/sites/MLB/categories';
  try {
    const getData = await fetch(CATEGORY_API);
    const categoryData = await getData.json();
    return categoryData;
  } catch (error) {
    console.error(error);
  }
}

export async function
getProductsFromCategoryAndQuery(query: string, categoryId?: string) {
  try {
    const SEARCH_PRODUCT_API = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
    const getData = await fetch(SEARCH_PRODUCT_API);
    const products = await getData.json();
    return products;
  } catch (error) {
    console.error(error);
  }
}

// Esta implementação específica não é avaliada, mas pode ajudar você 🙂
// Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
export async function getProductById(productId: string) {
  try {
    const PRODUCT_DETAILS_API = `https://api.mercadolibre.com/items/${productId}`;
    const getData = await fetch(PRODUCT_DETAILS_API);
    const details = await getData.json();
    return details;
  } catch (error) {
    console.error(error);
  }
}
