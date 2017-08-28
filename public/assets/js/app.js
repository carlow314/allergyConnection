$(document).ready(function () {
    var dogcount = 0;
    var catcount = 0;
    $("#dogButton").click(function () {
        dogcount++;
        $("#dogcounter").text(dogcount);
    });
    $("#catButton").click(function () {
        catcount++;
        $("#catcounter").text(catcount);
    });

    //function of click event to change input type from password to text and vice versa
    $('.unmask').on('click', () => {
        if ($(this).prev('input').attr('type') == 'password')
            changeType($(this).prev('input'), 'text');
        else
            changeType($(this).prev('input'), 'password');
        return false;
    });

    //function for converting hidden password to visible text and visible text to hidden password
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
            n
            return tmp;
        }
    }
});