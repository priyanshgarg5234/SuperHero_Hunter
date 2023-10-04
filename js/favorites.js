// Select the card container from the DOM
let cardContainer = document.getElementById('container');

// Select the card container from the DOM
window.addEventListener("load", function () {
    // Get the favorites array from localStorage
    let favourites = localStorage.getItem("favouriteCharacters");

    // Check if the favorites array is null
    if (favourites == null) {
        // Display a message if there are no characters in favorites and return
        cardContainer.innerHTML = "<p class=\"no-characters\">No characters present in Favourites</p>"
        return;
    }
    else {
        // Parse the favorites array if it's not null
        favourites = JSON.parse(this.localStorage.getItem("favouriteCharacters"));
    }

    // Check if there are no characters in favorites
    if (favourites.length == 0) {
        // Display a message if there are no characters in favorites
        cardContainer.innerHTML = "<p class=\"no-characters\">No characters present in Favorites</p>";
        return;
    }


    // Clear the card container
    cardContainer.innerHTML = "";

    // Iterate through the characters in favorites and display them in cards
    favourites.forEach(character => {
        cardContainer.innerHTML +=
            `
               <div class="flex-col card">
                    <img src="${character.squareImage}" alt="">
                    <span class="name">${character.name}</span>
                    <span class="id">Id : ${character.id}</span>
                    <span class="comics">Comics : ${character.comics}</span>
                    <span class="series">Series : ${character.series}</span>
                    <span class="stories">Stories : ${character.stories}</span>
                    <a class="character-info" href="./more-info.html">
                         <button class="btn"><i class="fa-solid fa-circle-info"></i> &nbsp; More Info</button>
                    </a>
                    <div style="display:none;">
                         <span>${character.id}</span>
                         <span>${character.name}</span>
                         <span>${character.comics}</span>
                         <span>${character.series}</span>
                         <span>${character.stories}</span>
                         <span>${character.description}</span>
                         <span>${character.landscapeImage}</span>
                         <span>${character.portraitImage}</span>
                         <span>${character.squareImage}</span>
                    </div>
                    <button class="btn remove-btn"><i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites</button>
               </div>
          `

    })

    // Attach event listeners to buttons after they are inserted in the DOM
    addEvent();
})

// Function for attaching event listeners to buttons
function addEvent() {
    let removeBtn = document.querySelectorAll(".remove-btn");
    removeBtn.forEach((btn) => btn.addEventListener("click", removeCharacterFromFavourites))

    let characterInfo = document.querySelectorAll(".character-info");
    characterInfo.forEach((character) => character.addEventListener("click", addInfoInLocalStorage));
}

// Function to remove a character from favorites
function removeCharacterFromFavourites() {
    // Get the ID of the character to be deleted
    let idOfCharacterToBeDeleted = this.parentElement.children[2].innerHTML.substring(5);

    // Get the favorites array from localStorage
    let favorites = JSON.parse(localStorage.getItem("favouriteCharacters"));

    // Get the favorites character IDs as a map from localStorage
    let favoritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));

    // Delete the character's ID from favoritesCharacterIDs map
    favoritesCharacterIDs.delete(`${idOfCharacterToBeDeleted}`);

    // Remove the character from the favorites array based on its ID
    favorites.forEach(function (favorite, index) {
        if (favorite.id == idOfCharacterToBeDeleted) {
            favorites.splice(index, 1);
        }
    });

    // If all characters are deleted from favorites and no characters are left to display
    if (favorites.length == 0) {
        cardContainer.innerHTML = "<p class=\"no-characters\">No characters present in Favorites</p>";
    }

    // Update the arrays in localStorage
    localStorage.setItem("favouriteCharacters", JSON.stringify(favorites));
    localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favoritesCharacterIDs]));

    // Remove the card element from the DOM
    this.parentElement.remove();

    // Display the "Removed from favorites" toast in the DOM
    document.querySelector(".remove-toast").setAttribute("data-visiblity", "show");

    // Remove the "Removed from favorites" toast from the DOM after a delay
    setTimeout(function () {
        document.querySelector(".remove-toast").setAttribute("data-visiblity", "hide");
    }, 1000);
}

// Function to store the info object of a character for which the user wants to see more information
function addInfoInLocalStorage() {
    // Store character info for detailed view
    let heroInfo = {
        name: this.parentElement.children[7].children[1].innerHTML,
        description: this.parentElement.children[7].children[5].innerHTML,
        comics: this.parentElement.children[7].children[2].innerHTML,
        series: this.parentElement.children[7].children[3].innerHTML,
        stories: this.parentElement.children[7].children[4].innerHTML,
        portraitImage: this.parentElement.children[7].children[7].innerHTML,
        id: this.parentElement.children[7].children[0].innerHTML,
        landscapeImage: this.parentElement.children[7].children[6].innerHTML
    }

    localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
}