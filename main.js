var numberPattern =  /[-]{0,1}[\d]*[\.]{0,1}[\d]+/g;
var dataPath = "data.csv"
var svg = d3.select("svg");
var map_group = svg.select("#map_group");
var data_group = svg.select("#data_group");
var monuments;
var base_size = 20;
var mouseover_increase = 10;
var half_base_size = Math.floor(base_size / 2);
//var svg_height = document.getElementById("svg").height.baseVal.value;
//var svg_width = document.getElementById("svg").width.baseVal.value;
var svg_height = document.getElementById("svg").parentNode.clientHeight;
var svg_width = document.getElementById("svg").parentNode.clientWidth;
var info_div = document.getElementById("info_div");
//var projection = d3.geoMercator();

var projection = d3.geoMercator().translate([document.getElementById("svg").parentNode.clientWidth/2, document.getElementById("svg").parentNode.clientHeight/2])
									 		  .scale(10000)
									 		  .center([-4.7285413, 41.6522966]);

var map_color = "#FFEDAA";

//Drawing the map
d3.json("Castile and León_AL6.GeoJson", function(json){
	//console.log(document.getElementById("svg").parentNode.clientWidth, document.getElementById("svg").parentNode.clientHeight);
	//projection.fitExtent([[0, 0], [document.getElementById("svg").parentNode.clientWidth, document.getElementById("svg").parentNode.clientHeight]], json);
	map_group.selectAll("path").data(json.features)
						 	 .enter()
						  	 .append("path")
						 	 .attr("d", d3.geoPath().projection(projection))
						 	 .attr("vector-effect", "non-scaling-stroke")
						 	 .attr("fill", function(d, i){return map_color})
						 	 .attr("stroke", "#041F37")
						 	 .attr("stroke-width", "1px");
});

d3.json("monumentos.json", function(error, data) {
	  monuments = data.monumentos;
	  //Draw monuments when they are loaded
	  console.log(monuments.length + " Monuments loaded");
	  loadMonuments(monuments);
	});

//Loading the data
//d3.csv(dataPath, loadData);

function initializeTooltips(){
	$('.tooltip').tooltipster({
		contentAsHTML: true, // set title content to html
		trigger: 'custom', // add custom trigger
		triggerOpen: { // open tooltip when element is clicked, tapped (mobile) or hovered
		   mouseenter: true
		},
		triggerClose: { // close tooltip when element is clicked again, tapped or when the mouse leaves it
			mouseleave: true
		},
		theme: ['tooltipster-light', 'tooltipster-light-custom']
  	});
}

function hideInfo(){
	console.log(document.getElementById("info_div").style.display = "none");
}

function selectAll(){
	d3.selectAll(".type_checkbox").property("checked", true);
	d3.select("#svg").selectAll("image").attr("data-draw", true);
	drawMonuments();
}

function deselectAll(){
	d3.selectAll(".type_checkbox").property("checked", false);
	d3.select("#svg").selectAll("image").attr("data-draw", false);
	drawMonuments();
}

function selectionChanged(id, checked){
	data = document.getElementsByTagName("image");
	for(i = 0; i < data.length; i++){
		d = data[i];
		if(d.dataset.type == id){
			d.dataset.draw = checked;
		}
	}
	drawMonuments();
}

function loadMonuments(data){
	var image_src;
	//var image_src_alt;

	for(let i = 0; i < data.length; i++){
		image_src = "";
		//image_src_alt = "";
		let tipo_monumento;
		d = data[i];
		switch(d.tipoMonumento){
			case "Catedrales":
				image_src = "cathedral_grey.png";
				tipo_monumento = "Catedrales";
				break;
			case "Iglesias y Ermitas":
				image_src = "church_grey.png";
				tipo_monumento = "Iglesias_y_ermitas";
				break;
			case "Castillos":
				image_src = "castle_grey.png";
				image_src_alt = "castle_alt.png"
				tipo_monumento = "Castillos";
				break;
			case "Monasterios":
				image_src = "monastery_grey.png";
				tipo_monumento = "Monasterios";
				break;
			case "Yacimientos arqueológicos":
				image_src = "archaeological_site_grey.png";
				tipo_monumento = "Yacimientos_arqueologicos";
				break;
			case "Reales Sitios":
				image_src = "crown_grey.png";
				tipo_monumento = "Reales_sitios";
				break;
			case "Casas Consistoriales":
				image_src = "town_hall_grey.png";
				tipo_monumento = "Casas_consistoriales";
				break;
			case "Plazas Mayores":
				image_src = "square_grey.png";
				tipo_monumento = "Plazas_mayores";
				break;
			case "Palacios":
				image_src = "palace_grey.png";
				tipo_monumento = "Palacios";
				break;
			case "Sinagogas":
				image_src = "star_of_david_grey.png";
				tipo_monumento = "Sinagogas";
				break;
			case "Casas Nobles":
				image_src = "noble_house_grey.png";
				tipo_monumento = "Casas_nobles";
				break;
			case "Santuarios":
				image_src = "sanctuary_grey.png";
				tipo_monumento = "Santuarios";
				break;
			case "Molinos":
				image_src = "mill_grey.png";
				tipo_monumento = "Molinos";
				break;
			case "Cruceros":
				image_src = "cross_grey.png";
				tipo_monumento = "Cruceros";
				break;
			case "Fuentes":
				image_src = "fountain_grey.png";
				tipo_monumento = "Fuentes";
				break;
			case "Hórreos":
				image_src = "horreo_grey.png";
				tipo_monumento = "Horreos";
				break;
			case "Murallas y puertas":
				image_src = "wall_grey.png";
				tipo_monumento = "Murallas_y_puertas";
				break;
			case "Torres":
				image_src = "tower_grey.png";
				tipo_monumento = "Torres";
				break;
			case "Puentes":
				image_src = "bridge_grey.png";
				tipo_monumento = "Puentes";
				break;
			case "Esculturas":
				image_src = "statue_grey.png";
				tipo_monumento = "Esculturas";
				break;
			case "Otros edificios":
				image_src = "others_grey.png";
				tipo_monumento = "Otros_edificios";
				break;
			case "Paraje pintoresco":
				image_src = "scenery_grey.png";
				tipo_monumento = "Paraje_pintoresco";
				break;
			case "Jardín Histórico":
				image_src = "flower_grey.png";
				tipo_monumento = "Jardin_historico";
				break;
			case "Sitio Histórico":
				image_src = "book_grey.png";
				tipo_monumento = "Sitio_historico";
				break;
			case "Conjunto Etnológico":
				image_src = "man_grey.png";
				tipo_monumento = "Conjunto_etnologico";
				break;
			//default:
			//	image_src = "";
		}

		if(d.coordenadas.longitud.includes('#')){
			d.coordenadas.longitud = d.coordenadas.longitud.replace('#', '');
		}

		var id = d.identificador;
		var name = d.nombre;
		var type = d.tipoMonumento;
		var id_bic = d.identificadorBienInteresCultural;
		var street = d.calle;
		var classification = d.clasificacion;
		var building_type = d.tipoConstruccion;
		var postal_code = d.codigoPostal;
		var description = d.Descripcion;
		var historical_period = d.periodoHistorico;
		var province = d.poblacion.provincia;
		var municipality = d.poblacion.municipio;
		var localidad = d.poblacion.localidad;
		var latitude = d.coordenadas.latitud;
		var longitude = d.coordenadas.longitud;
		//El identificador es el id más el tipo de monumento ya que hay monumentos clasificados en varias categorías
		projected_coords = projection([d.coordenadas.longitud, d.coordenadas.latitud]);
		data_group.append("image")
						.attr("xlink:href", image_src)
						.attr("x", projected_coords[0] - half_base_size)
						.attr("y", projected_coords[1] - half_base_size)
						.attr("width", base_size)
						.attr("height", base_size)
						.attr("id", id + type)
						.attr("onmouseover", "mouseOverMonument(id)")
						.attr("onmouseout", "mouseOutMonument(id)")
						.attr("onclick", "showMonumentInfo(id)")
						.attr("class", "tooltip")
						.attr("title", name)
						.attr("data-x", projected_coords[0])
						.attr("data-y", projected_coords[1])
						.attr("data-offset", half_base_size)
						.attr("data-type", tipo_monumento)
						.attr("data-draw", true)
						.attr("data-mouseover", false)
						.attr("data-id", id)
						.attr("data-name", name)
						.attr("data-type_info", type)
						.attr("data-id_bic", id_bic)
						.attr("data-street", street)
						.attr("data-classification", classification)
						.attr("data-building_type", building_type)
						.attr("data-postal_code", postal_code)
						.attr("data-description", description)
						.attr("data-historical_period", historical_period)
						.attr("data-province", province)
						.attr("data-municipality", municipality)
						.attr("data-localidad", localidad)
						.attr("data-latitude", latitude)
						.attr("data-longitude", longitude)
						.attr("data-base_src", image_src);
						//.attr("data-alt_src", image_src_alt);
	}

	initializeTooltips();
	//Drawing the circles
	//drawCircles();
}

function showMonumentInfo(id){
	document.getElementById("info_div").style.display = "initial";
	var d = document.getElementById(id);
	//d.setAttribute("href", d.dataset.alt_src);
	document.getElementById("info_name").innerHTML = "<strong>"+d.dataset.name+"</strong>";
	document.getElementById("info_id").innerHTML = "Identificador: " + d.dataset.id;
	document.getElementById("info_type").innerHTML = "Tipo de monumento: " + d.dataset.type_info;
	if(d.dataset.street != undefined){
		document.getElementById("info_street").innerHTML = "Calle: " + d.dataset.street;
	}else{
		document.getElementById("info_street").innerHTML = "";
	}
	if(d.dataset.description != undefined){
		document.getElementById("info_description").innerHTML = d.dataset.description;
	}else{
		document.getElementById("info_description").innerHTML = "";
	}
	document.getElementById("info_coordinates").innerHTML = "Coordenadas: " + d.dataset.latitude + ", " + d.dataset.longitude;
	document.getElementById("info_poblacion").innerHTML = "Poblacion: " + 
															d.dataset.localidad + ", " + 
															d.dataset.municipality + ", " + 
															d.dataset.province;
	document.getElementById("info_period").innerHTML = "Período: " + d.dataset.historical_period;
	//console.log(d);
}

function mouseOverMonument(id){
	var scale;
	transform = document.getElementById("zoom_group").getAttribute("transform");
	if(transform == null){
		scale = 1;
	}else{
		scale = transform.match(numberPattern)[2];
	}
	new_size = (base_size + mouseover_increase)/scale;

	d = document.getElementById(id);
	d.setAttribute("width", new_size);
	d.setAttribute("height", new_size);
	d.setAttribute("x", d.dataset.x - new_size/2);
	d.setAttribute("y", d.dataset.y - new_size/2);
	d.dataset.mouseover = "true";
}

function mouseOutMonument(id){
	var scale;
	transform = document.getElementById("zoom_group").getAttribute("transform");
	if(transform == null){
		scale = 1;
	}else{
		scale = transform.match(numberPattern)[2];
	}
	new_size = base_size/scale;

	d = document.getElementById(id);
	d.setAttribute("width", new_size);
	d.setAttribute("height", new_size);
	d.setAttribute("x", d.dataset.x - new_size/2);
	d.setAttribute("y", d.dataset.y - new_size/2);
	d.dataset.mouseover = "false";
}

function drawMonuments(){
	var scale;
	data = document.getElementsByTagName("image");
	//Transform of the map group, used to scale the circles
	console.log(document.getElementById("zoom_group").getAttribute("transform"));
	transform = document.getElementById("zoom_group").getAttribute("transform");
	if(transform == null){
		scale = 1;
	}else{
		scale = transform.match(numberPattern)[2];
	}
	new_size = base_size/scale;

	for(i = 0; i < data.length; i++){
		d = data[i];
		if(d.dataset.draw != "true"){
			d.setAttribute("width", 0);
			d.setAttribute("height", 0);
			continue;
		}
		if(d.dataset.mouseover == "true"){
			new_size_big = new_size + mouseover_increase/scale;
			d.setAttribute("width", new_size_big);
			d.setAttribute("height", new_size_big);
			d.setAttribute("x", d.dataset.x - new_size_big/2);
			d.setAttribute("y", d.dataset.y - new_size_big/2);
			continue;
		}
		d.setAttribute("width", new_size);
		d.setAttribute("height", new_size);
		d.setAttribute("x", d.dataset.x - new_size/2);
		d.setAttribute("y", d.dataset.y - new_size/2);
	}
}

function map_zoom() {
   svg.select("#zoom_group").attr("transform", d3.event.transform);
   //Re-draw the monuments
   drawMonuments(monuments);
}
//This basically assigns the mouse wheel event to a listener, check https://github.com/d3/d3-zoom
svg.call(d3.zoom().scaleExtent([1, 180])
				  .extent([[0, 0], [svg_width, svg_height]])
				  .translateExtent([[-svg_width * 0.5, -svg_height * 0.5], [svg_width * 1.5, svg_height * 1.5]])
				  .on("zoom", map_zoom));
