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
  return metaAttribute.getAttribute("content").trim();
}

function getMetaOpengraph() {
  const opengraph = {};

  const ogProperties = document.querySelectorAll('meta[property^="og:"]');

  for (let ogProperty of ogProperties) {
    const ogPropertyType = ogProperty.getAttribute("property").split(":")[1];
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
  meta.description = getMetaContent("description");
  meta.keywords = getMetaContent("keywords").split(",");
  meta.language = document.documentElement.lang;
  meta.opengraph = getMetaOpengraph();

  return meta;
}

function getTags(arr) {
  const tags = {
    category: [],
    label: [],
    discount: [],
  };

  const colorsMap = {
    green: "category",
    blue: "label",
    red: "discount",
  };

  arr.forEach((tag) => {
    for (let [color, key] of Object.entries(colorsMap)) {
      if (tag.classList.contains(color)) {
        tags[key].push(tag.textContent.trim());
      }
    }
  });

  return tags;
}

function calculateDiscount(oldprice, newprice) {
    return oldprice - newprice;
}

function calculateDiscountPercent(oldPrice, discount) {
    return ((discount * 100) / oldPrice).toFixed(2);
};

function getCurrency(currency) {
    const currenciesMap = {
        '₽': "RUB",
        '$': "USD",
    }

    return currenciesMap[currency];
}

function getProperties(arr) {
    const properties = {};

   arr.forEach((property) => {
        const propItems = property.querySelectorAll("span");
        if (propItems.length >= 2) {
            const key = propItems[0].textContent.trim();
            const value = propItems[1].textContent.trim();
            properties[key] = value;
        }
    })

    return properties;
}

function getProduct() {
  const product = {};

  product.id = document.querySelector(".product").dataset.id;
  product.name = document.querySelector("h1.title").textContent;

  const likeButton = document.querySelector(".like");
  product.isLiked = likeButton.classList.contains("active");

  const tagsList = document.querySelectorAll(".tags span");
  product.tags = getTags(tagsList);

  const price = document.querySelector(".price");
  product.price = +price.firstChild.textContent.trim().replace("₽", "");
  product.oldPrice = +price.querySelector("span").textContent.trim().replace("₽", "");
  product.discount = calculateDiscount(product.oldPrice, product.price);
  product.discountPercent = calculateDiscountPercent(product.oldPrice, product.discount);
  product.currency = getCurrency(price.textContent.trim()[0]);

  const properties = document.querySelectorAll(".properties li");
  product.properties = getProperties(properties);

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
    reviews: [],
  };
}

// window.parsePage = parsePage;
