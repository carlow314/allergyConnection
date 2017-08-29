$(document).ready(function () {
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
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCQHXrwKvEpZptx4tgDCI1aIXxLMCk9xKQ",
        authDomain: "furbabies-5734e.firebaseapp.com",
        databaseURL: "https://furbabies-5734e.firebaseio.com",
        projectId: "furbabies-5734e",
        storageBucket: "",
        messagingSenderId: "229679653180"
    };
    firebase.initializeApp(config);
    // database reference variable
    var database = firebase.database();
    // Setting initial value of our click counter variable to 0
    var dogClickCounter = 0;
    var catClickCounter = 0;
    // On Click of Dog Button
    $("#dogButton").on("click", function () {
        dogClickCounter++;
        database.ref().update({
            dogClickCount: dogClickCounter
        });
    });
    //On click of Cat Button
    $("#catButton").on("click", function () {
        catClickCounter++;
        database.ref().update({
            catClickCount: catClickCounter
        });
    });
    database.ref().on("value", function (snapshot) {
        $("#dogcounter").html(snapshot.val().dogClickCount);
        dogClickCounter = snapshot.val().dogClickCount;
        $("#catcounter").html(snapshot.val().catClickCount);
        catClickCounter = snapshot.val().catClickCount;
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});