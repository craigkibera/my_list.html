document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("container");
  fetch(`http://localhost:3000/people`)
    .then((responce) => responce.json())
    .then((data) =>
      data.forEach((people) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<img
            src="${people.image}"
            alt=""
          />
          <div class="text-content">
            <p>
              ${people.biography}
            </p>
           <span>
             Name:${people.name} <br />
            Nationality: ${people.nationality}<br />
            Age: 54<br />
           </span>
            <span>Likes: ${people.likes} </span> <br/>
            <span> Assassinated: ${people.deathdate}  </span> <br/>
            
                <div class="buttons">
                <button class="like" id="actions">Like</button>
                <button class="delete" id="actions">Delete</button>
                </div>
          </div>`;
        let likeBtn = card.querySelector(".like");
        likeBtn.innerText = "Like";
        likeBtn.onclick = () => {
            let mydata = {
                "id": people.id,
                "likes": Math.abs(people.likes + 1)
            }
            fetch(`http://localhost:3000/people/${people.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(mydata)
            }).then((r) => r.json())
            .then(() => {
                likeBtn.innerText = "Liked";
            })

        }
        let delBtn = card.querySelector(".delete");
        delBtn.innerText ="Delete";
        delBtn.addEventListener("click", () => {
            fetch(`http://localhost:3000/people/${people.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "Application/json"
                }
            }).then((r) => r.json())
            .then(() => {
                card.remove()
            })

        })
        section.appendChild(card);
        let mainpreview = document.querySelector(".preview-show");
        card.querySelector("img").addEventListener("click", () => {
          fetch(`http://localhost:3000/people/${people.id}`)
            .then((r) => r.json())
            .then((data) => {
              mainpreview.style.display = "grid";
              preview = document.createElement("div");
              preview.classList.add("center-content");
              preview.innerHTML = `<img
                                    class="img5"
                                    src="${data.image}"
                                    alt=""
                                />
                                <div class="text-content">
                                    <p>
                                    ${data.biography}
                                    </p>
                                    Name:${data.name} <br />
                                    Nationality: ${data.nationality}<br />
                                    Age: 54<br />
                                    Assassinated: 10th July 2002 <br />
                                </div>`;
              preview.onclick = () => {
                mainpreview.style.display = "none";
                preview.remove();
              };
              mainpreview.appendChild(preview);
            });
        });
      })
    );
});
