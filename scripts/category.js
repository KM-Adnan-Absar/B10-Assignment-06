const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
      .then((res) => res.json())
      .then((data) => displayCategories(data.categories))
      .catch((error) => console.log(error));
  };

// Load Pets

const loadPets= () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
      .then((res) => res.json())
      .then((data) => displayPets(data.pets))
      .catch((error) => console.log(error));
  };

  const loadCategoryPets = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
      .then((res) => res.json())
      .then((data) => {
        displayPets (data.data); 
      })
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

// Dispaly Pets

const displayPets = (pets) =>{
    
const petContainer = document.getElementById('pets')
petContainer.innerHTML="";

if(pets.length ==0){
    
    petContainer.classList.remove("grid");
    petContainer.innerHTML=
    `
    <div class = "min-h-[300px]  flex flex-col gap-5 justify-center items-center" > 
      <img  src="assetes/error.webp" />
      <h2 class = 'text-2xl font-bold -mt-4 text-center'> No Information Available </h2>
    </div>
  
    `;
    return;
}
else{
    petContainer.classList.add("grid")
}

    pets.forEach(pet => {
console.log(pet);
const card = document.createElement("div");
card.classList = "card card-compact "
card.innerHTML = ` <figure class = 'h-[200px]'>
    <img class = 'h-full w-full object-cover' 
      src= ${pet.image} />
  </figure >
  <div class="px-0 py-2 ">
    
  <h2 class ='font-bold text-xl'>${pet.pet_name}</h2>
  <div class = 'flex gap-2'> 
  <img width="20" height="20" src="https://img.icons8.com/windows/32/poodle.png" alt="poodle"/>
    <p>Breed:${pet.breed} </p>
  </div>
<div class = 'flex gap-2'> 
<img width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/50/birth-date.png" alt="birth-date"/>
  <p>Birth: ${pet.date_of_birth} </p>
</div>

<div class = 'flex gap-2'> 
<img width="20" height="20" src="https://img.icons8.com/material-outlined/24/unisex.png" alt="unisex"/>
<p>Gender:${pet.gender} </p>
</div>

  <div class = 'flex gap-2'>
  <img width="20" height="20" src="https://img.icons8.com/material-outlined/24/average-2.png" alt="average-2"/> 
 <p>Price:${pet.price} </p>
</div>
 


  </div>`;
  petContainer.append(card)
    })


}


  
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");
  
    categories.forEach((item) => {
      console.log(item);
  
      // Create a button for each category
      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add('btn');
      buttonContainer.style.display = "flex";
      buttonContainer.style.alignItems = "center";
      buttonContainer.style.gap = "10px";
      buttonContainer.style.marginBottom = "10px";
      buttonContainer.style.backgroundColor = "#f0f0f0";
      buttonContainer.style.fontSize = "20px";
      buttonContainer.style.borderRadius = "8px";
      buttonContainer.style.padding = "10px";
  
      // Add the image and text to the button
      buttonContainer.innerHTML = `
        <img src="${item.category_icon}" alt="${item.category} Icon" style="width: 24px; height: 24px;">
        ${item.category}
      `;
  
      // Append the button to the category container
      categoryContainer.appendChild(buttonContainer);
  
      // Add the click event listener to the button
      buttonContainer.addEventListener('click', () => {
        loadCategoryPets(item.category);
      });
    });
  };
  
  
  loadCategories();
  loadPets();