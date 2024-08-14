let Key = "f83cb5435b844f85961a2ff4cbd2df06";
let cartData = document.querySelector(".cartData");
let input = document.getElementById("search");
let btn1 = document.getElementById("btn1");

// Function to fetch and display news articles
const getDate = async (data) => {
    try {
        // Fetch data from NewsAPI
        let response = await fetch(`https://newsapi.org/v2/everything?q=${data}&apiKey=${Key}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        let jsonData = await response.json();
        // Clear previous results
        cartData.innerHTML = "";

        // Check if articles array is empty
        if (jsonData.articles.length === 0) {
            cartData.innerHTML = "<p>No articles found for the search term.</p>";
            return;
        }

        // Loop through articles and create HTML for each
        jsonData.articles.forEach(article => {
            let imageCards = document.createElement("div");
            imageCards.classList.add("card");
            cartData.appendChild(imageCards);

            // Setting up the inner HTML for each card
            imageCards.innerHTML = `
            <img src="${article.urlToImage || 'default_image.jpg'}" alt="Image">
            <h4>${article.title}</h4>
            <p>${article.description}</p>`;
            imageCards.addEventListener("click",()=>{
                window.open(article.url)
            })
        });
    } catch (error) {
        console.error('Error fetching the data:', error);
        cartData.innerHTML = "<p>Failed to fetch articles. Please try again later.</p>";
    }
   
}

// Adding an event listener to the search button
btn1.addEventListener("click", () => {
    let inputText = input.value;
  
    getDate(inputText);
});

// Function to fetch news based on a parameter
function newsClick(aboutNews) {
    console.log(aboutNews,'dd')
    getDate(aboutNews);
}

// Example usage
// Call this function to load news about a specific topic
// newsClick('technology'); // Uncomment to test
