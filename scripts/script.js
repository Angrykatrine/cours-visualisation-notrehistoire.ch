// Define map element, setup base coordinates and zoom
var map = L
    .map("map")
    .setView([46.300,8.245], 8.2);

// Load assets
d3.queue()
    .defer(d3.csv, "assets/NH_data.csv")
    .await(ready);

function ready(error, data) {
    // Add tiles from OpenStreetMap to the map
    L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
            maxZoom: 16,
            minZoom: 4,
        }
    ).addTo(map);

    // Add svg layer to the map
    L.svg().addTo(map);

    // Add hover tooltip to map
    var tooltip = d3.select("#map")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 1)
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style("position", "absolute")
        .style("z-index", "9999")
        .style("font-family", "monospace")
        .style("font-size", "12px")
        .style("top", "20px")
        .style("right", "20px");

    // Function to update tooltip: hover
    var mouseover = function(d) {
        tooltip.style("opacity", 1)
    }

    // Function to update tooltip: move
    var mousemove = function(d) {
        tooltip
            .html("<strong>" + d.title + "</strong><br>" + "Date de publication: " + d.published + "<br>" + "Période: " + d.period + "<br>" + "Nombre de vues: " + d.views)
    }

    // Function to update tooltip: leave
    var mouseleave = function(d) {
        tooltip.style("opacity", 0)
    }

    // Create and visualise geolocated points
    d3.select("#map")
    .select("svg")
    .selectAll("points")
    .data(data)
    .enter()
    .append("circle")
        .attr("class", function(d){ 
            // Add data from CSV as class for filtering
            return "circle " + ( d.featured == "B" ? "featured" : "" ) + " " + d.media + " " + d.views_id;
        })
        .attr("data-views", function(d){ 
            return d.views;
        })
        .attr("data-period", function(d){ 
            return d.period;
        })
        .attr("data-published", function(d){ 
            return d.published;
        })
        .attr("cx", function (d) {
            return map.latLngToLayerPoint([d.lat, d.long]).x;
        })
        .attr("cy", function (d) {
            return map.latLngToLayerPoint([d.lat, d.long]).y;
        })
        .attr("r", 5)
        .style("fill", function(d){
            if(d.media=="photo"){ return "blue" }
            else if(d.media=="audio"){ return "red" }
            else if(d.media=="video"){ return "green" }
            else if(d.media=="story"){ return "yellow" }
        })
        .attr("fill-opacity", 0.50)
        .style("pointer-events", "all")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

    // Function that update circle position if zoom or position change
    function update() {
        d3.selectAll("circle")
        .attr("cx", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).x })
        .attr("cy", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).y })
    }

    // Register all checkboxes and circles
    var checkboxes = d3.selectAll(".checkbox-filter");
    var circles = Array.from(document.querySelectorAll(".circle"));
    var checked = {};

    // Check origin filters
    getChecked("featured");
    getChecked("media");
    getChecked("views");

    // Filter checked box
    function filter(){
        checkbox = d3.select(this)
        group = checkbox.property("value")
        type = checkbox.property("name")

        getChecked(type)
        setVisibility();
    }

    // Check filters status
    function getChecked(name){
        checked[name] = Array.from(document.querySelectorAll("input[name="+name+"]:checked")).map(function (el) {
            return el.value
        });
    }

    // Set visibility of circles based on filters status
    function setVisibility(){
        circles.map(function (el) {
            var featuredCheck = checked.featured.length ? _.intersection(Array.from(el.classList), checked.featured).length : true;
            var mediaCheck = checked.media.length ? _.intersection(Array.from(el.classList), checked.media).length : true;
            var viewsCheck = checked.views.length ? _.intersection(Array.from(el.classList), checked.views).length : true;

            if ( featuredCheck && mediaCheck && viewsCheck ) {
                el.style.display = 'block';
            } else {
                el.style.display = 'none';
            }
        });
    }

    // When a button change, run the filter function
    checkboxes.on("change", filter);
  
    // If map moves (zoom or drag), update circles position
    map.on("moveend", update)

    // Initialise at start
    update()
}
