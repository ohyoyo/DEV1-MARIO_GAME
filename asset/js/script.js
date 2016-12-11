function setCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    setCookie(name,"",-1);
}

$(document).ready(function(){
    if(getCookie('audio_theme') == 0) {
        $('#son')[0].pause();
        $('#audio').css('background-image', 'url(asset/img/controler/ic_volume_off_black_24dp_2x.png)');
    }
    else if(getCookie('audio_theme') == 1) {
        $('#son')[0].play();
        $('#audio').css('background-image', 'url(asset/img/controler/ic_volume_up_black_24dp_2x.png)');
    }
});

$('.player').click(function() {
    $('#menu').hide('slow');
    $('#game').show('slow');
    $('#loading').hide('slow');
});

$('#audio').click(function() {
    if($('#son')[0].paused === false) {
        $('#son')[0].pause();
        $('#audio').css('background-image', 'url(asset/img/controler/ic_volume_off_black_24dp_2x.png)');
        setCookie('audio_theme', 0, 30);
    }
    else {
        $('#son')[0].play();
        $('#audio').css('background-image', 'url(asset/img/controler/ic_volume_up_black_24dp_2x.png)');
        setCookie('audio_theme', 1, 30);
    }
});

var pause = 1;

$('#play').click(function() {
    if(pause === 1) {
        $('#play').css('background-image', 'url(asset/img/controler/ic_pause_black_24dp_2x.png)');
        pause = 0;
    }
    else if(pause === 0) {
        $('#play').css('background-image', 'url(asset/img/controler/ic_play_arrow_black_24dp_2x.png)');
         pause = 1;
    }
});

$('#stop').click(function() {
    $('#menu').show('slow');
    $('#loading').show('slow');
    $('#game').hide();
});