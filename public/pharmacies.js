var herokuURL = "https://cors-anywhere.herokuapp.com/";
var city = "Denver";

$.ajax({
    url: herokuURL + 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=pharmacies+in+' + city + '&key=AIzaSyDOU6V8Vtr1G4y5HdJ5XNOe82rtz8Tpb-4',
    type: 'GET',
    success: (data) => {
        for (i = 0; i < 10; i++) {
            var pharmData = {
                pharmacy: data
            }
        }
        console.log(pharmData);
    }
});