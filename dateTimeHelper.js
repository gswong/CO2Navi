function getDateTimeString( t ) { //t = MS since 1970
    
    var minutes = 1000 * 60;
    var hours = minutes * 60;
    var days = hours * 24;
    var years = days * 365;
    


    var y = Math.floor(t / years);
    t -= y*years;
    y += 1970;
    var day = Math.floor(t / days);
    t -= day*days;
    var hour = Math.floor(t / hours);
    t -= hour * hours;
    var mins = Math.round(t / minutes);

    // e.x. 2017/183/18/24 = 24th min of 18th hour of 183rd day of 2017
    

    var res =  y.toString() + "/" + day.toString() + " " + hour.toString() + ":" + mins.toString();
    return res;
}