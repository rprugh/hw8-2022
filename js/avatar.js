function shiftColor(selection, makeDark) {
    var color = selection.style("fill");
    var a = color.split("(")[1].split(")")[0];
    a = a.split(",");
    var numList = [];
    for (var i in a) {
        numList.push(parseInt(a[i]));
        numList[i] = makeDark ? numList[i] - 20 : numList[i] + 20;
    }
    return "rgb(" + numList[0] + ", " + numList[1] + ", " + numList[2] + ")";
}

function colorMap() {
    d3.selectAll('#water_tribe path')
    .attr('fill', '#79a8e0');

    d3.selectAll('#earth_kingdom path')
    .attr('fill', '#96ba84');

    d3.selectAll('#air_temples path')
    .attr('fill', '#dbe079');

    d3.selectAll('#fire_nation path')
    .attr('fill', '#e07979');

    d3.selectAll('#map path')
    .on('mouseover', function() {
        var path = d3.select(this)
        path.attr("fill", shiftColor(path, 1));
    })
    .on('mouseout', function() {
        var path = d3.select(this)
        path.attr("fill", shiftColor(path, 0));
    });

    
}

function makeToolTips() {
    // TODO: Implement this function
    d3.json('data.json')
    .then(function(data) {
        console.log(data);
        for (key in data) {
            tippy('#' + key, {
                content: '<b>' + data[key].title + '</b> <br>' +
                            '<img src="'+data[key].img+'"> <br>' +
                            '<a target="_blank" href="' + data[key].link + '">Learn More</a>',
                allowHTML: true,
                hideOnClick: 'toggle',
                trigger: "mouseenter focus click",
                interactive: true,
                appendTo: document.body,
            });
        }
    });
}

function setMap() {
    d3.xml("avatar_img/map.svg")
    .then(data => {
        d3.select('#map')
        .node()
        .append(data.documentElement);
    })
    .then(colorMap)
    .then(makeToolTips);

}

console.log("hello");
document.addEventListener("DOMContentLoaded", setMap);