import "./App.css";
import ProductChart from "./components/ProductChart";
import ProductForm from "./components/ProductForm";

function App() {
  return (
    <div className="Product-list-container flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold my-4">
        Product Listing with charts
      </h1>
      <div className="my-4">
        <ProductForm />
      </div>
      <div>
        <ProductChart />
      </div>
    </div>
  );
}

export default App;
