
$(document).ready(function() {

  $("#manageembedded").click(function() {
    document.getElementById("manageuser").classList.remove("selected");
    document.getElementById("manageembedded").classList.add("selected");
    document.getElementById("manageembeddedcontent").classList.remove("unshowcontent");
    document.getElementById("manageembeddedcontent").classList.add("showcontent");
    document.getElementById("manageusercontent").classList.remove("showcontent");
    document.getElementById("manageusercontent").classList.add("unshowcontent");
  })

  $("#manageuser").click(function() {
    document.getElementById("manageembedded").classList.remove("selected");
    document.getElementById("manageuser").classList.add("selected");
    document.getElementById("manageusercontent").classList.remove("unshowcontent");
    document.getElementById("manageusercontent").classList.add("showcontent");
    document.getElementById("manageembeddedcontent").classList.remove("showcontent");
    document.getElementById("manageembeddedcontent").classList.add("unshowcontent");
  })

});
