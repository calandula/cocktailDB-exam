import "./modal.css";
import { getIngredients, getValues } from "../utils/utils";

export default function Modal({ handleClose, show, drink, children }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      {(drink === null) ? <p>null</p> : (
      <section className="modal-main">
        <button type="button" onClick={handleClose}>
          Close
        </button>
        {children}
        <h1>{drink.strDrink}</h1>
        <img src={drink.strDrinkThumb}></img>
        <table>
          {getIngredients(drink).map((ingredient) => (
            <tr>
              <td>{ingredient}</td>
            </tr>
          ))}
        </table>
        <p>{drink.strInstructions}</p>
      </section>)}
    </div>
  );
}
