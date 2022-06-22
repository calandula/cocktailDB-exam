const axios = require('axios').default;

axios.defaults.baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/'

async function getCocktailsByName(name) {
    const response = await axios.get(`search.php?s=${name}`)
    return response.data
}

async function getCocktailsByFirstLetter(letter) {
    const response = await axios.get(`search.php?f=${letter}`)
    return response.data
}

async function getIngredientsByName(name) {
    const response = await axios.get(`search.php?i=${name}`)
    return response.data
}

async function getCocktailById(id) {
    const response = await axios.get(`lookup.php?i=${id}`)
    return response.data
}

async function getIngredientById(id) {
    const response = await axios.get(`lookup.php?iid=${id}`)
    return response.data
}

async function getRandomCocktail() {
    const response = await axios.get(`random.php`)
    return response.data
}

async function getCocktailsByIngredient(ingredient) {
    const response = await axios.get(`filter.php?i=${ingredient}`)
    return response.data
}

async function getCocktailsByAlcoholic(alcoholic) {
    const response = await axios.get(`filter.php?a=${alcoholic}`)
    return response.data
}

async function getCocktailsByCategory(category) {
    const response = await axios.get(`filter.php?c=${category}`)
    return response.data
}

async function getCocktailsByGlass(glass) {
    const response = await axios.get(`filter.php?g=${glass}`)
    return response.data
}

async function getFiltersCategories() {
    const response = await axios.get(`list.php?c=list`)
    return response.data
}

async function getFiltersGlasses() {
    const response = await axios.get(`list.php?g=list`)
    return response.data
}

async function getFiltersIngredients() {
    const response = await axios.get(`list.php?i=list`)
    return response.data
}

async function getFiltersAlcoholic() {
    const response = await axios.get(`list.php?a=list`)
    return response.data
}

getCocktailsByGlass('Highball glass').then(res => getCocktailsByName(res.drinks[0].strDrink).then(res => console.log(res)))

module.exports = {
    getCocktailsByName,
    getCocktailsByIngredient,
    getCocktailsByAlcoholic,
    getCocktailsByCategory,
    getCocktailsByGlass,
    getFiltersAlcoholic,
    getFiltersCategories,
    getFiltersGlasses,
    getFiltersIngredients,
}