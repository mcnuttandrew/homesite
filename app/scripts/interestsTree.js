window.interestsTree = function(selector){
  'use strict';
  
  var interests = {name: 'interests', children:[
    {name: 'fields', children: [
      {name: 'machine learning', size: 1000},
      {name: 'mechanics', size: 1000},
      {name: 'data visualization', size: 1000}
    ]},
    {name: 'phenomena', children: [
      {name: 'vehiclicular traffic', size: 1000},
      {name: 'gravity', size: 1000},
      {name: 'particle physics', size: 1000}
    ]}
  ]};

  var width = 650,
  	height = 150;
  
  	
  var i = 0;

  var tree = d3.layout.tree()
  	.size([height, width]);

  var diagonalA = d3.svg.diagonal()
  	.projection(function(d) { return [d.x, 0]; });
  var diagonalB = d3.svg.diagonal()
  	.projection(function(d) { return [d.x, d.y]; });  

  var svg = d3.select(selector).append('svg')
              .attr('width', width).attr('height', height).append('g');

  function update(root) {

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
  	  links = tree.links(nodes);

    nodes.forEach(function(d) { d.y = d.depth * 30 + 30; });
    nodes.forEach(function(d) { d.x = d.x * 5 - 50; });

    // JOIN
    var node = svg.selectAll('g.node')
  	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // ENTER + APPEND
    var nodeEnter = node.enter().append('g')
  	  .attr('class', 'node')
  	  .attr('transform', function(d) { 
  		  return 'translate(' + d.x + ',' + 0 + ')'; });

    nodeEnter.append('circle')
  	  .attr('r', 10)
  	  .style('fill', '#fff');

    nodeEnter.append('text')
  	  .attr('y', function(d) { 
  		  return d.children || d._children ? -18 : 18; })
  	  .attr('dy', '.35em')
  	  .attr('text-anchor', 'middle')
  	  .text(function(d) { return d.name; })
  	  .style('fill-opacity', 1)
      .style('font-weight', 'bold')
      .style('font', 'didot');

    // ENTER + UPDATE
    node.transition().duration(1000)
  	  .attr('transform', function(d) { 
  		  return 'translate(' + d.x + ',' + d.y + ')'; });
        
        
    // JOIN
    var link = svg.selectAll('path.link')
  	  .data(links, function(d) { return d.target.id; });

    // ENTER
    link.enter().insert('path', 'g')
  	  .attr('class', 'link')
  	  .attr('d', diagonalA); 
       
    // ENTER + UPDATE
    link.transition().duration(1000)
  	  .attr('d', diagonalB);    

  } 
  
  
  //draw diagram
  update(interests);
};
