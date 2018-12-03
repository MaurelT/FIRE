/* Set the width of the side navigation to 250px */


window.onload = function heightWindow() {

  $("#closeToolbar").click(function(){
    closeNav();
  });
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  $("#closeToolbar").css("visibility", "visible")
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    $("#closeToolbar").css("visibility", "hidden")
}
