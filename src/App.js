import "./App.css";
import React, { useState } from "react";
import "./api/cocktailService";
import * as cocktailService from "./api/cocktailService";
import LoadingSpinner from "./components/Spinner";
import Modal from "./components/Modal";
import { getIngredients, getValues } from "./utils/utils";

function App() {
  const [category, setCategory] = useState(null);
  const [glass, setGlass] = useState(null);
  const [ingredients, setIngredient] = useState(null);
  const [alcoholic, setAlcoholic] = useState(null);
  const [name, setName] = useState(null);
  const [categoryFilters, setCategoryFilters] = useState(null);
  const [glassFilters, setGlassFilters] = useState(null);
  const [ingredientsFilters, setIngredientsFilters] = useState(null);
  const [alcoholicFilters, setAlcoholicFilters] = useState(null);
  const [items, setItems] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);

  const hideModal = () => {
    setShow(false);
  };

  //API calls to get items that satisfies these filters + API calls for each object for getting the extra info needed

  const handleChangeName = (event) => {
    setName(event.target.value);
    setIsLoading(true);
    cocktailService
      .getCocktailsByName(event.target.value)
      .then((res) => {
        setItems(res.drinks);
        setIsLoading(false);
      })
      .catch((err) => setError(true));
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
    setIsLoading(true);
    cocktailService.getCocktailsByCategory(event.target.value).then((res) => {
      Promise.all(
        res.drinks.map((item) => {
          return cocktailService.getCocktailsByName(item.strDrink);
        })
      )
        .then((res) => {
          res = res.map((it) => {
            return it.drinks[0];
          });
          setItems(res);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(true);
        });
    });
  };

  const handleChangeGlass = (event) => {
    setGlass(event.target.value);
    setIsLoading(true);
    cocktailService.getCocktailsByGlass(event.target.value).then((res) => {
      Promise.all(
        res.drinks.map((item) => {
          return cocktailService.getCocktailsByName(item.strDrink);
        })
      )
        .then((res) => {
          res = res.map((it) => {
            return it.drinks[0];
          });
          setItems(res);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(true);
        });
    });
  };

  const handleChangeIngredient = (event) => {
    setIngredient(event.target.value);
    setIsLoading(true);
    cocktailService.getCocktailsByIngredient(event.target.value).then((res) => {
      Promise.all(
        res.drinks.map((item) => {
          return cocktailService.getCocktailsByName(item.strDrink);
        })
      )
        .then((res) => {
          res = res.map((it) => {
            return it.drinks[0];
          });
          setItems(res);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(true);
        });
    });
  };

  const handleChangeAlcoholic = (event) => {
    setAlcoholic(event.target.value);
    setIsLoading(true);
    cocktailService.getCocktailsByAlcoholic(event.target.value).then((res) => {
      Promise.all(
        res.drinks.map((item) => {
          return cocktailService.getCocktailsByName(item.strDrink);
        })
      )
        .then((res) => {
          res = res.map((it) => {
            return it.drinks[0];
          });
          setItems(res);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(true);
        });
    });
  };

  //We load the contents of each dropdown in order to get the filter names
  
  React.useEffect(() => {
    cocktailService
      .getFiltersAlcoholic()
      .then((res) => {
        setAlcoholicFilters(getValues(res.drinks));
      })
      .catch((err) => {
        setError(true);
      });

    cocktailService
      .getFiltersCategories()
      .then((res) => {
        setCategoryFilters(getValues(res.drinks));
      })
      .catch((err) => {
        setError(true);
      });

    cocktailService
      .getFiltersGlasses()
      .then((res) => {
        setGlassFilters(getValues(res.drinks));
      })
      .catch((err) => {
        setError(true);
      });

    cocktailService
      .getFiltersIngredients()
      .then((res) => {
        setIngredientsFilters(getValues(res.drinks));
      })
      .catch((err) => {
        setError(true);
      });
  }, []);

  return (
    <div className="App">
      <Modal show={show} handleClose={hideModal} drink={selectedDrink}></Modal>
      <h1> Drink Finder 🍸</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          onChange={handleChangeName}
        ></input>
        <select
          id="Alcoholic"
          onChange={handleChangeAlcoholic}
          name="Alcoholic"
        >
          {alcoholicFilters === null ? (
            <option>Loading...</option>
          ) : (
            alcoholicFilters.map((it) => <option value={it}>{it}</option>)
          )}
        </select>
        <select
          id="Ingredients"
          onChange={handleChangeIngredient}
          name="Ingredients"
        >
          {ingredientsFilters === null ? (
            <option>Loading...</option>
          ) : (
            ingredientsFilters.map((it) => <option value={it}>{it}</option>)
          )}
        </select>
        <select id="Category" onChange={handleChangeCategory} name="Category">
          {categoryFilters === null ? (
            <option>Loading...</option>
          ) : (
            categoryFilters.map((it) => <option value={it}>{it}</option>)
          )}
        </select>
        <select id="Glass" onChange={handleChangeGlass} name="Glass">
          {glassFilters === null ? (
            <option>Loading...</option>
          ) : (
            glassFilters.map((it) => <option value={it}>{it}</option>)
          )}
        </select>
      </div>
      <div>
        {items === null || items?.length == 0 ? (
          <p>You need to filter or search by name</p>
        ) : isLoading ? (
          <LoadingSpinner></LoadingSpinner>
        ) : error ? (
          <p>There has been some error with API calls to CocktailDB</p>
        ) : (
          items.map((it) => (
            <div
              className="item"
              onClick={() => {
                setShow(true);
                setSelectedDrink(it);
              }}
            >
              <div className="left">
                <img src={it.strDrinkThumb}></img>
              </div>
              <div className="right">
                <h3>{it.strDrink}</h3>
                <p>{it.strAlcoholic}</p>
                <p>{it.strGlass}</p>
                <p>{it.strCategory}</p>
                <table>
                  {getIngredients(it).map((ingredient) => (
                    <tr>
                      <td>{ingredient}</td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
