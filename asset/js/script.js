$('.player').click(function() {
    $('#menu').hide('slow');
    $('#game').show('slow');
});

$('#audio').click(function() {
    if($('#son')[0].paused === false) {
        $('#son')[0].pause();
        $('#audio').css('background-image', 'url(asset/img/son/ic_volume_off_black_24dp_2x.png)');
    }
    else {
        $('#son')[0].play();
        $('#audio').css('background-image', 'url(asset/img/son/ic_volume_up_black_24dp_2x.png)');
    }
});

$('#play').click(function() {
        $('#play').css('background-image', 'url(asset/img/son/ic_pause_black_24dp_2x.png)');
});

$('#replay').click(function() {
    $('#menu').show('slow');
    $('#game').hide('slow');
});