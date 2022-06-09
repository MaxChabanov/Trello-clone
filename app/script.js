function updateSortable() {
  $(".cards-container").sortable({
    connectWith: ".cards-container",
    revert: true,
    revertDuration: 70,
  });
}
updateSortable();

$("textarea")
  .each(function () {
    this.setAttribute(
      "style",
      "height:" + this.scrollHeight + "px;overflow-y:hidden;"
    );
  })
  .on("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });

function updateCreateCards() {
  $(".add-new-card").click(function (event) {
    let listId = event.target.id.slice(-1);

    $(`.create-card-container`).hide();

    $(`#create-card-container${listId}`).show();
  });

  $(".create-card-btn").click(function (event) {
    let listId = event.target.id.slice(-1);

    let cardName = $(`#create-card-input${listId}`).val();

    if (cardName) {
      $(`#card-container${listId}`).append(
        `<div class="card">
      <span class="card-text">${cardName}</span>
      <img src="assets/edit-pencil.svg" class="card-edit" alt="Edit" />
    </div>`
      );

      $(`#create-card-container${listId}`).hide();
      $(".create-card-input").val("");
    }
  });
}
updateCreateCards();

$(".create-card-close").click(function () {
  $(".create-card-container").hide();
});

function animate() {
  $(".create-new-list-btn").click(function () {
    $(".create-new-list-btn").animate(
      { height: "0", padding: "0" },
      300,
      function () {
        $(".create-list-container").show();
        $(".create-list-container").animate(
          { height: "100px", padding: "8px" },
          300
        );

        $(".create-new-list-btn").hide();
      }
    );
  });

  $(".create-list-close").click(function () {
    $(".create-list-container").animate(
      { height: "0", padding: "0" },
      300,
      function () {
        $(".create-list-container").hide();

        $(".create-new-list-btn").animate(
          { height: "50px", padding: "10px" },
          300
        );
        $(".create-new-list-btn").show();
      }
    );
  });
}
animate();

function createListClick() {
  $(".create-list-btn").click(function () {
    let newListTitle = $(".create-list-input").val();
    let newListId = $(".list").length + 1;

    if (newListTitle) {
      $(".create-new-list-btn").remove();
      $(".create-list-container").remove();

      $(".taskboard-main").append(
        `
  <div class="list">
        <p class="list-title">${newListTitle}</p>

        <div class="cards-container" id="card-container${newListId}">
    
        </div>

        <div class="create-card-container" id="create-card-container${newListId}">
          <textarea
            type="text"
            id="create-card-input${newListId}"
            class="create-card-input"
            maxlength="100"
            placeholder="Enter card title"
          ></textarea>
          <div class="create-card-controls">
            <button class="create-card-btn"  id="create-card-btn${newListId}">
              Add card
            </button>
            <img
              src="assets/close.svg"
              alt="Close"
              draggable="false"
              class="create-card-close"
            />
          </div>
        </div>

        <p class="add-new-card" id="add-new-card${newListId}">
          <span class="add-new-card-plus">+</span> Add new card
        </p>
      </div>
  `
      );

      updateSortable();
      updateCreateCards();

      updateListCreationControls();
      animate();
    }
  });
}
createListClick();

function updateListCreationControls() {
  $(".taskboard-main").append(`
    <div class="create-list-container">
        <input
          type="text"
          class="create-list-input"
          placeholder="Enter list title"
        />
        <div class="create-list-controls">
          <button class="create-list-btn">Add list</button>
          <img src="assets/close.svg" alt="Close" class="create-list-close" />
        </div>
      </div>
  `);
  $(".taskboard-main").append(`
      <button class="create-new-list-btn">
        <span class="create-new-list-plus">+</span> Add new list
      </button>
  `);

  $(".create-new-list-btn").css({ height: "50px", padding: "10px" });
  $(".create-list-container").hide();

  createListClick();
}
