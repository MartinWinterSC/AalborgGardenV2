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
            `<img src="${data.acf.billede_1.link}" alt="" class="fullBodyImg galleryImg">
            <img src="${data.acf.billede_2.link}" alt="" class="fullBodyImg galleryImg">
            <img src="${data.acf.billede_3.link}" alt="" class="fullBodyImg galleryImg">
            <img src="${data.acf.billede_4.link}" alt="" class="fullBodyImg galleryImg">
            <img src="${data.acf.billede_5.link}" alt="" class="fullBodyImg galleryImg">
            <img src="${data.acf.billede_6.link}" alt="" class="fullBodyImg galleryImg">
            <img src="${data.acf.billede_7.link}" alt="" class="fullBodyImg galleryImg">
            <img src="${data.acf.billede_8.link}" alt="" class="fullBodyImg galleryImg">
            <img src="${data.acf.billede_9.link}" alt="" class="fullBodyImg galleryImg">
            <img src="${data.acf.billede_10.link}" alt="" class="fullBodyImg galleryImg">`

            // Creates the content within the designated area
            albumContainerEl.innerHTML = renderAlbumContainer;

            // Attach event listeners to the images after they are added
            const modal = document.getElementById("modalFocus")
            const modalImg = document.getElementById("imgModalFocus")
            const images = document.querySelectorAll(".galleryImg")
            const modalClose = document.querySelector(".modalclose")
        
            // In effect creates an eventlistener on all image elements, that simply applies the "display: block" CSS rule on the element, effectively showing it and giving the img in the modal the src of the image that was clicked
            images.forEach(img => {
                img.onclick = function(){
                    modal.style.display = "block";
                    modalImg.src = this.src;
                }
            });
        
            // Hides the modal when clicking anywhere on the modal
            modal.onclick = function(){
                modal.style.display = "none"
            }

            
        })
        // Creates a fallback in case something goes wrong in the rest of the fetch request
        .catch((err) => {
            console.error("Something went wrong, try again later", err);
        });
});
