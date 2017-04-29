function giveCo2Data() {
    var ret = [0,0,0,0,0,0,0,0,0,0];
    
    $.getJSON("feed.json", function (data) {

        for (var i=0; i<10; i++)
        {
            
            ret[i] = (data[i].co2Saved);
            
        }
        
    });
    console.log(ret);
    return ret;
}
function giveDateData() {
    var ret = ["","","","","","","","","",""];
    $.getJSON("feed.json", function (data) {
        
        for(var i = 0; i < 10; i++)
        {
            
            ret[i] = (getDateTimeString(data[i].date));
            
        }
    });
    return ret;
}

