import React, {useState, useEffect, useMemo} from "react";
import API from "./api";
import Card from "./components/Card";

const debounce = (func, wait) => {
    let timeout;

    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    }
}

function App() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchProduct, setProductInput] = useState('');

    const fetchProducts = useMemo(
        () => debounce(() => {
                API.getProduct()
                    .then((res) => {
                        const data = res?.data.filter((product) => {
                            if (searchProduct || searchInput) {
                                // do we have both filters?
                                if (searchProduct && searchInput) {
                                    return product.type.match(searchProduct) && product.name.match(searchInput);
                                }
                                return (searchProduct && product.type.match(searchProduct)) ||
                                    (searchInput && product.name.match(searchInput))
                            }
                            return product;
                        }).map((product) => {
                            return product;
                        });
                        setProducts(data);
                    })
                    .catch((error) => {
                        setError(error);
                        setProducts([]);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
        }, 300)
        , [searchProduct, searchInput]);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchProducts();
    }, [fetchProducts]);

  const cardResults = useMemo(() => {
      return products?.map((product) => {
          return <Card cardResults={product} />;
      })
  }, [products])

  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="text">Interview Header</h1>
        </div>
      </div>
      <div className="container">
        <form>
          <label>
            Search:
            <input
              type="text"
              name="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </label>
        </form>
      </div>
      <label htmlFor="type">Choose a product type:</label>
      <select defaultValue={null} onChange={(e) => setProductInput(e.target.value)}>
          <option value={null}></option>
        <option value="RETAIL">Retail</option>
        <option value="CASH">Cash</option>
      </select>
      <div className="container">
          <h1>Results: </h1>
          {loading && (<div>Loading.....</div>)}
          {error && (
              <div>{error}</div>
          )}
          {products && (<div className="cards">{cardResults}</div>)}
      </div>
      <div style={{ marginTop: 30 }} className="footer">
        {" "}
        <div className="container">
          <h1>Interview Footer </h1>
        </div>
        <p>Built with love</p>
      </div>
    </>
  );
}

export default App;
