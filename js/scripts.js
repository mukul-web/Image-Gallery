function showAllPhotos(photos) {
  for (const photo of photos) {
    photo.removeAttribute('style');
  }
}

function showOnlyMatchingPhotos(query, photos) {
  // initially hide all the photos
  for (const photo of photos) {
    photo.style.display = 'none';
  }

  // find captions that include the search query
  const queryMatches = photoGallery.querySelectorAll(
    `[data-caption*="${query}" i]`
  );

  // then show photos that have a matching caption
  if (queryMatches.length > 0) {
    for (const photo of queryMatches.values()) {
      photo.parentElement.removeAttribute('style');
    }
  } else {
    // display 'no photos found' message
    const infoBox = document.createElement("p");
    infoBox.id = "info";
    infoBox.innerHTML = `No photo captions found with the search term: <br><strong>${query}</strong>`;
    photoGallery.parentElement.prepend(infoBox);
  }
}

function searchPhotos(event) {
  const query = event.target.value.toLowerCase();
  const photos = photoGallery.children;
  const info = document.getElementById("info");

  if (info) {
    info.remove();
  }

  // if search query is empty, show all photos
  if (query.length === 0) {
    showAllPhotos(photos);
  } else {
    showOnlyMatchingPhotos(query, photos);
  }
}

// if search input, photos, and captions exist, add event listener
const searchInput = document.getElementById('search');
const photoGallery = document.getElementById('photos');
const photoCaptions = photoGallery.querySelectorAll('[data-caption]');

if (
  searchInput &&
  photoGallery &&
  photoGallery.children.length > 1 &&
  photoCaptions &&
  photoCaptions.length > 1
) {
  searchInput.addEventListener('keyup', searchPhotos);
} else {
  console.error('search elements missing');
}
