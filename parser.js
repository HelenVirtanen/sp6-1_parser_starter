// @todo: напишите здесь код парсера
function getMetaContent(name) {
    let metaAttribute = document.querySelector(`meta[name="${name}"]`);
    return metaAttribute.getAttribute('content').trim();
}

function getMeta() {
    const meta = {};
    
    meta.title = document.querySelector("h1.title").textContent;
    meta.description = getMetaContent('description');
    meta.keywords = getMetaContent('keywords').split(",");

    meta.language = document.documentElement.lang;

    console.log(meta);
    return meta
}

getMeta();

// function getProduct() {

// }

// function getSuggested() {

// }

// function getReviews() {

// }

// function parsePage() {
//     return {
//         meta: {},
//         product: {},
//         suggested: [],
//         reviews: []
//     };
// }

// window.parsePage = parsePage;