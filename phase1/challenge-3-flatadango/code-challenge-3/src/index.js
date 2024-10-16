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
            console.log( error);
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
                    function updateMovieDetails(film) {
                        document.getElementById('title').innerText = film.title;
                        document.getElementById('showtime').innerText = film.showtime;
                        document.getElementById('ticket-num').innerText = film.capacity - film.tickets_sold;
                        document.getElementById('runtime').innerText = film.runtime;
                        document.getElementById('film-info').innerText = `${film.runtime} minutes`;
                        document.getElementById('poster').src = film.poster;}
                

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    listItem.appendChild(deleteButton);

                    parentList.appendChild(listItem);
                    
                    listItem.addEventListener('click', () => {
                        updateMovieDetails(film);
                    });

                   
                    deleteButton.addEventListener("click", () => {
                        deleteMovie(film.id, listItem);
                    });
                });
            })
            .catch((error) => {
                console.log('Error:', error);
            });
            
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
