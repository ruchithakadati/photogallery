class PhotoService {
  static async fetchPhotos(limit = 50) {
    const response = await fetch(`https://picsum.photos/v2/list?page=1&limit=${limit}`);
    if (!response.ok) throw new Error("Failed to load photos.");
    return await response.json();
  }
}

const photoGrid = document.getElementById("photoGrid");
const modal = document.getElementById("modal");
const fullImage = document.getElementById("fullImage");
const imageTitle = document.getElementById("imageTitle");
const closeBtn = document.getElementById("closeBtn");

function showModal(url, title) {
  fullImage.src = url;
  imageTitle.textContent = title;
  modal.classList.remove("hidden");
}

function hideModal() {
  modal.classList.add("hidden");
}

PhotoService.fetchPhotos()
  .then(photos => {
    photos.forEach(photo => {
      const img = document.createElement("img");

      // Use small image for thumbnail
      img.src = `https://picsum.photos/id/${photo.id}/150/100`;
      img.alt = photo.author;

      // Full-size image in modal
      img.addEventListener("click", () =>
        showModal(`https://picsum.photos/id/${photo.id}/600/400`, photo.author)
      );

      photoGrid.appendChild(img);
    });
  })
  .catch(err => {
    photoGrid.innerHTML = `<p>Error loading photos: ${err.message}</p>`;
  });

closeBtn.addEventListener("click", hideModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) hideModal();
});
