// Sets up location of dynamic content
const focusedNyhedEl = document.querySelector(".focusedNyhed")

// Searches the URL for the ?id=X to be used later
document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const contentID = params.get('id');

    // Initializes the fetch request
    fetch(`https://aalborggarden.martinwinther.dk/wp-json/wp/v2/posts/${contentID}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            // Sets up the semantic structure for the content
            const renderFocusedNyhed =
            `<h2>${data.acf.titel}</h2>
            <div class="authorDateContainer">
                <p>af ${data.acf.forfatter}</p>
                <p>${data.acf.upload_dato}</p>
            </div>
            <div class="contentContainer">
                <div class="textContainer">
                    <p>${data.acf.nyhed_tekst}</p>
                </div>
                <div class="imgContainer">
                    <img src="${data.acf.nyhed_billede_1.url}" alt="${data.acf.nyhed_billede_2.title}" class="fullBodyImg">
                    <img src="${data.acf.nyhed_billede_2.url}" alt="${data.acf.nyhed_billede_2.title}" class="fullBodyImg">
                </div>
            </div>`

            // Creates the content within the designated area
            focusedNyhedEl.innerHTML = renderFocusedNyhed;
        })

        // Creates a fallback in case something goes wrong in the rest of the fetch request
        .catch((err) => {
            console.error("Something went wrong, try again later", err);
        });
});