// Upload picture from input or parse json
document.querySelector('#upload-file-from-url').addEventListener('click', function() {
    if (document.querySelector('#input-url').value === '') {
        return false;
    } else {
        const inputText = document.querySelector('#input-url').value

        if (inputText.includes('http')) {
            if (inputText.includes('json')) {
                fetchAndParseJson(inputText)
                document.querySelector('#input-url').value = ''
            } if (inputText.includes('jpg') | inputText.includes('jpeg')) {
                addToGallery(inputText)
                document.querySelector('#input-url').value = ''
            } else {return false;}
        }
            
    }
})

// Delete image from gallery
document.addEventListener('click', function(e){
    if(e.target && e.target.matches('.images-gallery__delete-btn')){
         e.target.parentNode.remove()
    }
});

// This functions adds image to the end of the gallery
function addToGallery(url) {
    let imgWrapper = document.createElement("div")
    imgWrapper.classList.add('images-gallery__image-wrapper')
    
    let image = document.createElement("img")
    image.classList.add('images-gallery__image')
    image.src = url
    
    let delBtn = document.createElement("div")
    delBtn.classList.add('images-gallery__delete-btn')

    imgWrapper.appendChild(image)
    imgWrapper.appendChild(delBtn)
    
    document.querySelector('.images-gallery').appendChild(imgWrapper)
}

// This functions fetches and parse json file and adds all images grom file to the gallery
function fetchAndParseJson(url) {
    fetch(url)
    .then(response => response.json())
    .then(function(data) {
        for (let key in data.galleryImages) {
            
            let imageUrl = data.galleryImages[key].url
            addToGallery(imageUrl)
            } 
    })
}

// Drap and drop image to the gallery
function dropHandler(ev) {

    ev.preventDefault();

    if (ev.dataTransfer.items) {
        for (let i = 0; i < ev.dataTransfer.items.length; i++) {
            if (ev.dataTransfer.items[i].kind === 'file' && ev.dataTransfer.items[i].type === 'image/jpeg') {
                let file = ev.dataTransfer.items[i].getAsFile();
                addFileToGallery(file)
            }
        }
    } else {
        return false
    }
}

function dragOverHandler(ev) {
    ev.preventDefault();
}

function addFileToGallery(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function () {
        addToGallery(reader.result)
    }
}
