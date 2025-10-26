document
  .querySelector("#upload-file-from-url")
  .addEventListener("click", async function () {
    const input = document.querySelector("#input-url");

    if (input.value === "") {
      return false;
    }

    let url;
    try {
      url = new URL(input.value);
    } catch (e) {
      console.error("Url is incorrect " + e.message);
      input.value = "";
      return false;
    }

    if (!url.toString().includes("json")) {
      return false;
    }

    const data = await fetch(url.toString());
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }

    const json = await data.json();

    json.galleryImages.forEach((img) => {
      addToGallery(img.url);
    });
  });

document.addEventListener("click", function (e) {
  if (e.target && e.target.matches(".images-gallery__delete-btn")) {
    e.target.parentNode.remove();
  }
});

function addToGallery(
  url,
  gallery = document.querySelector(".images-gallery")
) {
  if(!gallery) {
    return
  }
  gallery.insertAdjacentHTML(
    "beforeend",
    `
        <div class="images-gallery__image-wrapper">
            <img class="images-gallery__image" src="${url}">
            <div class="images-gallery__delete-btn"></div>
        </div>
    `
  );
}

function dropHandler(ev) {
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    for (let i = 0; i < ev.dataTransfer.items.length; i++) {
      if (
        ev.dataTransfer.items[i].kind === "file" &&
        ev.dataTransfer.items[i].type === "image/jpeg"
      ) {
        let file = ev.dataTransfer.items[i].getAsFile();
        addFileToGallery(file);
      }
    }
  } else {
    return false;
  }
}

function dragOverHandler(ev) {
  ev.preventDefault();
}

function addFileToGallery(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function () {
    addToGallery(reader.result);
  };
}
