var jsdom = require("jsdom").jsdom;
global.$ = require("jquery/dist/jquery")(jsdom().createWindow());
$(function () {
  alert("Your book is overdue.");
});
