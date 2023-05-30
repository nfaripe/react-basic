import { data } from './utils/data';
import { useState } from 'react';

import { RecipeListPage } from './pages/RecipeListPage';
import { RecipePage } from './pages/RecipePage';

export const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState('');

  return (
    <div>
      {selectedRecipe ? 
        <RecipePage 
          selectedRecipe={data.hits?.find(({ recipe }) => recipe.label === selectedRecipe)} 
          setSelectedRecipe={setSelectedRecipe}
        /> 
        : 
        <RecipeListPage 
          recipes={data?.hits} 
          setSelectedRecipe={setSelectedRecipe} 
          />
      }
     </div>
  )
}