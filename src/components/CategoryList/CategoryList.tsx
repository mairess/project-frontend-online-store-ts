import { useEffect } from 'react';
import { getCategories } from '../../services/api';
import { CategoryType } from '../../types';

type CategoryListProps = {
  categoryList: CategoryType[];
  onCategoryListChange: (updatedCategoriesList: CategoryType[]) => void;
};

function CategoryList({ categoryList, onCategoryListChange }: CategoryListProps) {
  // const [categoriesList, setCategoriesList] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      if (Array.isArray(categoriesData)) {
        const categoriesDataWithSelection = categoriesData
          .map((category: CategoryType) => (
            {
              ...category,
              selected: false,
            }
          ));
        onCategoryListChange(categoriesDataWithSelection);
      } else {
        console.error('categoriesData is not an array');
      }
    };
    fetchCategories();
  }, []);

  function handleChange(index: number) {
    const updatedCategories = categoryList.map((category, idx) => (
      {
        ...category,
        selected: idx === index,
      }
    ));
    // alteração efetuada para somente um único item da lista seja true e esteja marcado na lista
    // const updatedCategories = [...categoriesList];
    // updatedCategories[index].selected = !updatedCategories[index].selected;
    onCategoryListChange(updatedCategories);
  }

  return (
    <aside>
      <ul>
        {categoryList.map((category, index) => (
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
