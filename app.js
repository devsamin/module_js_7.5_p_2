const loadData = (search_foods) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search_foods}`)
    .then((res) => res.json())
    .then((data) => {
      ShowAllData(data.meals);
    })
    .catch((error) => {
      // console.log("samin")
      const productsContainer = document.querySelector("#product-container");
      productsContainer.innerHTML = "";
      productsContainer.innerHTML = `<h4>NO RESULT FOUND</h4>`;
      // console.log(error)
    });
};

const searchFrom = document.getElementById("search-form");
searchFrom.addEventListener("submit", (event) => {
  event.preventDefault();
  const search_foods = document.getElementById("Search-foods").value;
  loadData(search_foods);
  document.getElementById("Search-foods").value = "";
});

const ShowAllData = (products) => {
  console.log("showalldata");
  const productsContainer = document.querySelector("#product-container");
  productsContainer.innerHTML = "";
  if (products) {
    products.forEach((product) => {
      console.log(product);
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
                <img id"image" class="image" onclick="foodDetails(${
                  product.idMeal
                })" src="${product.strMealThumb}" alt="">
                <h4 class="name"> ${product.strMeal.slice(0, 10)} </h4>
            `;
      productsContainer.appendChild(div);
    });
  } else {
    productsContainer.innerHTML = `<h4>NO RESULT FOUND</h4>`;
  }
};

const foodDetails = (idMeal) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      const ditailsContainer = document.getElementById("ditails-container");
      // Clear previous content
      ditailsContainer.innerHTML = "";
      const div = document.createElement("div");
      div.classList.add("ditailsBox");
      let Ingredient = "";
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          Ingredient += `<p>${meal[`strIngredient${i}`]}</p>`;
        }
      }
      div.innerHTML = `
      <img class="D-image" src="${meal.strMealThumb}" alt="">
        <h4> ${meal.strMeal.slice(0, 10)} </h4>
        ${Ingredient}
      `;

      ditailsContainer.appendChild(div);
    });
};
