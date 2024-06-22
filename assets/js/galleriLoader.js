// Sets up location of dynamic content
const albumContainerEl = document.querySelector(".galleriOverview");

// Sets up the link for the fetch request
const baseURL = "https://aalborggarden.martinwinther.dk/wp-json/wp/v2/posts";
const urlCategory = "?categories=14&per_page=100";

// Initializes the fetch request
fetch(baseURL + urlCategory)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);

        // Initialized a render function
        function renderAlbum(album){
            // Simplifies the ${}
            const {album_navn, billede_1, billede_2, billede_3} = album.acf;
            
            // Sets up the a template for semantic structure of the content
            let content = 
            `<article>
                <h2>${album_navn}</h2>
                <div class="galleryImgContainer">
                    <img src="${billede_1.url}" alt="${billede_1.title}">
                    <img src="${billede_2.url}" alt="${billede_2.title}">
                    <div class="desktopImg">
                        <img src="${billede_3.url}" alt="${billede_3.title} class="desktopImg">
                    </div>
                </div>
                <div class="buttonContainer">
                    <a href="./galleriAlbum.html?id=${album.id}"><button>SE ALLE</button></a>
                </div>
            </article>`;
            // lets it save the "content" made within this function
            return content;
        }

        // Loops through "content" so for each point in the array fetched the aformentioned content is created
        data.forEach(album => {
            const content = renderAlbum(album);
            albumContainerEl.innerHTML += content;
        });
    })
    // Creates a fallback in case something goes wrong in the rest of the fetch request
    .catch((err) => {
        console.error("Something went wrong, try again later", err);
    });
