$(".cards-container").sortable({
  connectWith: ".cards-container",
  revert: true,
  revertDuration: 70,
});

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

$(".create-card-close").click(function () {
  $(".create-card-container").hide();
});
