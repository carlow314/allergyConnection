$(document).ready(function () {
    $("#dogButton").click(function () {
        var dogcount =0;
        dogcount++;
        $("#dogcounter").text(dogcount);
    });
    $("#catButton").click(function () {
        var catcount=0;
        catcount++;
        $("#catcounter").text(catcount);
    });
  
    $('.unmask').on('click', function () {

        if ($(this).prev('input').attr('type') == 'password')
            changeType($(this).prev('input'), 'text');

        else
            changeType($(this).prev('input'), 'password');

        return false;
    });

    function changeType(x, type) {
        if (x.prop('type') == type)
            return x; 
        try {
            return x.prop('type', type); 
        } catch (e) {
            var html = $("<div>").append(x.clone()).html();
            var regex = /type=(\")?([^\"\s]+)(\")?/; 
            var tmp = $(html.match(regex) == null ?
                html.replace(">", ' type="' + type + '">') :
                html.replace(regex, 'type="' + type + '"'));
            tmp.data('type', x.data('type'));
            var events = x.data('events');
            var cb = function (events) {
                return function () {
                    for (i in events) {
                        var y = events[i];
                        for (j in y)
                            tmp.bind(i, y[j].handler);
                    }
                }
            }(events);
            x.replaceWith(tmp);
            setTimeout(cb, 10); 
            return tmp;
        }
    }
    document.cookie =
    'ppkcookie1=testcookie; expires=Wed, 28 Aug 2018 20:47:11 UTC; path=/selection'

    function createCookie(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }
    
    function readCookie(name) {
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
        createCookie(name,"",-1);
    }
});