
const som = document.getElementById('som')
const usd = document.getElementById('usd');
const euro = document.getElementById('euro');
console.log(som, usd, euro);

// som.addEventListener("input", () => {
//   const req = new XMLHttpRequest();
//   req.open("GET", "data.json");
//   req.setRequestHeader("Content-type", "application/json");
//   req.send();
//   req.addEventListener("load", () => {
//     const response = JSON.parse(req.response);
//     usd.value = (som.value / response.usd).toFixed(2);
//   });
// });

const convert = (elem, target, target2) => {
    elem.addEventListener("input", () => {
        const req = new XMLHttpRequest();
        req.open("GET", "data.json");
        req.setRequestHeader("Content-type", "application/json");
        req.send();
        req.addEventListener("load", () => {
            const response = JSON.parse(req.response);
            if (elem === som){
                target.value = (elem.value / response.usd).toFixed(2)
                target2.value = (elem.value / response.euro).toFixed(2)
            }else if(elem === usd){
                target.value = (elem.value * response.usd).toFixed(2)
                target2.value = (elem.value * response.usd / response.euro).toFixed(2)
            }else if(elem === euro){
                target.value = (elem.value * response.euro).toFixed(2)
                target2.value = (elem.value * response.euro / response.usd).toFixed(2)
            }
            elem.value === "" && (target.value = "");
            elem.value === "" && (target2.value = "");
        });
    });
};

convert(som, usd, euro)
convert(usd, som, euro)
convert(euro, som, usd)

// let emir = new XMLHttpRequest();

// let body = 'name=' + encodeURIComponent(name) +
//     '&surname=' + encodeURIComponent(surname);


// emir.open("POST", '/submit', true);
// emir.setRequestHeader('Content-type', 'application/x-www-urlencoded');

// emir.onreadystatetechange = body; 
// emir.send(body);

const forms = document.querySelectorAll("form");
console.log(forms);

const postData = (form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const request = new XMLHttpRequest();
    request.open("POST", "server.php");
    request.setRequestHeader("Content-type", "application/json");

    const formData = new FormData(form);

    const obj = {};

    formData.forEach((item, i) => {
      obj[i] = item;
    });

    const json = JSON.stringify(obj);

    request.send(json);

    request.addEventListener("load", () => {
      if (request.status === 200) {
        console.log(request.response);
      } else {
        console.log("error");
      }
    });
  });
};

forms.forEach((item) => {
  postData(item);
});