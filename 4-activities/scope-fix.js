//example 5: http://www.javascriptkit.com/javatutors/closures2.shtml

function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        
        result.push( function(i) {
            var item = 'item' + list[i];
			return function() { 
                alert(item + ' ' + list[i])
            };
		}(i));
    }
    return result;
}
 
function testList() {
    var fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

testList();