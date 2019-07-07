function deleteAlliance(id){
    $.ajax({
        url: '/alliance/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deletePlanet(id){
    $.ajax({
        url: '/planets/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteSpecies(id){
    $.ajax({
        url: '/species/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteMovies(id){
    $.ajax({
        url: '/movies/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteCharacter(id){
    $.ajax({
        url: '/characters/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
