function initButtonCreateTruck(id, bc) {
    $('#submit').click(function () {
        createTruck(id, bc);
    });
}


function createTruck(id, bc) {
    bc.load('managebarrack.html', function () {
        initBarrack(id, bc);
    });
}
