import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const apiKey = "41921784-0571e350d6104826bc1422cb3";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const loader = document.getElementById("loader");
const gallery = document.getElementById("gallery");
let lightbox;

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function clearGallery() {
  gallery.innerHTML = "";
}

function clearSearchInput() {
  searchInput.value = "";
}

function initLightbox() {
  lightbox = new SimpleLightbox(".image-card a");
}

function searchImages(searchTerm) {
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    searchTerm
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  showLoader();
  clearGallery();
  clearSearchInput();

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      hideLoader();
      if (data.hits.length > 0) {
        displayImages(data.hits);
        lightbox.refresh();
      } else {
        showNoResultsMessage();
      }
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
      hideLoader();
      showErrorToast(
        "An error occurred while fetching images. Please try again."
      );
    });
}

function displayImages(images) {
  images.forEach((image) => {
    const imageCard = createImageCard(image);
    gallery.appendChild(imageCard);
  });
}

function createImageCard(image) {
  const card = document.createElement("div");
  card.className = "image-card";
  card.innerHTML = `
    <a href="${image.largeImageURL}" data-lightbox="gallery">
      <img src="${image.webformatURL}" alt="${image.tags}">
    </a>
    <div class="image-details">
      <p>Likes: ${image.likes}</p>
      <p>Views: ${image.views}</p>
      <p>Comments: ${image.comments}</p>
      <p>Downloads: ${image.downloads}</p>
    </div>
  `;
  return card;
}

function showNoResultsMessage() {
  iziToast.info({
    title: "No Results",
    message: "Sorry, there are no images matching your search query. Please try again!",
  });
}

function showErrorToast(message) {
  iziToast.error({
    title: "Error",
    message: message,
  });
}

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== "") {
    searchImages(searchTerm);
  }
});

document.addEventListener("DOMContentLoaded", initLightbox);
