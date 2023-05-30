import { useState } from 'react';
import { Container, Divider, Flex, Input, Card, CardBody, CardFooter, Image, Heading, Badge } from '@chakra-ui/react'


export const RecipeListPage = ({ recipes, setSelectedRecipe }) => {
  const [searchParam, setSearchParam] = useState('');
  
  const searchResults = (event) => {
    setSearchParam(event.target.value);
  };

  return (
    <Container maxW='1024px' mt={'24px'}>
      <Input type="text" onChange={searchResults} placeholder="Search..." mb={'24px'} />

      <Flex flexDirection={{ base: 'column', md: 'row' }} flexWrap={'wrap'} justifyContent={'space-between'}>
        {recipes.filter(({recipe}) => {
          // No filter is given
          if (!searchParam) return true;

          // Check if search parameter is part of the name
          if (recipe.label.toLowerCase().includes(searchParam.toLowerCase())) {
            return true;
          }

          // Check if search parameter is part of the healthLabels
          if (recipe.healthLabels.find((label) => {
            return label.toLowerCase().includes(searchParam.toLowerCase())
          })) {
            return true;
          }

          return false;
        }).map(({ recipe }) => (
          <Card key={recipe.label} onClick={() => setSelectedRecipe(recipe.label)} w={{ base: '100%', md: '30%' }} mb={'24px'}>
            <CardBody>
              <Image 
                src={recipe.image} 
                alt={recipe.label} 
                objectFit='cover'
                width={'100%'}
                maxH={'200px'}
                borderRadius={'lg'} 
                mb={'12px'}
              />
              
              <Heading as="h2" size="md" mb={'12px'}>{recipe.label}</Heading>

              {recipe.mealType && recipe.mealType.map((mealType) => (
                <Heading as="h3" size="xs" mb={'12px'} key={mealType}>
                  {mealType.toUpperCase()} | {recipe.dishType && recipe.dishType.map((dishType) => dishType)}
                </Heading>
              ))}

              <Flex flexDirection={'row'} gap={'8px'} flexWrap={'wrap'} mb={'18px'}>
                {recipe.dietLabels && recipe.dietLabels.map((diet) => <Badge colorScheme={'green'} key={diet}>{diet}</Badge>)}
                {recipe.cautions && recipe.cautions.map((caution) => <Badge variant={'subtle'} colorScheme={'orange'} key={caution}>{caution}</Badge>)}
              </Flex>
            </CardBody>

            <Divider />

            <CardFooter>
              {recipe.healthLabels && (
                  <Flex flexDirection={'row'} gap={'8px'} flexWrap={'wrap'}>
                    {recipe.healthLabels.find((label) => label === 'Vegetarian') && (
                      <Badge colorScheme={'green'}>vegetarian</Badge>
                    )}

                    {recipe.healthLabels.find((label) => label === 'Vegan') && (
                      <Badge colorScheme={'green'}>vegan</Badge>
                    )}
                  </Flex>
              )}
            </CardFooter>
          </Card>
        ))}
      </Flex>
    </Container>
  );
};
