import React,{useState} from "react";

const Home = ({ meals, isLoading }) => {
  const [searchMeal, setSearchMeal] = useState("");

  return (
    <div>
      <div className="homePage">
        {isLoading ? (
          <div>Loading....</div>
         ):(
           <div className="search_input_box">
          </div>

         )
    }
        <div className='row'>

         {searchMeal !== ''&& meals.map((meal) => (
        <div key={meal.id}>
            <div >
            <h1>{meal.title}</h1>
        </div>
        </div>
      ))}
      </div>
      </div>
      <img
      className='home-img'
        src="https://i.ibb.co/SKn0nSF/img2.jpg"
        alt="food_image"
          width="100%"
        //  height="400%"
      />


    </div>
  );
};

export default Home;


