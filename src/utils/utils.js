function getIngredients(drinkObject) {
  var arr = [];
  var ingredient = null;
  for (let i = 1; i < 16; ++i) {
    ingredient = drinkObject[`strIngredient${i}`];
    if (ingredient === null) {
      break;
    } else {
      arr.push(ingredient);
    }
  }
  return arr;
}

function getValues(filtersObject) {
  var arr = [];
  for (let item in filtersObject) {
    arr.push(Object.values(filtersObject[item])[0]);
  }
  return arr;
}

export { getIngredients, getValues };
