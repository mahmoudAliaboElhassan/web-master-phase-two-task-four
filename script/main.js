console.log("Hello, World!");

let currentPage = 1;
const limit = 6;

function loadMenu(page = 1) {
  const skip = (page - 1) * limit;
  fetch(`https://dummyjson.com/recipes?limit=${limit}&skip=${skip}`)
    .then((res) => res.json())
    .then((data) => {
      const recipes = data.recipes;
      const totalRecipes = data.total;
      const totalPages = Math.ceil(totalRecipes / limit);
      currentPage = page;

      const menuContent = recipes
        .map(
          (recipe) => `
            <div class="bg-white p-4 rounded-lg shadow">
                <img src="${recipe.image}" alt="${recipe.name}" class="rounded w-full h-40 object-cover">
                <h3 class="text-xl font-semibold mt-2">${recipe.name}</h3>
            </div>
          `
        )
        .join("");

      const paginationControls = `
          <div class="flex justify-center mt-6 space-x-4">
              <button onclick="loadMenu(${currentPage - 1})" ${
        currentPage === 1 ? "disabled" : ""
      } class="px-4 py-2 bg-gray-300 rounded">Previous</button>
              <span class="text-lg font-semibold">Page ${currentPage} of ${totalPages}</span>
              <button onclick="loadMenu(${currentPage + 1})" ${
        currentPage === totalPages ? "disabled" : ""
      } class="px-4 py-2 bg-gray-300 rounded">Next</button>
          </div>`;

      pages.menu = `
          <section class="text-center">
              <h2 class="text-4xl font-bold text-red-600">Our Menu</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                  ${menuContent}
              </div>
              ${paginationControls}
          </section>`;

      if (document.getElementById("content").innerHTML.includes("Our Menu")) {
        document.getElementById("content").innerHTML = pages.menu;
      }
    })
    .catch((error) => console.error("Error fetching recipes:", error));
}

const pages = {
  home: `
      <section class="text-center">
          <h2 class="text-4xl font-bold text-red-600">Welcome to McDonald's</h2>
          <p class="mt-4 text-lg">Enjoy the best meals with us. Fresh ingredients, amazing flavors!</p>
          <img src="../imgs/pexels-life-of-pix-67468.jpg" alt="Restaurant Image" class="mt-6 mx-auto rounded-lg shadow-lg">
      </section>`,
  menu: `
      <section class="text-center">
          <h2 class="text-4xl font-bold text-red-600">Our Menu</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              <p>Loading menu...</p>
          </div>
      </section>`,
  contact: `
      <section class="text-center p-6">
          <h2 class="text-4xl font-bold text-red-600">Contact Us</h2>
          <p class="mt-4 text-lg">📍 McDonald's Headquarters</p>
          <p class="mt-2 text-lg">110 N Carpenter St, Chicago, IL 60607, USA</p>
          <p class="mt-2 text-lg">📞 +1 800-244-6227</p>
          <p class="mt-2 text-lg">✉️ contact@mcdonalds.com</p>
              <div class="mt-6">
                <h3 class="text-2xl font-semibold text-red-600">Find Us on the Map</h3>
                <div class="mt-4">
                    <iframe
                        class="w-full max-w-2xl h-80 mx-auto rounded-lg shadow-lg"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2963.2149566531974!2d-87.65188052408262!3d41.88398407121883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2ca763bd340d%3A0x9f5243f92c0e5ad3!2sMcDonald&#39;s%20Global%20Headquarters!5e0!3m2!1sen!2sus!4v1710567836467!5m2!1sen!2sus"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
      </section>`,
  about: `
      <section class="text-center p-6">
          <h2 class="text-4xl font-bold text-red-600">Our Story</h2>
          <p class="mt-4 text-lg">
              McDonald's has been serving amazing dishes since 1999. Fresh ingredients and love in every bite!
          </p>
          <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <img src="../imgs/kitchen.jpg" alt="Restaurant Kitchen" class="rounded-lg shadow-lg">
              <div>
                  <h3 class="text-2xl font-semibold text-red-600">Our Mission</h3>
                  <p class="mt-2 text-lg">
                      To bring joy through delicious, high-quality food while maintaining exceptional customer service.
                  </p>
              </div>
          </div>
          <div class="mt-6">
              <h3 class="text-2xl font-semibold text-red-600">Why Choose Us?</h3>
              <ul class="mt-2 text-lg space-y-2">
                  <li>✅ Fresh and high-quality ingredients</li>
                  <li>✅ Affordable and tasty meals</li>
                  <li>✅ Friendly and fast service</li>
                  <li>✅ A wide variety of delicious options</li>
              </ul>
          </div>
      </section>
      <script>
          console.log("Hello, World! Welcome to the About Page.");
      </script>
      `,
};

document.getElementById("content").innerHTML = pages.home;

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const page = this.getAttribute("data-page");
    document.getElementById("content").innerHTML = pages[page];

    if (page === "menu") {
      loadMenu();
    }
  });
});
