var earthquakeurl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(earthquakeurl).then(function(data){
    console.log(data)
    var eqmap = L.map("map",{
        center:[40,90],
        zoom:3
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(eqmap);
L.geoJson(data, {
    pointToLayer:function(feature, coordinate){
        return L.circleMarker(coordinate,{
            radius:feature.properties.mag*3, 
            opacity:0.75,
            fillOpacity:0.75,
            color:"black",
            fillColor:depthcolor(feature.geometry.coordinates[2])
        })
    },
    onEachFeature:function(feature, coordinate){
        coordinate.bindPopup(`<h1>Info</h1>
        <b>place:</b> ${feature.properties.place}`)
    }
}).addTo(eqmap)
})
function depthcolor(depth){
if(depth>90){
    return "red"
}
else if(depth>70){
    return "orange"
}  
else {
    return "yellow"
}

//Set up legend
function makeLegend() {
let legend = L.control({position: "bottomright"});
legend.onAdd = function() {
    let div = L.DomUtil.create("div", "legend");
    let htmlLI = []
    colorDomain.forEach((value, index) => {
        let formattedValue = index == 0 ? "0.01 +" : value.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
        htmlLI.push("<li>" + formattedValue + "</li>");
        });
        div.innerHTML = `<h3 class="legend_title">Depth (km)</h3>
        <div class="data_container">
            <div class="gradient" style="background: linear-gradient(${gradientColors.join(", ")})"></div>
            <div class="gradient_values">
                <ul>
                    ${htmlLI.join('')}
                </ul>
            </div>
        </div>`;
return div;
}
return legend;
}

let legend = makeLegend();
    legend.addTo(eqmap);



}