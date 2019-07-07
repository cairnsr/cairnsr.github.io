function updateAlliance(id){
    $.ajax({
        url: '/alliance/' + id,
        type: 'PUT',
        data: $('#update-alliance').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function updatePlanet(id){
    $.ajax({
        url: '/planets/' + id,
        type: 'PUT',
        data: $('#update-planets').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function updateSpecies(id){
    $.ajax({
        url: '/species/' + id,
        type: 'PUT',
        data: $('#update-species').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function updateMovies(id){
    $.ajax({
        url: '/movies/' + id,
        type: 'PUT',
        data: $('#update-movies').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function updateCharacters(id){
    console.log("UPDATE CHARACTERS");
    $.ajax({
        url: '/characters/' + id,
        type: 'PUT',
        data: $('#update-characters').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};