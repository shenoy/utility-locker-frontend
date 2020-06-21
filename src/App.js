import React from "react";
import "./App.css";
import {
  sortByPrice,
  sortByPriceDesc,
  fetchProducts,
  handleChangeDepartment,
  handleChangeType,
} from "./utils";
import Button from "./Button";
import { baseUrl } from "./utils";
class App extends React.Component {
  //state = { products: [] };

  constructor(props) {
    super(props);
    this.state = {
      products: [
        [
          {
            id: "SGN-2",
            name: "Samsung Galaxy Note 2",
            description: "Samsung tablet computer",
            price: {
              value: 299.99,
              currency: "GBP",
            },
            type: "Electrical",
            department: "Computing",
            weight: "569g",
          },
        ],
      ],
    };
    this.setState = this.setState.bind(this);
    this.handleChangeDepartment = this.handleChangeDepartment.bind(this);
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    const res = await fetchProducts();
    return res;
  };

  handleChangeDepartment = async (props) => {
    const res = await handleChangeDepartment(props);
    this.setState({
      products: [res],
    });
  };

  handleChangeType = async (props) => {
    const res = await handleChangeType(props);
    this.setState({
      products: [res],
    });
  };

  sortByPrice = async () => {
    const res = await sortByPrice();
    this.setState({
      products: [res],
    });
  };

  sortByPriceDesc = async () => {
    const res = await sortByPriceDesc();
    this.setState({
      products: [res],
    });
  };

  render() {
    if (this.state.products.length > 0) {
      return (
        <div className="App">
          <div>
            <div className="title">
              <span>Utility Locker</span>
              <div className="subtitle">Range of Mobile Products</div>
            </div>

            <div className="sort">
              Sort by Price :
              <Button name="Low to High" handleClick={this.sortByPrice} />
              <Button name="High to Low" handleClick={this.sortByPriceDesc} />
            </div>
            <div className="group">
              Filter by Department :
              <Button
                name="Computing"
                handleClick={() => this.handleChangeDepartment("Computing")}
              />
              <Button
                name="Cookware"
                handleClick={() => this.handleChangeDepartment("Cookware")}
              />
              <Button
                name="DIY"
                handleClick={() => this.handleChangeDepartment("DIY")}
              />
              <Button
                name="Books and Stationery"
                handleClick={() =>
                  this.handleChangeDepartment("Books and Stationery")
                }
              />
              <Button
                name="Shoes"
                handleClick={() => this.handleChangeDepartment("Shoes")}
              />
              <Button
                name="Home"
                handleClick={() => this.handleChangeDepartment("Home")}
              />
              <Button
                name="Photography and Art"
                handleClick={() =>
                  this.handleChangeDepartment("Photography and Art")
                }
              />
              <Button
                name="Entertainment"
                handleClick={() => this.handleChangeDepartment("Entertainment")}
              />
            </div>
            <div className="group">
              Filter by Type :
              <Button
                name="Electrical"
                handleClick={() => this.handleChangeType("Electrical")}
              />
              <Button
                name="Voucher"
                handleClick={() => this.handleChangeType("Voucher")}
              />
              <Button
                name="Book"
                handleClick={() => this.handleChangeType("Book")}
              />
              <Button
                name="Ceramics"
                handleClick={() => this.handleChangeType("Ceramics")}
              />
              <Button
                name="Running"
                handleClick={() => this.handleChangeType("Running")}
              />
              <Button
                name="Electronics"
                handleClick={() => this.handleChangeType("Electronics")}
              />
            </div>

            {this.state.products[0].map((el, index) => (
              <div key={index}>
                <div className="item">
                  <div className="heading">{el.name}</div>
                  <div className="flex">
                    <div className="property">Description:</div>
                    &nbsp;<div>{el.description}</div>
                  </div>
                  <div className="flex">
                    <div className="property">Department:</div> &nbsp;
                    <div>{el.department}</div>
                  </div>

                  <div className="flex">
                    <div className="property">ID:</div>
                    &nbsp;<div>{el.id}</div>
                  </div>

                  <div className="flex">
                    <div className="property">Price:</div>
                    &nbsp;
                    <div className="price">£{el.price.value}</div>
                  </div>

                  <div className="flex">
                    <div className="property">Type:</div>
                    &nbsp;<div>{el.type}</div>
                  </div>

                  <div className="flex">
                    <div className="property">Weight:</div>
                    &nbsp;<div>{el.weight}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return <h1>...loading</h1>;
    }
  }
}

export default App;
