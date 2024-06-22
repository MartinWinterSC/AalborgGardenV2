// Sets up location of dynamic content
const albumContainerEl = document.querySelector(".albumContainer")

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
            const renderAlbumContainer =
            `<img src="${data.acf.billede_1.link}" alt="" class="fullBodyImg">
            <img src="${data.acf.billede_2.link}" alt="" class="fullBodyImg">
            <img src="${data.acf.billede_3.link}" alt="" class="fullBodyImg">
            <img src="${data.acf.billede_4.link}" alt="" class="fullBodyImg">
            <img src="${data.acf.billede_5.link}" alt="" class="fullBodyImg">
            <img src="${data.acf.billede_6.link}" alt="" class="fullBodyImg">
            <img src="${data.acf.billede_7.link}" alt="" class="fullBodyImg">
            <img src="${data.acf.billede_8.link}" alt="" class="fullBodyImg">
            <img src="${data.acf.billede_9.link}" alt="" class="fullBodyImg">
            <img src="${data.acf.billede_10.link}" alt="" class="fullBodyImg">`

            // Creates the content within the designated area
            albumContainerEl.innerHTML = renderAlbumContainer;
        })
        // Creates a fallback in case something goes wrong in the rest of the fetch request
        .catch((err) => {
            console.error("Something went wrong, try again later", err);
        });
});