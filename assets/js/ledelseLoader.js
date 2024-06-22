// Sets up location of dynamic content
const ledelseContainerEl = document.querySelector(".ledelseContainer")

// Sets up the link for the fetch request
const baseURL = "https://aalborggarden.martinwinther.dk/wp-json/wp/v2/posts";
const urlCategory = "?categories=10&per_page=100";

// Initializes the fetch request
fetch(baseURL + urlCategory)
.then((res) => res.json())
.then((data) => {
    console.log(data)

    // Because of the way the Wordpress is set up, the more important people were created first, and therefore is last in the array, so we flip it around to bypass it
    data.reverse();

    // Initialized a render function
    function renderLedelse(personal){
        // Simplifies the ${}
        const {specifikke_rolle, navn, telefonnr, email, portraet} = personal.acf;

        // Sets up the a template for semantic structure of the content
        let content = `<div>
        <h3>${specifikke_rolle}</h3>`;
        // Makes a check to see if there is an image within the "portraet" ACF if not revert to a placeholder Image
        if (portraet && portraet.url) {
            content += `<img src="${portraet.url}" alt="${portraet.alt}">`;
        } else {
            content += `<img src="./assets/img/placeholder.jpg" alt="Denne person er ikke fotogen">`
        }
        // Makes a check to see if there is a telefonnr and email respectively, if not it skips the step
        content += `<p>${navn}</p>`;
        if (telefonnr) {
            content += `<p>TLF: ${telefonnr}</p>`;
        }
        if (email) {
            content += `<p class="email">${email}</p>`;
        }
        content += `</div>`;
        // lets it save the "content" made within this function
        return content;
    }

    // Loops through "content" so for each point in the array fetched the aformentioned content is created
    data.forEach(personal => {
        const content = renderLedelse(personal);
        ledelseContainerEl.innerHTML += content;
    });
})
// Creates a fallback in case something goes wrong in the rest of the fetch request
.catch((err) => {
    console.error("Something went wrong, try again later", err);
});