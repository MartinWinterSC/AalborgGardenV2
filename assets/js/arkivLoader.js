// Sets up location of dynamic content
const archiveCompetitionContainerEl = document.querySelector(".archiveCompetitionContainer");
const archiveGalleryContainerEl = document.querySelector(".archiveGalleryContainer");

// Sets up the link for the fetch request
const baseURL = "https://aalborggarden.martinwinther.dk/wp-json/wp/v2/posts";
const category14 = "?categories=14&per_page=3";
const category18 = "?categories=18&per_page=3";

// Initializes the fetch request
const fetchRequests = [
    fetch(baseURL + category14).then(res => res.json()),
    fetch(baseURL + category18).then(res => res.json())
];

// Creates a "promise" which allows multiple fetch requests to run async
Promise.all(fetchRequests)
    .then(data => {
        let category14Data = data[0];
        let category18Data = data[1];

        // Creates an empty string to be filled later
        let galleryContent = "";
        // Loops through "content" so for each point in the array fetched the aformentioned content is created (Saves index because we want the 3 item to have a special class)
        category14Data.forEach((item, index) => {
            const content = renderGallery(item, index);
            galleryContent += content;
        });
        archiveGalleryContainerEl.innerHTML = galleryContent;

        // Creates an empty string to be filled later
        let competitionContent = "";
        // Loops through "content" so for each point in the array fetched the aformentioned content is created (Saves index because we want the 3 item to have a special class)
        category18Data.forEach((item, index) => {
            const content = renderCompetition(item, index);
            competitionContent += content;
        });
        // Creates the actual content on the empty string set up before
        archiveCompetitionContainerEl.innerHTML = competitionContent;
    })
    // Creates a fallback in case something goes wrong in the rest of the fetch request
    .catch(err => {
        console.error("Something went wrong, try again later", err);
    });

    // Initialized a render function
function renderGallery(item, index) {
    const { album_navn, billede_1 } = item.acf;
    const id = item.id;
    //Creates a function that checks if the index is 2 (meaning the 3rd item) and if it is it adds "desktopImg" and if not; nothing
    const additionalClass = index === 2 ? " desktopImg" : "";

    // Sets up the a template for semantic structure of the content
    return `
        <a href="./galleriAlbum.html?id=${id}" class="${additionalClass}">
            <h3>${album_navn}</h3>
            <img src="${billede_1.url}" alt="${billede_1.title}" class="fullBodyImg">
        </a>`;
}

    // Initialized a render function
    
function renderCompetition(item, index) {
    const { konkurrence_navn, konkurrence_logo } = item.acf;
    const id = item.id;
    //Creates a function that checks if the index is 2 (meaning the 3rd item) and if it is it adds "desktopImg" and if not; nothing
    const additionalClass = index === 2 ? " desktopImg" : "";

    // Sets up the a template for semantic structure of the content
    return `
        <a href="./placeringFocused.html?id=${id}" class="${additionalClass}">
            <h3>${konkurrence_navn}</h3>
            <img src="${konkurrence_logo.url}" alt="${konkurrence_logo.title}" class="fullBodyImg">
        </a>`;
}
