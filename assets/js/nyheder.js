// Sets up location of dynamic content
const nyhedContainerEl = document.querySelector(".nyhedContainer");

// Sets up the link for the fetch request
const baseURL = "https://aalborggarden.martinwinther.dk/wp-json/wp/v2/posts";
const urlCategory = "?categories=13&per_page=100";

// Initializes the fetch request
fetch(baseURL + urlCategory)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);

        // Creates a function to limit the amount of text that can be shown in the text element, maxLength defined later
        function limitText(text, maxLength) {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + "...";
            }
            // Saves said text for later
            return text;
        }

        // Initialized a render function
        function renderNyheder(nyhed) {
            // Simplifies the ${}
            const {nyhed_billede_1, upload_dato, titel, nyhed_tekst} = nyhed.acf;
            
            // Sets the limit for the amount of text allowed
            const limitedText = limitText(nyhed_tekst, 75);

            // Sets up the a template for semantic structure of the content
            let content = 
            `<article class="newsBig">
                <a href="./nyhedFocused.html?id=${nyhed.id}">
                    <img src="${nyhed_billede_1.url}" alt="${nyhed_billede_1.alt}" class="fullBodyImg">
                    <div class="articleContent">
                        <p>${upload_dato}</p>
                        <h2>${titel}</h2>
                        <p>${limitedText}</p>
                        <p class="readMore">LÆS MERE</p>
                    </div>
                </a>
            </article>`;
            // lets it save the "content" made within this function
            return content;
        }

        // Sorts the array by upload_dato to ensure the newest is first
        data.sort((a, b) => new Date(b.acf.upload_dato) - new Date(a.acf.upload_dato));

        // Initializes a string to be used for creating the content
        let allContent = '';

        // Loops through "content" so for each point in the array fetched the aformentioned content is created
        data.forEach(nyhed => {
            const content = renderNyheder(nyhed);
            allContent += content;
        });

        // Creates the actual content on the empty string set up before
        nyhedContainerEl.innerHTML = allContent;
    })
    // Creates a fallback in case something goes wrong in the rest of the fetch request
    .catch((err) => {
        console.error("Something went wrong, try again later", err);
    });
