// app/assets/javascripts/tournament_tables.js
console.log("aaaaaaa")
document.addEventListener("DOMContentLoaded", () => {
  const playerSelects = document.querySelectorAll(".player-select");

  console.log("aaaaaaa")
  playerSelects.forEach(select => {
    select.addEventListener("change", event => {
      const selectedText = event.target.options[event.target.selectedIndex].text;
      const index = event.target.dataset.index;

      // 対応する縦の列を更新
      const nameCell = document.querySelector(`.player-name[data-index='${index}']`);
      if (nameCell) {
        nameCell.innerText = selectedText;
      }
    });
  });
});
