const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
      .then((res) => res.json())
      .then((data) => displayCategories(data.categories))
      .catch((error) => console.log(error));
  };

  const loadPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
      .then((res) => res.json())
      .then((data) => displayPets(data.pets))
      .catch((error) => console.log(error));
  };

  const loadCategoryPets = (id) => {
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("hidden"); // Show spinner
  
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
      .then((res) => res.json())
      .then((data) => {
        displayPets(data.data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        spinner.classList.add("hidden"); // Hide spinner
      });
  };
  const showPetDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          displayPetDetails(data.petData);
        } else {
          console.log("Pet details not found");
        }
      })
      .catch((error) => console.log(error));
  };

  const displayPets = (pets) => {
    const petContainer = document.getElementById("pets");
    petContainer.innerHTML = "";

    if (pets.length === 0) {
        petContainer.classList.remove("grid");
        petContainer.innerHTML = 
        `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
          <img src="assetes/error.webp"  />
          <h2 class="text-2xl font-bold -mt-4 text-center">No Information Available</h2>
        </div>
        `;
        return;
    } else {
        petContainer.classList.add("grid");
    }

    pets.forEach((pet) => {
        const card = document.createElement("div");
        card.classList = "card card-compact border-2 border-gray-300 rounded-lg shadow-md";
        card.innerHTML = `
        <figure class="h-[200px]">
          <img class="h-full w-full object-cover p-2" 
          src="${pet.image}" alt="${pet.pet_name}" />
        </figure>
        <div class="p-2">
          <h2 class="font-bold text-xl">${pet.pet_name}</h2>
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
 


 
          <div class="flex justify-between mt-2">
            <button class="btn"> 
              <img width="20" height="20" src="https://img.icons8.com/material-outlined/24/facebook-like--v1.png" alt="facebook-like--v1"/> 
            </button>
            <button class="adopt-btn btn text-[#0E7A81] text-lg font-bold">Adopt</button>
            <button onclick="showPetDetails(${pet.petId})" class="btn text-[#0E7A81] text-lg font-bold">Details</button>
          </div>
        </div>
        `;
        petContainer.appendChild(card);
    });


    
    // Add event listeners to all "Adopt" buttons after displaying pets
    const adoptButtons = document.querySelectorAll('.adopt-btn');
    adoptButtons.forEach(button => {
        button.addEventListener('click', startCountdown);
        
    });
};

// add countdown 

const startCountdown = () => {
    const modal = document.getElementById('countdown-modal');
    const countdownDisplay = document.getElementById('countdown-display');
    let countdown = 3;
    
    modal.classList.remove('hidden'); // Show the modal

    const interval = setInterval(() => {
        if (countdown > 0) {
            countdownDisplay.textContent = countdown;
            countdown--;
        } else {
            clearInterval(interval);
            countdownDisplay.textContent = "Adopted!";
            setTimeout(() => {
                closeModal();
            }, 1000);
        }
    }, 1000);
};

// Close modal
const closeModal = () => {
    document.getElementById('countdown-modal').classList.add('hidden'); // Hide the modal
};




  const displayPetDetails = (petData) => {
    const detailsContainer = document.getElementById("details-container");
    const detailsCard = document.getElementById("details-card");

    detailsCard.innerHTML = `
      <figure class="h-[200px]">
        <img class="h-full w-full object-cover p-2" src="${petData.image}" alt="${petData.pet_name}" />
      </figure>
      <div class="p-4">
        <h2 class="font-bold text-2xl mb-2">${petData.pet_name}</h2>
        <p><strong>Breed:</strong> ${petData.breed}</p>
        <p><strong>Gender:</strong> ${petData.gender}</p>
        <p><strong>Date of Birth:</strong> ${petData.date_of_birth}</p>
        <p><strong>Price:</strong> $${petData.price}</p>
        <p><strong>Vaccinated Status:</strong> ${petData.vaccinated_status}</p>
        <p class="mt-2"><strong>Details:</strong> ${petData.pet_details}</p>
      </div>
      <div class="flex justify-end gap-4 mt-4">
        <button onclick="closeDetails()" class="btn bg-gray-300 text-gray-700 font-bold px-4 py-2 rounded-lg">Cancel</button>
      </div>
    `;

    detailsContainer.style.display = "flex";
  };

  const closeDetails = () => {
    document.getElementById("details-container").style.display = "none";
  };





  const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");
    categories.forEach((item) => {
      const buttonContainer = document.createElement("button");
      buttonContainer.classList = "btn bg-gray-200 p-2 rounded-lg shadow-md";
      buttonContainer.innerHTML = `
        <img src="${item.category_icon}" alt="${item.category} Icon" class="inline w-6 h-6 " />
       <h2 class = 'font-bold text-lg text-center'> ${item.category} </h2>
      `;
      buttonContainer.addEventListener("click", () => loadCategoryPets(item.category));
      categoryContainer.appendChild(buttonContainer);
      

    });
  };

  loadCategories();
  loadPets();