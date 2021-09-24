
  const render = data => {
    const width = 700;
    const height = 550;

    const svg = d3.select('.population-plot')
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return d.x; } )
    .attr("cy", function (d) { return d.y; } )
    .attr("r", function(d){
        if (d.population < 1000000){
          return 4;
        } 
        else{
          return 8;
        }
      })
    .style("fill", "dark blue")
    
    svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => {if (d.population > 1000000) return d.city})
       .attr("x", (d, i) => d.x)
       .attr("y", (d, i) => d.y)
      .style("text-anchor","middle")
      .attr("font_family", "sans-serif")  // Font type
      .attr("font-size", "11px")  // Font size
      .attr("fill", "black");   // Font color
  }


  const width = 500;
  const height = 500;

  const renderBarChart = data => {
    const svg = d3.select('.bar-chart')
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    var x = d3.scaleLinear()
      .domain([0, 4500])
      .range([ 0, width]);

    var y = d3.scaleBand()
      .range([ 0, height ])
      .domain(data.map(function(d) { return d.building; }))

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("height",45)
      .attr("fill", "orange")
      .attr("x", 250)
      .attr("y", function(d) { return y(d.building); })
      .attr("width", function(d) { return x(d.height_ft); })
      .on('click',(event,d) => {
        d = data[d];
        console.log("clicked",d);
        d3.select('.image').attr('src', d.image);
        console.log(d.height_ft);
        d3.select('.height').text(d.height_ft);
        d3.select('.building-name').text(d.building);
        d3.select('.city').text(d.city);
        d3.select('.country').text(d.country);
        d3.select('.floors').text(d.floors);
        d3.select('.completed').text(d.completed);
      })

    svg.selectAll(".category-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "category-label")
      .text((d) => {return (d.building)})
      .attr("x", (d, i) => 0)
      .attr("y", (d, i) => y(d.building))
      .attr("text-anchor","start")
      .attr("alignment-baseline", "hanging")
      .attr("font_family", "sans-serif")  // Font type
      .attr("font-size", "15px")  // Font size
      .attr("fill", "black");   // Font color

      svg.selectAll(".value-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "value-label")
      .attr("x", d => x(d.height_px)+400)
      .attr("y", (d, i) => y(d.building))
      .attr("alignment-baseline", "hanging")
      .attr("text-anchor","end")
      .attr("font-size", "11")  // Font size
      .attr('dy',10)
      .attr('dx',-13)
      .attr("fill", "black")
      .text((d) =>d.height_ft);   // Font color
    
  }

  var filteredData = new Array();
  d3.csv('cities.csv', d3.autoType)
      .then(data => {
      filteredData = data.filter(function(i){
        if(i["eu"] == "true"){
          return i;
        }
      })
      console.log(filteredData);
      console.log(data);
      render(filteredData);
    });
  
  var buildingData = new Array();
  d3.csv('buildings.csv', d3.autoType)
      .then(data => {
      buildingData = data.sort(function(a,b){
        return b.height_m - a.height_m;
      })
      console.log(buildingData);
      renderBarChart(buildingData);
    });
      

