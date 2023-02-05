import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../Commmon/Product";

const Homepage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product")
      .then((res) => setProducts(res.data))
      .catch();

    console.log(products)
  }, []);

  return(
    <div className="products">
        {products.map(pro => {
            return(
                <Product pro={pro} key={pro._id} />
            ) 
        })}
    </div>
  )
};

export default Homepage;
