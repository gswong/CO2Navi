function giveCo2Data() {
    var ret = [];
    $.getJSON("feed.json", function (data) {

        for (var i=0; i<data.length; i++)
        {
            ret.push(data[i].co2Saved);
        }
        
    })
    return ret;
}
function giveDateData() {
    var ret = [];
        $.getJSON("feed.json", function (data) {
            for(var i = 0; i < data.length; i++)
            {
                ret.push(getDateTimeString(data[i].date));                
            }
    })
    return ret;
}

