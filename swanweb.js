var map = L.map('map').setView([0,0], 1);

function matchName(a, b) {
    console.log(a.name, b.name);
    if (a.name === b.name) {
	return true;
    }

    return false;
}

function onEachFeature(feature, layer) {
    if (feature.properties.hits) {
	layer.bindPopup("<p>Total Hits for '" + feature.properties.name + "': " + feature.properties.hits + "</p>");
    }
}

L.geoJson(countries, {
filter: function (feature, layer) {
if (feature.properties) {
for (c in data.countries) {
if (data.countries.hasOwnProperty(c)) {
if (data.countries[c].name === feature.properties.name) {
feature.properties.hits = data.countries[c].hits;
}
}
}
}
return true;
},
style: function (feature) {
var style;
if (feature.properties.hits) {
style = {
weight: 2,
opacity: 1,
color: 'white',
dashArray: '3',
fillOpacity: 0.3,
fillColor: '#ff0000'
};
} else {
style = {
weight: 2,
opacity: 1,
color: 'white',
dashArray: '3',
fillOpacity: 0.3,
fillColor: '#666'
};
}

return style;
},
onEachFeature: onEachFeature
}).addTo(map);
