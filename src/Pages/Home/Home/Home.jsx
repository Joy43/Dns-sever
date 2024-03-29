import Products from "../../Dashboad/Allproduct/Product/Product";
import Cover from "../Cover/Cover";

const Home = () => {
  return (
    <div>
      <div className="mt-24 mb-6">
        <Cover></Cover>
      </div>
      <div>
        <Products></Products>
      </div>
    </div>
  );
};

export default Home;
