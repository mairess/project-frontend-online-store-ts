import { useEffect, useState } from 'react';
import { getCategories } from '../../services/api';

type CategoryType = {
  id: string,
  name: string,
  selected: boolean,
};

function CategoryList() {
  const [categoriesList, setCategoriesList] = useState<CategoryType[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const categoriesData = await getCategories();
      const categoriesDataWithSelection = categoriesData.map((category: CategoryType) => (
        {
          ...category,
          selected: false,
        }
      ));
      setCategoriesList(categoriesDataWithSelection);
    }
    fetchCategories();
  }, []);

  function handleChange(index: number) {
    const updatedCategories = [...categoriesList];
    updatedCategories[index].selected = !updatedCategories[index].selected;
    setCategoriesList(updatedCategories);
  }

  console.log(categoriesList);

  return (
    <aside>
      <ul>
        {categoriesList.map((category, index) => (
          <li key={ category.id }>
            <label htmlFor={ category.id } data-testid="category">
              <input
                type="radio"
                id={ category.id }
                checked={ category.selected }
                onChange={ () => handleChange(index) }
              />
              { category.name }
            </label>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default CategoryList;
