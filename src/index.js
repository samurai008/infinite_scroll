import "./styles.css";

const app = document.getElementById("app");

// https://reqres.in/api/unknown?per_page=2
// https://reqres.in/api/unknown?per_page=2&page=2
// https://reqres.in/api/unknown?per_page=2&page=3
// ...

/*
{
  "page": 2,
  "per_page": 2,
  "total": 12,
  "total_pages": 6,
  "data": [
    {
      "id": 3,
      "name": "true red",
      "year": 2002,
      "color": "#BF1932",
      "pantone_value": "19-1664"
    },
    {
      "id": 4,
      "name": "aqua sky",
      "year": 2003,
      "color": "#7BC4C4",
      "pantone_value": "14-4811"
    }
  ]
}
*/

// https://reqres.in/api/unknown?per_page=2

let rel_count = 1;
let observer = new IntersectionObserver(callback);
let last_item;

function callback(entries, ob) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      init(rel_count);
    }
  });
}

function init(num = 1) {
  fetch("https://reqres.in/api/unknown?per_page=15&per_page=" + num)
    .then(response => response.json())
    .then(data => {
      const items = data.data;

      for (let i = 0; i < items.length; i++) {
        const list_item = document.createElement("div");
        list_item.style.background = items[i].color;
        list_item.innerHTML = items[i].pantone_value;
        if (i === items.length - 1) {
          if (last_item) {
            observer.unobserve(last_item);
          }
          last_item = list_item;
          observer.observe(last_item);
        }
        app.appendChild(list_item);
      }
      rel_count++;
    });
}

init();
