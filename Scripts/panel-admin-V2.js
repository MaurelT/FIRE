$(document).ready(function(){
    var bc = $('#bc');
    var divSelected = document.getElementsByClassName('itemPosition');
    var manageuser = document.getElementById('manageuser');
    var manageembedded = document.getElementById('manageembedded');

    manageuser.classList.add('selected');
    bc.load('manageuser.html');

    $('#manageuser').click(function(){
      removeClass(divSelected, 'selected');
      manageuser.classList.add('selected');
      bc.load('manageuser.html');
    });

    $('#manageembedded').click(function(){
      removeClass(divSelected, 'selected');
      manageembedded.classList.add('selected');
      bc.load('manageembedded.html');
    });
});

function removeClass(divSelected, removeElement) {
  for(var i=0; i < divSelected.length; i++){
    var parentElement = divSelected[i];
    // do something to each parent as needed
    // access children of parent element
    var childClassList= parentElement.getElementsByClassName(removeElement);
    // do something with `childClassList`
    for (var j= 0; j < childClassList.length; j++){
      var child = childClassList[j];
      child.classList.remove("selected");
    }
  }
}
