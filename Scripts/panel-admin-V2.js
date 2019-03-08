$(document).ready(function(){
    var bc = $('#bc');
    var divSelected = document.getElementsByClassName('itemPosition');
    var manageuser = document.getElementById('manageuser');
    var manageembedded = document.getElementById('manageembedded');

    manageuser.classList.add('selected');
    bc.load('manageuser.html', function() {
        initEmbeddedSwitchManager();
        uniqueSwitchManager($('#usersList'));
    });


    $('#manageuser').click(function(){
      removeClass(divSelected, 'selected');
      manageuser.classList.add('selected');
        bc.load('manageuser.html', function () {
            initEmbeddedSwitchManager();
        });
    });

    $('#manageembedded').click(function(){
      removeClass(divSelected, 'selected');
      manageembedded.classList.add('selected');
      bc.load('manageembedded.html');
        initEmbeddedSwitchManager();
    });



});

function uniqueSwitchManager(switchable) {
  $(function() {
      switchable.sortable({
          connectWith: "ul",
          placeholder: "placeholder",
          delay: 150
      })
          .disableSelection()
          .dblclick( function(e){
              var item = e.target;
              if (e.currentTarget.id === 'usersList') {
                $(item).fadeOut('fast', function() {
                  $(item).appendTo($('#usersList')).fadeIn('slow');
                });
              }
          });
  });
}

function initEmbeddedSwitchManager() {
    var manageuserembedded = $("#allFacets, #userFacets");

    $(function() {
        manageuserembedded.sortable({
            connectWith: "ul",
            placeholder: "placeholder",
            delay: 150
        })
            .disableSelection()
            .dblclick( function(e){
                var item = e.target;
                if (e.currentTarget.id === 'allFacets') {
                    //move from all to user
                    $(item).fadeOut('fast', function() {
                        $(item).appendTo($('#userFacets')).fadeIn('slow');
                    });
                } else {
                    //move from user to all
                    $(item).fadeOut('fast', function() {
                        $(item).appendTo($('#allFacets')).fadeIn('slow');
                    });
                }
            });
    });
}

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
