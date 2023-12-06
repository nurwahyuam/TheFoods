document.addEventListener("DOMContentLoaded", () => {
  let makananAcak;
  let kategori = [];
  let makananKategori;

  const getRandomMeal = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json();
      makananAcak = data.meals[0];
      console.log(makananAcak);
      displayResult();
    } catch (error) {
      console.error('Error fetching random meal:', error);
    }
  };

  const getMealCategories = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const data = await response.json();
      kategori = data.categories;
      console.log(kategori);
      displayCategories();
    } catch (error) {
      console.error('Error fetching meal categories:', error);
    }
  };

  const getMealByCategory = async (selectedCategory) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
      const data = await response.json();
      makananKategori = data.meals;
      console.log(makananKategori);
      displayResult();
    } catch (error) {
      console.error('Error fetching meal by category:', error);
    }
  };

  document.getElementById('randomMealBtn').addEventListener('click', getRandomMeal);

  document.getElementById('categorySelect').addEventListener('change', (event) => {
    const selectedCategory = event.target.value;
    getMealByCategory(selectedCategory);
  });

  const displayResult = () => {
    const resultContainer = document.getElementById('card-list');
    resultContainer.innerHTML = makananAcak
      ? `<div class="col-md-auto">
      <h2 class="text-center mb-3" style="font-weight: 600;">${makananAcak.strMeal}</h2>
      <div class="card text-center" style="width: 35rem;">
        <img src="${makananAcak.strMealThumb}" class="card-img-top" alt="${makananAcak.strMeal}">
        <div class="card-body">
          <h5 class="card-title">Resep</h5>
          <p class="card-text" style="font-size: 12px;">${makananAcak.strInstructions}</p>
          <a href="#home" class="btn text-white randomMealBtn" style="background-color: #8c4303; border: 2px solid #d9843b; border-radius: 20px;"">Cari yang Lain!</a>
        </div>
      </div>
    </div>`
      : makananKategori.map((meal) => `<div class="col-md-3 mt-4">
      <div class="card text-center" style="width: 100%; max-height: 24rem; padding: 50px; border: 2px solid #d9843b;">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}" style="aspect-ratio: 3/4; object-fit: contain;"/>
        <div class="card-body text-center mt-3">
          <p class="card-text" style="font-size: 12px;">${meal.strMeal}</p>
          </div>
          </div>
    </div>`).join('');

    resultContainer.appendChild(resultElement);
  };

  const displayCategories = () => {
    const categorySelect = document.getElementById('categorySelect');
    categorySelect.innerHTML = '<option value="">Pilih Kategori</option>' + kategori.map((category) => `<option value="${category.strCategory}">${category.strCategory}</option>`).join('');
  };

  getMealCategories();
});
