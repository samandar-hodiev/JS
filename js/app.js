"use strict"

const data = movies.splice(0, 102);
const cardsWrapper = $("#cards");
console.log(cards);




// ----------------------------------- normalize data ----------------------------------- //
const normalize = data.map((el)=>{
    return {
        title:el.title,
        year:el.year,
        genres:el.categories,
        id:el.imdbId ,
        rating:el.imdbRating,
        time:`${Math.round(el.runtime / 60)}h ${el.runtime % 60}m`,
        language:el.language,
        youtube:`https://youtube.com/embed/${el.youtubeId}`,
        summary:el.summary,
        imgMax:el.bigThumbnail,
        imgMin:el.smallThumbnail,
    };
});

// console.log(normalize);



function renderData(data){
    if(data.length){
        data?.forEach((element) => {
            const card = createElement('div', 'card', `
                <img src="${element.imgMax}" alt="foto">
                        <div class="card-body">
                            <h2 class="font-bold">${element.title}</h2>
                            <ul class="mb-4">
                                <li>
                                    <strong>Year:</strong>
                                    <span>${element.year}</span>
                                </li>
                                <li>
                                    <strong>Rating:</strong>
                                    <span>${element.rating}</span>
                                </li>
                                <li>
                                    <strong>Language:</strong>
                                    <span>${element.language}</span>
                                </li>

                                <li>
                                    <strong>Genre:</strong>
                                    <span >${element.genres}</span>
                                </li>
                                <li>
                                    <strong>Runtime:</strong>
                                    <span>${element.time}</span>
                                </li>
                            </ul>
                            <div class="flex justify-between btns">
                                <button>
                                  Read more
                                </button>
                                <button>
                                    <i class="bi bi-heart-fill"></i>
                                </button>
                            </div>
                        </div>
                `);
                
            cardsWrapper.appendChild(card);
        });
    };
};
renderData(normalize);






















// ----------------------------------- like button ----------------------------------- //
const likeButton = $("#like-button");
const heartButton = $("#heartButton");


likeButton.addEventListener('click', ()=>{
    // heartButton.classList.toggle('heart-red');
    heartButton.style='color:red;'
})