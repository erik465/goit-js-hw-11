import axios from "axios";
import Notiflix from "notiflix";


const API_KEY = "38253238-ec6a6e94acafbceabd9aec54b"

let PAGE = 1;



const formEl = document.querySelector(".search-form");
const galleryEl = document.querySelector(".gallery")

function smoothScrollToCard() {
    const { height: cardHeight } = document
      .querySelector(".gallery")
      .firstElementChild.getBoundingClientRect();
  
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });
  }



const getImages = async (queue, page) => {
    const request = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${queue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
    return request.data.hits;
}

formEl.addEventListener("submit", (e) =>{
    galleryEl.innerHTML = ''
    e.preventDefault()
    if(e.target.firstElementChild.value.trim() === ''){
        Notiflix.Notify.failure("Invalid input")
        return;
    }
    getImages(e.target.firstElementChild.value, PAGE)
    .then(res => {
        if(res.length == 0){
            Notiflix.Notify.failure('No images found!')
        }
        else{
            Notiflix.Notify.success(`Images found!`)
            for(let image of res){
                galleryEl.insertAdjacentHTML('beforeend', 
                `
                    <div class="photo-card">
                        <img src=${image.webformatURL} alt=${image.tags} loading="lazy" />
                        <div class="info">
                            <div class="info-item">
                                <b>Likes</b>
                                <p>${image.likes}</p>
                            </div>

                            <div class="info-item">
                                <b>Views</b>
                                <p>${image.views}</p>
                            </div>

                            <div class="info-item">
                                <b>Comments</b>
                                <p>${image.comments}</p>
                            </div>

                            <div class="info-item">
                                <b>Downloads</b>
                                <p>${image.downloads}
                            </p>
                        </div>
                    </div>
                `)    
            }
        }
    })

});

window.addEventListener("scroll", () => {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        PAGE += 1
        getImages(formEl.firstElementChild.value, PAGE)
        .then(res => {
            for(let image of res){
                galleryEl.insertAdjacentHTML('beforeend', 
                `
                    <div class="photo-card">
                        <img src=${image.webformatURL} alt=${image.tags} loading="lazy" />
                        <div class="info">
                            <div class="info-item">
                                <b>Likes</b>
                                <p>${image.likes}</p>
                            </div>
    
                            <div class="info-item">
                                <b>Views</b>
                                <p>${image.views}</p>
                            </div>
    
                            <div class="info-item">
                                <b>Comments</b>
                                <p>${image.comments}</p>
                            </div>
    
                            <div class="info-item">
                                <b>Downloads</b>
                                <p>${image.downloads}
                            </p>
                        </div>
                    </div>
                `)
    
    
                
            }
        })
        smoothScrollToCard()
    }
  });




