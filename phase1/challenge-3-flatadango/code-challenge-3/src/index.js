document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/films/1')
        .then((response) => response.json())
        .then((film) => {
            document.getElementById('title').innerText = film.title;
            document.getElementById('showtime').innerText = film.showtime;
            document.getElementById('ticket-num').innerText = film.capacity - film.tickets_sold;
            document.getElementById('runtime').innerText = film.runtime;
            document.getElementById('film-info').innerText = `${film.runtime} minutes`;
            document.getElementById('poster').src = film.poster;

            let buyBtn = document.getElementById("buy-ticket");

            if (film.capacity - film.tickets_sold > 0) {
                buyBtn.addEventListener("click", (e) => {
                    e.preventDefault();

                     sold = film.tickets_sold + 1;
                    let patchMovie = {
                         tickets_sold: sold, 
                        };

                    fetch("http://localhost:3000/films/1", {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(patchMovie),
                    })
                        .then((response) => response.json())
                        .then((updatedfilm) => {
                            document.getElementById('ticket-num').innerText = 
                                film.capacity - updatedfilm.tickets_sold;
                            console.log('success!');
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
            } else {
                buyBtn.disabled = true;
                buyBtn.innerText = 'Sold Out';
            }
        })
        .catch((error) => {
            console.log('Error:', error);
        });

        fetch('http://localhost:3000/films')
            .then((response) => response.json())
            .then((film) => {
                const parentList = document.getElementById('films');
                parentList.innerHTML = ''; 

                film.forEach(film => {
                    const listItem = document.createElement('li');
                    listItem.textContent = film.title;
                    listItem.classList.add('film', 'item');

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    listItem.appendChild(deleteButton);

                    parentList.appendChild(listItem);

                   
                    deleteButton.addEventListener("click", () => {
                        deleteMovie(film.id, listItem);
                    });
                });
            })
            .catch((error) => {
                console.log('Error:', error);
            });
            // function movieDetails() {
            //     fetch("http://localhost:3000/films/7")
            //         .then((r) => r.json()) // Corrected .json to .json()
            //         .then((data) => {
            //             const image = document.getElementById("poster");
            //             image.src = data.poster;
            //             image.alt = data.title;
            //             image.append()
            //             const card = document.querySelector(".card");
            
            //             // Corrected usage of querySelector on card element.
            //             card.querySelector("#title").textContent = data.title;
            //             card.querySelector("#runtime").textContent = `${data.runtime} mins`;
            //             card.querySelector("#film-info").textContent = data.description;
            //             card.querySelector("#showtime").textContent = data.showtime;
            //             card.querySelector("#ticket-num").textContent = Math.abs(data.capacity - data.tickets_sold);
            //             card.querySelector("#buy-ticket").addEventListener("click", () => {
            //                 function buyTicket(){
            //                     let tickets = Math.abs(data.capacity - data.tickets_sold);
            //                     if(tickets > 0){
            //                         let patchMovie = {
            //                             tickets_sold: data.tickets_sold + 1, 
            //                            };
            //                         fetch('http://localhost:3000/films/7', {
            //                             method: "PATCH",
            //                             headers: {
            //                                 "Content-Type": "application/json",
            //                             },
            //                             body: JSON.stringify(patchMovie)
                            
            //                         })
            //                         .then((r) => r.json())
            //                         .then((data) => {
            //                             card.querySelector("#ticket-num").textContent = Math.abs(data.capacity - patchMovie.tickets_sold);
            //                             console.log(data)
            //                         })
            //                     }else{
            //                         card.querySelector("#buy-ticket").innerText = "Sold-Out";
            //                     }
            //                 }
            //                 buyTicket()
            //             })
            //         })
            //         .catch((error) => console.error("Error fetching movie details:", error)); // Optional error handling
            // }
            
            movieDetails()
    function deleteMovie(movieId, listItem) {
        fetch(`http://localhost:3000/films/${movieId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then(() => {
                listItem.remove(); 
                console.log(`Movie with ID ${movieId} deleted successfully.`);
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    }

    
});
