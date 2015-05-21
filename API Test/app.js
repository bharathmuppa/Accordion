function doIt() { 
 var output = $.ajax({
    url: 'https://george-vustrey-weather.p.mashape.com/api.php', 
    type: 'GET', 
    data: {"location":"hyderabad"},
    datatype: 'application/json',
    success: function(data) {
   console.log(data);
       	document.getElementById("output").innerHTML = data; 
        },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "evxAb7WQKpmshRH00bYsctdlqueVp1n9X91jsnphcOJhQu6T02"); 
    }
});
   var output1 = $.ajax({
    url: 'https://site2sms.p.mashape.com/index.php', 
    type: 'GET', 
    data: {"msg":"hi ra","phone":"8985030533","pwd":"naPRAYANAM8","uid":"8885882599"},
    datatype: 'application/json',
    success: function(data) {
   console.log(data);
       	document.getElementById("output").innerHTML = data; 
        },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "evxAb7WQKpmshRH00bYsctdlqueVp1n9X91jsnphcOJhQu6T02"); 
    }
});
 
}
