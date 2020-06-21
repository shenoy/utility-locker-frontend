import React from "react";
import ReactDOM from "react-dom";
import sinonChai from "sinon-chai";
import chai from "chai";
import renderer from "react-test-renderer";
import { configure, shallow } from "enzyme";
import {
  sortByPrice,
  sortByPriceDesc,
  fetchProducts,
  handleChangeType,
  handleChangeDepartment,
} from "./utils";
import App from "./App";
import Button from "./Button";
import Adapter from "enzyme-adapter-react-16";

chai.use(sinonChai);
configure({ adapter: new Adapter() });

describe("Sample Test", () => {
  it("test to be true", () => {
    const foo = true;
    expect(foo).toBe(true);
  });

  it("test to be false", () => {
    const foo = false;
    expect(foo).toBe(false);
  });
  it("knows that 2 and 2 make 4", () => {
    expect(2 + 2).toEqual(4);
  });
});

describe("Integration testing", () => {
  it("App renders without crashing ", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });

  it("App has an initial state", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state("products").length).toEqual(1);
  });
  it("App code matches the snapshot", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("includes 1 div with class title", async () => {
    const wrapper = shallow(<App />);
    const span = wrapper.find("span");
    const result = span.text();
    await (() => expect(result).toEqual("Utility Locker"));
  });

  it("renders 2 group divs- group by Department and group by Type", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("div.group").length).toEqual(2);
  });

  it("renders a sort by Price div", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("div.sort").length).toEqual(1);
  });

  it("should render title", () => {
    const wrapper = shallow(<App />);
    expect(
      wrapper.containsAllMatchingElements([
        <div className="title">
          <span>Utility Locker</span>
          <div className="subtitle">Range of Mobile Products</div>
        </div>,
      ])
    ).toBe(true);
  });

  it("contains 16 <Button /> components", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Button).length).toEqual(16);
  });
});

describe("Button Component Testing", () => {
  it("button should be defined", () => {
    expect(Button).toBeDefined();
  });
  it("button should render correctly", () => {
    const tree = shallow(<Button name="button test" />);
    expect(tree).toMatchSnapshot();
  });
  it("should call mock function when button is clicked", () => {
    const mockFn = jest.fn();
    const tree = shallow(<Button name="button test" handleClick={mockFn} />);
    tree.simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });

  it("should return the topmost element tag of the button", () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.name()).toEqual("input");
  });
});

describe("Unit Testing App class Methods", () => {
  it("sortByPrice should return products sorted by price with lowest first", async () => {
    const data = await sortByPrice();
    expect(data[0].name).toEqual("Raspberry Pi Zero"); //lowest priced product
  });

  it("sortByPriceDesc should return products sorted by price with highest first", async () => {
    const data = await sortByPriceDesc();
    expect(data[0].name).toEqual("Samsung Galaxy Note 2"); //highest priced product
  });

  it("fetchProducts should return all products", async () => {
    const data = await fetchProducts();
    expect(data.length).toEqual(15); // count of all the products
  });

  it("handleChangeDepartment should fetch products of only the requested Department", async () => {
    const data = await handleChangeDepartment("Computing");
    expect(data[0].department).toEqual("Computing");
  });

  it("handleChangeType should fetch products of only the requested Type", async () => {
    const data = await handleChangeType("Electrical");
    expect(data[0].type).toEqual("Electrical");
  });
});
