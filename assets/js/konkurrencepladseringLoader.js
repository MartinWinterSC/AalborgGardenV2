// Sets up location of dynamic content
const competitionContainerEl = document.querySelector(".competitionContainerSuper");

// Sets up the link for the fetch request
const baseURL = "https://aalborggarden.martinwinther.dk/wp-json/wp/v2/posts";
const urlCategory = "?categories=18&per_page=100";

// Initializes the fetch request
fetch(baseURL + urlCategory)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);

        // Initialized a render function
        function renderCompetition(competition) {
            // Simplifies the ${}
            const {konkurrence_navn, konkurrence_logo} = competition.acf;

            // Sets up the a template for semantic structure of the content
            let content =
                `<article class="competitionContainer">
                    <div>
                        <h2>${konkurrence_navn}</h2>
                        <img src="${konkurrence_logo.url}" alt="${konkurrence_logo.title}" class="fullBodyImg logoContain">
                    </div>
                    <div class="buttonContainer">
                        <a href="./placeringFocused.html?id=${competition.id}"><button>Se placering</button></a>
                    </div>
                </article>`;
            // lets it save the "content" made within this function
            return content;
        }

        // Initializes a string to be used for creating the content
        let allCompetitionContent = "";

        // Loops through "content" so for each point in the array fetched the aformentioned content is created
        data.forEach((competition) => {
            const content = renderCompetition(competition);
            allCompetitionContent += content;
        });

        // Creates the actual content on the empty string set up before
        competitionContainerEl.innerHTML = allCompetitionContent;
    })
    // Creates a fallback in case something goes wrong in the rest of the fetch request
    .catch((err) => {
        console.error("Something went wrong, try again later", err);
    });
