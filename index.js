const userSlider = document.getElementById("userSlider");
const userCountOutput = document.getElementById("userCount");
const plans = document.querySelectorAll(".plan");

userSlider.addEventListener("input", highlightPlan);
userSlider.addEventListener("input", updateSliderValue);

function updateSliderValue() {
  const userCount = userSlider.value;
  userCountOutput.textContent = userCount;
}

function highlightPlan() {
  const userCount = parseInt(userSlider.value);

  plans.forEach((plan) => {
    plan.classList.remove("active");
  });

  if (userCount > 0 && userCount <= 10) {
    plans[0].classList.add("active");
  } else if (userCount >= 11 && userCount <= 20) {
    plans[1].classList.add("active");
  } else if (userCount >= 21 && userCount <= 30) {
    plans[2].classList.add("active");
  }
}


const submit = document.getElementById("submit");

submit.addEventListener("click", function () {
  const name = document.getElementById("firstname").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const userData = new FormData();
//   userData.append("accesscode", "4CALQVW2Z8WKFA16AFI795SWY");
  userData.append("firstname", name);
  userData.append("email", email);
  userData.append("message", message);
  // console.log(userData);

  const accessCode = "4CALQVW2Z8WKFA16AFI795SWY";
  const endpoint = "https://forms.maakeetoo.com/formapi/934";

  fetch("https://forms.maakeetoo.com/formapi/934", {
    method: "POST",
    headers: {
        'Access-Control-Allow-Origin': accessCode,
        endpoint: endpoint,
      },
    body: userData,
    mode: "no-cors",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      const modal1 = new bootstrap.Modal(document.getElementById("PricingModal"));
      modal1.hide();
      document.getElementById("firstname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      alert("Form submitted successfully! Congrats!!");
    });
});


const dataContainer = document.getElementById("data-container");
const loadingTrigger = document.getElementById("trigger-load");
const loadingAnimation = document.getElementById("animation-load");
let page = 1;

const showLoadingAnimation = () => {
  loadingAnimation.style.display = "block";
};

const hideLoadingAnimation = () => {
  loadingAnimation.style.display = "none";
};

const createProductCard = (item) => {
  const productCard = document.createElement("div");
  productCard.className = "product-card";


  const productTitle = document.createElement("p");
  productTitle.textContent = item.title;

  productCard.appendChild(productTitle);

  return productCard;
};
const loadMoreData = () => {
  showLoadingAnimation();


  setTimeout(() => {
    console.log("Requesting data...");
    fetch(`https://jsonplaceholder.typicode.com/users/1/posts?_page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item) => {
          const productCard = createProductCard(item);
          dataContainer.appendChild(productCard);
        });

        page++;
        hideLoadingAnimation();
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, 2000);
};

const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadMoreData();
    }
  });
};

const observer = new IntersectionObserver(handleIntersection, {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
});

observer.observe(loadingTrigger);

loadMoreData();