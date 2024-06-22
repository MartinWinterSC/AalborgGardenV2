// Sets up location of dynamic content
const eventContainerEl = document.querySelector(".calendarContainer");

// Sets up the link for the fetch request
const baseURL = "https://aalborggarden.martinwinther.dk/wp-json/wp/v2/posts";
const urlCategory = "?categories=17&per_page=100";

// Initializes the fetch request
fetch(baseURL + urlCategory)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);

        // Creates a function to ignore events whose data has already passed
        function isDatePassed(dateString){
            const currentdate = new Date();
            const eventDate = new Date(dateString);
            return eventDate < currentdate;
        }

        // Creates a function to strinify the month of the YYYY-MM-DD format for use later
        function getMonthName(dateString){
            const months = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
            const eventDate = new Date(dateString);
            const monthIndex = eventDate.getMonth();
            return months[monthIndex];
        }

        // Initialized a render function
        function renderEvent(event){
            // Simplifies the ${}
            const{dato, event_navn, start_tid, slut_tid, placering, bemaerkning} = event.acf;
            const eventDate = new Date(dato);
            const monthName = getMonthName(dato)

            // Sets up the a template for semantic structure of the content
            let content = 
            `<article>
                <a href="#">
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
                            </div>`;
            if (bemaerkning) {
                content += 
                `<div class="remark">
                    <p>Bemærkninger</p>
                    <p><span>${bemaerkning}</span></p>
                </div>`;
            } else {
                content += 
                `<div class="remark">
                    <p>Bemærkninger</p>
                    <p><span>Ingen</span></p>
                </div>`;
            }
            content += `</div>
                    </div>
                </a>
            </article>`;

            // lets it save the "content" made within this function
            return content;
        }

        // Filters out past events
        const upcomingEvents = data.filter(event => !isDatePassed(event.acf.dato));
        // Sorts the data to make sure the the events that comes the soonest, in terms of the date, is first in the array (so that it's shown first)
        upcomingEvents.sort((a, b) => new Date(a.acf.dato) - new Date(b.acf.dato));

        // Loops through "content" so for each point in the array fetched the aformentioned content is created
        upcomingEvents.forEach(event => {
            const content = renderEvent(event);
            eventContainerEl.innerHTML += content;
        });
        console.log(upcomingEvents);
    })
    // Creates a fallback in case something goes wrong in the rest of the fetch request
    .catch((err) => {
        console.error("Something went wrong, try again later", err);
    });