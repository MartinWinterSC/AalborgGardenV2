// Sets up location of dynamic content
const sponsorContainerEl = document.querySelector(".sponsorContainer");

// Sets up the link for the fetch request
const baseURL = "https://aalborggarden.martinwinther.dk/wp-json/wp/v2/posts";
const urlCategory = "?categories=12&per_page=100";

// Initializes the fetch request
fetch(baseURL + urlCategory)
.then((res) => res.json())
.then((data) => {
    console.log(data)

    // Initialized a render function
    function renderSponsor(sponsor){
        // Simplifies the ${}
        const {virksomhed_billede, virksomhed_navn, beloeb, donations_genstand} = sponsor.acf;
        // Sets up the a template for semantic structure of the content
        let content = `<div class="sponsorInfo">
            <img src="${virksomhed_billede.url}" alt="${virksomhed_billede.alt}" class="fullBodyImg">
            <h2>${virksomhed_navn}: ${beloeb},-</h2>
            <p>${donations_genstand}</p>
        </div>`;
        // lets it save the "content" made within this function
        return content;
    }
    // Loops through "content" so for each point in the array fetched the aformentioned content is created
    data.forEach(sponsor => {
        const content = renderSponsor(sponsor);
        sponsorContainerEl.innerHTML += content;
    });
})
// Creates a fallback in case something goes wrong in the rest of the fetch request
.catch((err) => {
    console.error("Something went wrong, try again later", err);
});