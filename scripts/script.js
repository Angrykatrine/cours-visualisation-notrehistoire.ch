// Define svg element
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Define map size, position and zoom
const projection = d3
    .geoMercator()
    .translate([width / 2, height / 2])
    .rotate([-7.43864, -46.95108, 0])
    .center([0.54, -0.1])
    .scale(18000);

// Load assets
d3.queue()
    .defer(d3.json, "assets/ch.json")
    .defer(d3.csv, "assets/data_simplified.csv")
    .await(ready);

function ready(error, dataGeo, data) {

    // Create map
    const path = d3.geoPath().projection(projection);

    // Visualise map
    svg
        .selectAll("path")
        .data(dataGeo.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#b8b8b8")
        .attr("stroke", "white")
        .attr("stroke-width", 1);

    // Create and visualise geolocated points
    svg
        .selectAll("points")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return projection([+d.long, +d.lat])[0];
        })
        .attr("cy", function (d) {
            return projection([+d.long, +d.lat])[1];
        })
        .attr("r", 6)
        .style("fill", "midnightblue")
        .attr("fill-opacity", 0.05);

  // Add title and legend
    svg
        .append("text")
        .attr("text-anchor", "start")
        .style("fill", "black")
        .attr("x", 60)
        .attr("y", 60)
        .attr("width", 90)
        .html("notreHistoire.ch – géolocalisation des publications")
        .style("font-family", "sans-serif")
        .style("font-size", 16)

    svg
        .append("text")
        .attr("text-anchor", "start")
        .style("fill", "black")
        .attr("x", 60)
        .attr("y", 80)
        .attr("width", 90)
        .html("30'114 entrées, état au 30 avril 2024")
        .style("font-family", "monospace")
        .style("font-size", 11)
}
