function initButtonCreateTeam(id, bc) {
    $('#submit').click(function () {
        createTeam(id, bc);
    });
}


function createTeam(id, bc) {
    bc.load('managebarrack.html', function () {
        initBarrack(id, bc);
    });
}
