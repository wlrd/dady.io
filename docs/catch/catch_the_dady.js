$(document).ready(function(){
    animate($('.a'));
    animate($('.b'));
    
    $(".a").click(function(){
        test('wlrd');
      $('.a').toggleClass('hidden');
    });
    
    $(".b").click(function(){
        test('othy');
      $('.b').toggleClass('hidden');
    });
});

function makeNewPosition(){
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
}

function animate($target){
    var neww = makeNewPosition();
    $target.animate({ top: neww[0], left: neww[1] }, 700, function(){
      animate($target);        
    });
};

function test(name){
    var div = document.getElementById('dady_list');
    div.innerHTML += '</br>' + name;  
};