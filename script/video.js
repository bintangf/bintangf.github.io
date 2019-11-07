document.addEventListener('DOMContentLoaded',function(){
    var v = document.getElementById('v');
    var a = document.getElementById('1');
    var b = document.getElementById('2');
    var c = document.getElementById('3');
    var contexta = a.getContext('2d');
    var contextb = b.getContext('2d');
    var contextc = c.getContext('2d');
    var back = document.createElement('canvas');
    var backcontext = back.getContext('2d');

    var cw, ch;
    
    v.addEventListener('play',function(){
        cw = v.clientWidth;
        ch = v.clientHeight;
        a.width = cw;
        a.height= ch;
        b.width = cw;
        b.height= ch;
        c.width = cw;
        c.height= ch;
        back.width = cw;
        back.height = ch;
        gray(v, contexta, backcontext, cw, ch);
        embossed(v, contextb, backcontext, cw, ch);
        threshold(v, contextc, backcontext, cw, ch);
    }, false);
}, false);

function gray(v, c, bc, cw, ch){
    if (v.paused || v.ended)
        return false;
    
    bc.drawImage(v, 0, 0, cw, ch);
    
    var idata = bc.getImageData(0, 0, cw, ch);
    var data = idata.data;

    for (var i = 0; i < data.length;i += 4){
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        var brightness = (3 * r + 4 * g + b) >>> 3;
        data[i] = brightness;
        data[i+1] = brightness;
        data[i+2] = brightness;
    }
    idata.data = data;

    c.putImageData(idata, 0,0);

    setTimeout(function (){
        gray(v, c, bc, cw, ch);
    },0)
}

function embossed(v, c, bc, cw, ch) {
    if (v.paused || v.ended)
        return false;
    
    bc.drawImage(v, 0, 0, cw, ch);
    
    var idata = bc.getImageData(0, 0, cw, ch);
    var data = idata.data;
    
    var w = idata.width;
    var limit = data.length
    for(var i = 0; i < limit; i++) {
        if( i%4 == 3 ) continue;
        data[i] = 127 + 2*data[i] - data[i + 4] - data[i + w*4];
    }
    c.putImageData(idata, 0,0);

    setTimeout(function (){
        embossed(v, c, bc, cw, ch);
    },0)
}

function threshold(v, c, bc, cw, ch){
    if (v.paused || v.ended)
        return false;
    
    bc.drawImage(v, 0, 0, cw, ch);
    
    var idata = bc.getImageData(0, 0, cw, ch);
    var data = idata.data;

    for (var i = 0; i < data.length;i += 4){
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        var brightness = (0.2126*r + 0.7152*g + 0.0722*b >= 150) ? 255 : 0;
        data[i] = data[i+1] = data[i+2] = brightness
    }
    c.putImageData(idata, 0,0);

    setTimeout(function (){
        threshold(v, c, bc, cw, ch);
    },0)
}