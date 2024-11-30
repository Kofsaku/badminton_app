document.addEventListener("DOMContentLoaded", () => {
  const size = parseInt(document.querySelector("table").dataset.size, 10);
  const totalOptions = Array.from({ length: size * size }, (_, i) => i + 1);
  let selectedValues = [];

  // 各セルの選択リストと選手名の同期
  document.querySelectorAll("select[name='match_numbers[]']").forEach(select => {
    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.text = "Select";
    select.prepend(emptyOption);
    select.value = "";

    select.addEventListener("change", event => {
      const selectedValue = parseInt(event.target.value, 10);
      const previousValue = parseInt(event.target.getAttribute("data-previous-value"), 10);
      
      if (!isNaN(previousValue)) {
        selectedValues = selectedValues.filter(val => val !== previousValue);
      }

      if (!isNaN(selectedValue)) {
        selectedValues.push(selectedValue);
      }

      event.target.setAttribute("data-previous-value", selectedValue);

      document.querySelectorAll("select[name='match_numbers[]']").forEach(select => {
        const currentValue = parseInt(select.getAttribute("data-previous-value"), 10);
        select.innerHTML = "";

        totalOptions.forEach(optionValue => {
          if (!selectedValues.includes(optionValue) || optionValue === currentValue) {
            const option = document.createElement("option");
            option.value = optionValue;
            option.text = optionValue;
            select.appendChild(option);
          }
        });

        const emptyOption = document.createElement("option");
        emptyOption.value = "";
        emptyOption.text = "Select";
        select.prepend(emptyOption);

        select.value = currentValue || "";
      });
    });
  });

  // 横列で選択された選手名を縦列に表示
  document.querySelectorAll(".player-select").forEach((select, index) => {
    select.addEventListener("change", event => {
      const selectedPlayerName = event.target.options[event.target.selectedIndex].text;
      
      const correspondingCell = document.querySelector(`.player-name[data-index='${index}']`);
      if (correspondingCell) {
        correspondingCell.innerText = selectedPlayerName;
      }
    });
  });
});
