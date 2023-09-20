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
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      console.log(categoriesData);
      if (Array.isArray(categoriesData)) {
        const categoriesDataWithSelection = categoriesData
          .map((category: CategoryType) => (
            {
              ...category,
              selected: false,
            }
          ));
        setCategoriesList(categoriesDataWithSelection);
      } else {
        console.error('categoriesData is not an array');
      }
    };
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
