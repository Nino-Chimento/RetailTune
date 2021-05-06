import React, { useState, VFC } from "react";
import { db } from "../db";
import { Button } from "../Component/Button";
import { useHistory } from "react-router-dom";
import { Product } from "../interface/Products";
import "../App.css";
interface PanelProps {
  cartProduct: Function;
}

export const Panel: VFC<PanelProps> = (props) => {
  const history = useHistory();
  const [products, setProducts] = useState(db);
  const [selectProduct, setSelectProduct] = useState<Product>(products[0]);
  const [productsSelect, setProductsSelect] = useState<any>([]);
  const [selectProductCart, setSelectProductCart] = useState([]);

  const querySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      const result = db.filter((product) => {
        return product.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setProducts(result);
    } else {
      setProducts(db);
    }
  };

  const eventSearchType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") {
      setProducts(db);
    } else {
      const result = db.filter((product) => product.type === e.target.value);
      setProducts(result);
    }
  };
  const eventSearchSeason = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") {
      setProducts(db);
    } else {
      const result = db.filter((product) => product.season === e.target.value);
      setProducts(result);
    }
  };
  const addProduct = () => {
    if (!productsSelect.includes(selectProduct) && productsSelect.length < 3) {
      setProductsSelect([...productsSelect, selectProduct]);
    } else {
      alert("non puoi aggiungere il prodotto");
    }
  };
  const removeProduct = () => {
    if (productsSelect.length > 0) {
      const result = productsSelect.filter(
        (product: Product[] | []): boolean => product !== selectProductCart
      );
      setProductsSelect(result);
    }
  };
  const addSelectAllToCart = () => {
    if (products.length > 3) {
      alert("Puoi selezionare al massimo 3 prodotti");
    } else {
      setProductsSelect(products);
    }
  };

  const goToCart = () => {
    if (productsSelect.length < 3) {
      alert("aggiungi 3 prodotti");
    } else {
      props.cartProduct(productsSelect);
      history.push("/cart");
    }
  };

  return (
    <div className="App">
      <div className="wrap-search">
        <input
          className="input-search"
          type="text"
          placeholder="search"
          onChange={querySearch}
        />
      </div>
      <div className="wrap-panels">
        <div className="wrap-addTo">
          <span>Add To</span>
          <div className="warp-select">
            <div>
              <select name="allType" id="" onChange={eventSearchType}>
                <option value="">All Types</option>
                <option value="Type1">Type1</option>
                <option value="Type2">Type2</option>
                <option value="Type3">Type3</option>
              </select>
            </div>
            <div>
              <select name="allSeason" id="" onChange={eventSearchSeason}>
                <option value="">All Seasons</option>
                <option value="Season1">Season1</option>
                <option value="Season2">Season2</option>
                <option value="Season3">Season3</option>
              </select>
            </div>
          </div>
          <div>
            {products &&
              products.map((product: Product, index) => (
                <div
                  key={index}
                  className={
                    product.id === selectProduct.id
                      ? "wrapProductSelect"
                      : "wrapProduct"
                  }
                  onClick={() => setSelectProduct(product)}
                  onDoubleClick={addProduct}
                >
                  <img className="imgProduct" src={product.icon} alt="" />
                  <span>{product.type}</span>
                  <span>{product.season}</span>
                </div>
              ))}
          </div>
          <div className="wrapButton">
            <Button variant="secondary" handleClick={addSelectAllToCart}>
              Select all
            </Button>
          </div>
          <div className="wrapButton">
            <Button variant="primary" handleClick={addProduct}>
              Add To
            </Button>
          </div>
        </div>
        <div className="wrap-products-select">
          <div>Room aviable</div>
          {productsSelect &&
            productsSelect.map((product: Product | any, index: number) => (
              <div
                key={index}
                className={
                  product === selectProductCart
                    ? "wrapProductSelect"
                    : "wrapProduct"
                }
                onClick={() => setSelectProductCart(product)}
                onDoubleClick={removeProduct}
              >
                <img className="imgProduct" src={product.icon} alt="" />
                <span>{product.type}</span>
                <span>{product.season}</span>
              </div>
            ))}
          <div className="wrap-button-remove">
            <Button variant="primary" handleClick={removeProduct}>
              Remove
            </Button>
          </div>
        </div>
      </div>
      <div className="wrap-button-goCart">
        <Button variant="primary" handleClick={goToCart}>
          Go to cart
        </Button>
      </div>
    </div>
  );
};
