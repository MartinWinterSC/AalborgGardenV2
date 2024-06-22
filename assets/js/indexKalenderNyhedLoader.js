// Sets up location of dynamic content
const calendarContainerEl = document.querySelector(".calendarContainer");
const nyhedContainerEl = document.querySelector(".newsContainer");

// Sets up the link for the fetch request
const baseURL = "https://aalborggarden.martinwinther.dk/wp-json/wp/v2/posts";
const category17 = "?categories=17&per_page=100";
const category13 = "?categories=13&per_page=100";

// Initializes the fetch request
const fetchRequests = [
    fetch(baseURL + category17).then(res => res.json()),
    fetch(baseURL + category13).then(res => res.json())
];

// Creates a "promise" which allows multiple fetch requests to run async
Promise.all(fetchRequests)
    .then(data => {
        let category17Data = data[0];
        let category13Data = data[1];

        console.log("Category 17 Data:", category17Data);
        console.log("Category 13 Data:", category13Data);

        // Creates a function to ignore events whose data has already passed
        function isDatePassed(dateString) {
            const currentdate = new Date();
            const eventDate = new Date(dateString);
            return eventDate < currentdate;
        }

        // Creates a function to strinify the month of the YYYY-MM-DD format for use later
        function getMonthName(dateString) {
            const months = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
            const eventDate = new Date(dateString);
            const monthIndex = eventDate.getMonth();
            return months[monthIndex];
        }

        // Initialized a render function
        function renderEvent(event) {
            const {dato, event_navn, start_tid, slut_tid, placering, bemaerkning} = event.acf;
            const eventDate = new Date(dato);
            const monthName = getMonthName(dato);

            // Sets up a template for the semantic structure of the content
            let content =
                `<article>
                    <a href="./kalender.html">
                        <div class="dateContainer">
                            <p class="weekday">${monthName}</p>
                            <p class="date">${eventDate.getDate()}</p>
                        </div>
                        <div class="eventInfoContainer">
                            <div class="articleTitle">
                                <h3>${event_navn}</h3>
                            </div>
                            <div class="articleDetails">
                                <div class="timePlaceContainer">
                                    <div class="time">
                                        <i class="fa-regular fa-clock"></i>
                                        <p>${start_tid} - ${slut_tid}</p>
                                    </div>
                                    <div class="place">
                                        <i class="fa-solid fa-location-dot"></i>
                                        <p>${placering}</p>
                                    </div>
                                </div>
                                <div class="remark">
                                    <p>Bemærkninger</p>
                                    <p><span>${bemaerkning}</span></p>
                                </div>
                            </div>
                        </div>
                    </a>
                </article>`;
            // lets it save the "content" made within this function
            return content;
        }

        // Sorts the data to make sure the the events that comes the soonest, in terms of the date, is first in the array (so that it's shown first)
        category17Data.sort((a, b) => new Date(a.acf.dato) - new Date(b.acf.dato));
        category17Data = category17Data.slice(0, 3);
        let eventContent = '';
        category17Data.forEach(event => {
            eventContent += renderEvent(event);
        });
        calendarContainerEl.innerHTML = eventContent;

        // Sorts the array by upload_dato to ensure the newest is first
        category13Data.sort((a, b) => new Date(b.acf.upload_dato) - new Date(a.acf.upload_dato));
        category13Data = category13Data.slice(0, 3);
        let newsContent = '';
        category13Data.forEach(nyhed => {
            newsContent += renderNyheder(nyhed);
        });
        nyhedContainerEl.innerHTML = newsContent;

        // Initialized a render function
        function renderNyheder(nyhed) {
            const {nyhed_billede_1, upload_dato, titel} = nyhed.acf;

            // Sets up the a template for semantic structure of the content
            let content = 
            `<article class="newsBig">
                <a href="./nyhedFocused.html?id=${nyhed.id}">
                    <img src="${nyhed_billede_1.url}" alt="${nyhed_billede_1.alt}" class="fullBodyImg">
                    <div class="newsInfo">
                        <h3>${titel}</h3>
                        <p>${upload_dato}</p>
                        <p class="readMore">LÆS MERE</p>
                    </div>
                </a>
            </article>`;
            // lets it save the "content" made within this function
            return content;
        }
    })
    // Creates a fallback in case something goes wrong in the rest of the fetch request
    .catch(err => {
        console.error("Error fetching data:", err);
    });
