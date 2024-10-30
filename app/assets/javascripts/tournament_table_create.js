document.addEventListener("DOMContentLoaded", () => {
  const tournamentSelect = document.getElementById("tournament_table_tournament_id");
  const categorySelect = document.getElementById("tournament_table_tournament_category_id");
  const divisionSelect = document.getElementById("tournament_table_tournament_division_id");

  // 大会が変更された場合にカテゴリを更新
  tournamentSelect.addEventListener("change", (event) => {
    const tournamentId = event.target.value;

    // Fetch categories for selected tournament
    fetch(`/tournaments/${tournamentId}/categories`)
      .then((response) => response.json())
      .then((data) => {
        // カテゴリ選択肢を更新
        categorySelect.innerHTML = "";
        data.categories.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.id;
          option.text = category.category_type;
          categorySelect.appendChild(option);
        });

        // カテゴリを変更したためディビジョンもクリア
        divisionSelect.innerHTML = "";
      })
      .catch((error) => console.error("Error fetching categories:", error));
  });

  // カテゴリが変更された場合にディビジョンを更新
  categorySelect.addEventListener("change", (event) => {
    const categoryId = event.target.value;

    // Fetch divisions for selected category
    fetch(`/categories/${categoryId}/divisions`)
      .then((response) => response.json())
      .then((data) => {
        // ディビジョン選択肢を更新
        divisionSelect.innerHTML = "";
        data.divisions.forEach((division) => {
          const option = document.createElement("option");
          option.value = division.id;
          option.text = division.division;
          divisionSelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching divisions:", error));
  });
});
