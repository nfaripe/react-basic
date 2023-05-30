import { Container, Flex, Box, Image, Heading, Badge, List, ListItem, Text, Button } from '@chakra-ui/react'

export const RecipePage = ({selectedRecipe, setSelectedRecipe}) => {
  const { recipe } = selectedRecipe;

  return (
    <Container maxW={'1024px'} mt={'24px'}>
      <Button colorScheme='teal' size='xs' mb='24px' onClick={() => setSelectedRecipe('')}>Back</Button>

      <Image 
        src={recipe.image} 
        alt={recipe.label} 
        objectFit='cover'
        width='100%'
        maxH='360px'
        borderRadius='lg' 
        mb='48px'
      />

      <Flex flexDirection={{ base: 'column', md: 'row' }} flexWrap='wrap' justifyContent='space-between'>
        <Box flex='2'>
          {recipe.mealType && recipe.mealType.map((mealType) => (
            <Heading as="h3" size="xs" mb={'12px'} key={mealType} color="gray.500">
              {mealType.toUpperCase()} | {recipe.dishType && recipe.dishType.map((dishType) => dishType)}
            </Heading>
          ))}       
          
          <Heading as="h2" size="lg" mb={'12px'}>{recipe.label}</Heading>

          {recipe.totalTime > 0 && <Text>Total cooking time: {recipe.totalTime} min</Text>}
          <Text mb="24px">Servings: {recipe.yield}</Text>

          <Heading as="h3" size="md" mb={'12px'}>Ingredients</Heading>

          <List spacing={3}>
            {recipe.ingredients && recipe.ingredients.map((ingredient) => (
              <ListItem key={ingredient.text}>{ingredient.text}</ListItem>
            ))}
          </List>
        </Box>
        <Box flex='1'>
          {recipe.dietLabels && (
            <>
              <Heading as='h4' mb="12px" size="md">Diet</Heading>
              <Flex flexDirection={'row'} gap={'8px'} flexWrap={'wrap'} mb={'18px'}>
                {recipe.dietLabels && recipe.dietLabels.map((diet) => <Badge colorScheme={'green'} key={diet}>{diet}</Badge>)}
              </Flex>  
            </>
          )}
          
          {recipe.healthLabels.length > 0 && (
            <>
              <Heading as='h4' mb="12px" size="md">Health labels</Heading>
              <Flex flexDirection={'row'} gap={'8px'} flexWrap={'wrap'} mb={'18px'}>
                {recipe.healthLabels && recipe.healthLabels.map((healthLabel) => <Badge variant={'subtle'} colorScheme={'purple'} key={healthLabel}>{healthLabel}</Badge>)}
              </Flex>  
            </>
          )}
          
          {recipe.cautions.length > 0 && (
            <>
              <Heading as='h4' mb="12px" size="md">Cautions</Heading>
              <Flex flexDirection={'row'} gap={'8px'} flexWrap={'wrap'} mb={'18px'}>
                {recipe.cautions && recipe.cautions.map((caution) => <Badge variant={'subtle'} colorScheme={'red'} key={caution}>{caution}</Badge>)}
              </Flex>
            </>
          )}

          {recipe.totalNutrients && (
            <>
              <Heading as='h4' mb="12px" size="md">Nutrients</Heading>
              <Flex flexDirection="row" gap="16px" flexWrap="wrap">
                {Object.values(recipe.totalNutrients).map((nutrient) => (
                  <div key={nutrient.label}><Text>{parseInt(nutrient.quantity, 10)} {nutrient.unit}</Text><Text fontSize="12px" fontWeight="bold" color="gray.500" casing="uppercase">{nutrient.label}</Text></div>
                ))}
              </Flex>
            </>
          )}
        </Box>
      </Flex>
    </Container>
  )
};