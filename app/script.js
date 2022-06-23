$(`.lists-container`).append(localStorage.getItem("lists-container"));

function updateSortable() {
  $(".cards-container").sortable({
    connectWith: ".cards-container",
    revert: true,
    revertDuration: 70,
    cursor: "grabbing",
    stop: function () {
      localStorage.setItem(
        `lists-container`,
        $(`.lists-container`).prop("innerHTML")
      );
    },
  });
}
updateSortable();

$(".create-card-input")
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
    event.target.id = event.target.id;

    let listId = event.target.id.slice(-1);
    let cardId = $(`#card-container${listId}`).children().length + 1;

    let cardName = $(`#create-card-input${listId}`).val();

    if (cardName) {
      $(`#card-container${listId}`).append(
        `<div class="card" id="card${cardId}-${listId}">
              <textarea
                type="text"
                class="card-text-input"
                id="input${cardId}-${listId}" 
                maxlength="85"
              ></textarea>

              <span class="card-text" id="cardtext${cardId}-${listId}">${cardName}</span>
              <img
                src="assets/edit-pencil.svg"
                class="card-edit"
                alt="Edit"
                id="edit${cardId}-${listId}"
              />
              <img
                src="assets/tick.svg"
                class="card-edit-close"
                alt="Edit"
                id="editclose${cardId}-${listId}"
              />
            </div>`
      );

      $(`#create-card-container${listId}`).hide();
      $(".create-card-input").val("");

      updateCardEdit();

      localStorage.setItem(
        `list${listId}`,
        $(`#list${listId}`).prop("outerHTML")
      );

      localStorage.setItem(
        `lists-container`,
        $(`.lists-container`).prop("innerHTML")
      );
    }
  });
}
updateCreateCards();

function updateCreateCardClose() {
  $(".create-card-close").click(function () {
    $(".create-card-container").hide();
  });
}
updateCreateCardClose();

function animate() {
  $(".create-new-list-btn").click(function () {
    $(".create-new-list-btn").animate(
      { height: "0", padding: "0" },
      300,
      function () {
        $(".create-list-container").show();
        $(".create-list-container").animate(
          { height: "105px", padding: "8px" },
          300
        );

        $(".create-new-list-btn").hide();

        $(".create-list-btn").click(function () {
          $(".create-new-list-btn").css({ height: "50px", padding: "10px" });
          $(".create-list-container").css({ height: "0", padding: "0" });
        });
      }
    );
  });

  $(".create-list-close").click(function () {
    $(".create-list-container").animate(
      { height: "0", padding: "0" },
      300,
      function () {
        $(".create-list-container").hide();
        $(".create-new-list-btn").show();

        $(".create-new-list-btn").animate(
          { height: "50px", padding: "10px" },
          300
        );
      }
    );
  });
}
animate();

function createListClick() {
  $(".create-list-btn").click(function () {
    let newListTitle = $(".create-list-input").val();
    let newListId = 0;

    if ($(".list").children().last().length) {
      newListId = +$(".list").children().last().attr("id").slice(-1) + 1;
    } else {
      newListId = 1;
    }

    if (newListTitle) {
      $(".lists-container").append(`
        <div class="list" id="list${newListId}">
          <div class="list-head">
            <p class="list-title" contenteditable="true" id="title${newListId}">
              ${newListTitle}
            </p>
            <img
              src="assets/delete.svg"
              alt="delete"
              class="delete-list"
              id="delete-list${newListId}"
            />
          </div>

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
              <button class="create-card-btn" id="create-card-btn${newListId}">
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
        </div>`);

      $(".create-list-container").hide();
      $(".create-new-list-btn").show();

      updateSortable();
      updateCreateCards();

      animate();
      updateCreateCardClose();
      updateDeleteList();
      updateListEdit();

      localStorage.setItem(
        `list${newListId}`,
        $(`#list${newListId}`).prop("outerHTML")
      );
      localStorage.setItem(
        `lists-container`,
        $(`.lists-container`).prop("innerHTML")
      );

      $(".create-list-input").val("");
    }
  });
}
createListClick();

// Delete a list

function updateDeleteList() {
  $(".delete-list").click(function (event) {
    let listId = event.target.id.slice(-1);
    $(".delete-dialog").dialog({
      autoOpen: false,
      dialogClass: "no-close",
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      draggable: false,
      show: { effect: "fade", duration: 150 },
      hide: { effect: "fade", duration: 150 },
      buttons: [
        {
          text: "Cancel",
          click: function () {
            $(this).dialog("close");
          },
        },
        {
          text: "OK",
          class: "delete-btn",
          click: function () {
            $(this).dialog("close");
            $(`#list${listId}`).remove();

            localStorage.removeItem(`list${listId}`);
            localStorage.setItem(
              `lists-container`,
              $(`.lists-container`).prop("innerHTML")
            );
          },
        },
      ],
    });

    $(".delete-dialog").dialog("open");
  });
}

updateDeleteList();

// Editing a card
isEditing = false;

function updateCardEdit() {
  $(".card-edit").click(function (event) {
    if (isEditing == false) {
      isEditing = true;

      let cardId = event.target.id.slice(-3, -2);
      let listId = event.target.id.slice(-1);

      $(".cards-container").sortable("disable");
      $(`#input${cardId}-${listId}`).show();
      $(`#cardtext${cardId}-${listId}`).hide();

      $(`#input${cardId}-${listId}`).val(
        $(`#cardtext${cardId}-${listId}`).text()
      );

      $(".card-edit").css(
        "filter",
        "invert(30%) sepia(98%) saturate(1356%) hue-rotate(341deg) brightness(94%) contrast(111%)"
      );

      $(`#editclose${cardId}-${listId}`).css({
        filter: "none",
        width: "25px",
        height: "25px",
        "background-color": "hsl(312deg 100% 64%)",
        "border-radius": "20px",
        filter: "invert(1)",
      });

      $(`#editclose${cardId}-${listId}`).show();
      $(`#edit${cardId}-${listId}`).hide();

      $(`#editclose${cardId}-${listId}`).click(function () {
        if ($(`#input${cardId}-${listId}`).val()) {
          $(`#cardtext${cardId}-${listId}`).text(
            $(`#input${cardId}-${listId}`).val()
          );
          $(`#cardtext${cardId}-${listId}`).show();
          $(`#input${cardId}-${listId}`).hide();

          $(".card-edit-close").hide();
          $(".card-edit").show();

          $(".card-edit").css("filter", "none");

          $(".cards-container").sortable("enable");

          isEditing = false;

          localStorage.setItem(
            `list${listId}`,
            $(`#list${listId}`).prop("outerHTML")
          );
          localStorage.setItem(
            `lists-container`,
            $(`.lists-container`).prop("innerHTML")
          );
        } else {
          $(".card-edit").css("filter", "none");

          $(".cards-container").sortable("enable");

          $(`#card${cardId}-${listId}`).remove();
          isEditing = false;

          localStorage.setItem(
            `list${listId}`,
            $(`#list${listId}`).prop("outerHTML")
          );
          localStorage.setItem(
            `lists-container`,
            $(`.lists-container`).prop("innerHTML")
          );
        }
      });
    }
  });
}

updateCardEdit();

// Editing list title
function updateListEdit() {
  $(".list-title").keydown(function (event) {
    let listId = event.target.id.slice(-1);

    if ($(`#title${listId}`).text().length > 30 && event.keyCode != 8) {
      $(`#title${listId}`).attr("contenteditable", "false");
      $(`#title${listId}`).attr("contenteditable", "true");
    }
    localStorage.setItem(
      `list${listId}`,
      $(`#list${listId}`).prop("outerHTML")
    );
    localStorage.setItem(
      `lists-container`,
      $(`.lists-container`).prop("innerHTML")
    );
  });
}

updateListEdit();

// Setting background
$("#avatar-input").change(function () {
  var file = $("#avatar-input")[0].files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    $(".taskboard-main").css(
      "background-image",
      'url("' + reader.result + '")'
    );
  };
  if (file) {
    reader.readAsDataURL(file);
  } else {
    $(".taskboard-main").css(
      "background-color",
      "radial-gradient(#292929, #191818);"
    );
  }
});
