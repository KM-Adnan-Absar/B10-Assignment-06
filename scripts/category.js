const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
      .then((res) => res.json())
      .then((data) => displayCategories(data.categories))
      .catch((error) => console.log(error));
  };

// Load dogs

const loadDogs= () => {
    fetch("https://openapi.programming-hero.com/api/peddy/category/dog")
      .then((res) => res.json())
      .then((data) => displayDogs(data.data))
      .catch((error) => console.log(error));
  };
// const cardDemo = {
    
// breed: "Beagle",
// category: "Dog",
// date_of_birth: "2023-03-22",
// gender: "Male",
// image: "https://i.ibb.co.com/XyXBtb8/pet-9.jpg",
// petId: 9,
// pet_details: "This male Beagle, born on March 22, 2023, is curious, playful, and great with children. Fully vaccinated and priced at $1900, he is perfect for families looking for an active, adventurous companion that loves to explore.",
// pet_name: "Buddy",
// price: null,
// vaccinated_status: "Fully"
// }

// Dispaly Dogs 

const displayDogs = (data) =>{
const petContainer = document.getElementById('dogs')
    data.forEach(dog => {
console.log(dog);
const card = document.createElement("div");
card.classList = "card card-compact "
card.innerHTML = ` <figure class = 'h-[200px]'>
    <img class = 'h-full w-full object-cover' 
      src= ${dog.image} />
  </figure >
  <div class="px-0 py-2 ">
    
  <h2 class = 'font-bold'>${dog.pet_name}</h2>
  <p>Breed:${dog.breed} </p>
  <p>Birth: ${dog.date_of_birth} </p>
  <p>Gender:${dog.gender} </p>
  <p>Price:${dog.price} </p>
  <p> </p>

  </div>`;
  petContainer.append(card)
    })


}


  
  const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");
  
    categories.forEach((item) => {
      console.log(item);
  
      // Create a button for each category
      const button = document.createElement("button");
      button.classList = "btn";
      button.style.display = "flex";
      button.style.alignItems = "center";
      button.style.gap = "10px";
      button.style.marginBottom = "10px";

      button.innerHTML = `<img src="${item.category_icon}" alt="${item.category} Icon" style="width: 24px; height: 24px;">
      ${item.category}
    `;
  
      // Append the button to the category container
      categoryContainer.appendChild(button);
    });
  };
  
  loadCategories();
  loadDogs();