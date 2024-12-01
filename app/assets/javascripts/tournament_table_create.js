document.addEventListener("DOMContentLoaded", () => {
  const tournamentDropdown = document.getElementById("tournament-dropdown");
  const categoryDropdown = document.getElementById("category-dropdown");
  const divisionDropdown = document.getElementById("division-dropdown");

  // Fetch categories when a tournament is selected
  tournamentDropdown.addEventListener("change", function () {
    const tournamentId = this.value;

    if (tournamentId) {
      fetch(`/tournaments/${tournamentId}/categories`)
        .then((response) => response.json())
        .then((data) => {
          categoryDropdown.innerHTML = '<option value="">Select Category</option>';
          data.categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.category_type;
            categoryDropdown.appendChild(option);
          });
          divisionDropdown.innerHTML = '<option value="">Select Division</option>'; // Reset divisions
        });
    } else {
      categoryDropdown.innerHTML = '<option value="">Select Category</option>';
      divisionDropdown.innerHTML = '<option value="">Select Division</option>';
    }
  });

  // Fetch divisions when a category is selected
  categoryDropdown.addEventListener("change", function () {
    const categoryId = this.value;

    if (categoryId) {
      fetch(`/categories/${categoryId}/divisions`)
        .then((response) => response.json())
        .then((data) => {
          divisionDropdown.innerHTML = '<option value="">Select Division</option>';
          data.divisions.forEach((division) => {
            const option = document.createElement("option");
            option.value = division.id;
            option.textContent = division.division;
            divisionDropdown.appendChild(option);
          });
        });
    } else {
      divisionDropdown.innerHTML = '<option value="">Select Division</option>';
    }
  });
});
