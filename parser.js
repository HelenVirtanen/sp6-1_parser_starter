// @todo: напишите здесь код парсера
function getTwoFirstWords(str) {
    return str.trim().split(" ").slice(0, 2).join(" ");
}

function getShortPath(path) {
    const lastSlash = path.lastIndexOf("/");
    return path.slice(lastSlash);
}

function getMetaContent(name) {
    let metaAttribute = document.querySelector(`meta[name="${name}"]`);
    return metaAttribute.getAttribute('content').trim();
}

function getMetaOpengraph() {
    const opengraph = {};

    const ogProperties = document.querySelectorAll('meta[property^="og:"]');

    for (let ogProperty of ogProperties) {
        const ogPropertyType = ogProperty.getAttribute('property').split(":")[1];
        let ogContent = ogProperty.getAttribute("content");
        opengraph[ogPropertyType] = ogContent;

        if (ogPropertyType === "title") {
            opengraph.title = getTwoFirstWords(ogContent);
        }
        
        if (ogPropertyType === "image") {
            opengraph.image = getShortPath(ogContent);
        }
    }

    return opengraph;
}

function getMeta() {
    const meta = {};
    
    meta.title = getTwoFirstWords(document.querySelector("title").textContent);
    meta.description = getMetaContent('description');
    meta.keywords = getMetaContent('keywords').split(",");
    meta.language = document.documentElement.lang;
    meta.opengraph = getMetaOpengraph();


    console.log(meta);
    return meta;
}

function getProduct() {
    const product = {}

    product.id = document.querySelector(".product").dataset.id;
    product.name = document.querySelector("h1.title").textContent;

    const likeButton = document.querySelector(".like");
    product.isLiked = likeButton.classList.contains("active");

    return product;
}

// function getSuggested() {

// }

// function getReviews() {

// }

function parsePage() {
    return {
        meta: getMeta(),
        product: getProduct(),
        suggested: [],
        reviews: []
    };
}

// window.parsePage = parsePage;