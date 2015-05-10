/* jshint devel:true */
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

window.logo = function(selector){
  'use strict';
  
  var height = 100;
  var width = 150;
  
  var svg = d3.select(selector).append('svg')
              .attr('width', width).attr('height', height + 10).append('g')
              .attr('transform', 'translate(' + (width / 2- 10) + ',' +  (height / 2 - 10) + ')');
  
  var rectSizes = [40, 43, 46, 49].reverse();
  var update = function(){
    // JOIN
    var rects = svg.selectAll('rect').data(rectSizes);
      
    // ENTER
    rects.enter().append('rect')
         .attr('x', function(d){
           return -d / 2;
         }).attr('y', function(d){
           return -d / 2;
         })
         .attr('width', function(d){return 1.5 * d;})
         .attr('height', function(d){return 1.5 * d;})
         .attr('stroke', 'black')
         .attr('stroke-width', 0.5)
         .attr('fill', function(d){
           return d % 2 === 0 ? 'white' : 'black';
         })
         .attr('transform', function(d){
           return 'rotate('+ d +')';
         });
    rects.transition().duration(2000)
         .attr('transform', function(d){
           return 'rotate('+ (100 - d) +')';
         });     
    
    // // // // ENTER + UPDATE    
    // EXIT
    // svg.exit().remove();
    
    svg.append('text')
       .attr('x', -6).attr('y', 12 )
       .text('andrew')
       .attr('text-anchor', 'middle')
       .attr('font-family', 'Lantinghei SC')
       .attr('font-size', '16px')
       .attr('fill', 'black')
       .attr('text-decoration', 'none');
      
    svg.append('text')
       .attr('x', 0).attr('y', 28 )
       .text('mcnutt')
       .attr('text-anchor', 'middle')
       .attr('font-family', 'Lantinghei SC')
       .attr('font-size', '16px')
       .attr('fill', 'black')
       .attr('text-decoration', 'none');
    
  };
  update();
  
};

jQuery('#topFillBlock').height(jQuery(window).height() / 3);

window.interestsTree('#interestsContainer');
window.logo('#logospot');

jQuery('.navControls').on('click', function(){
  'use strict';
  jQuery('#topFillBlock').hide(1000);
});
jQuery('#logospot > svg > g > text').on('click', function(){
  'use strict';
  if(jQuery('#topFillBlock:visible').length > 0){
    jQuery('#topFillBlock').hide(1000);
  } else {
    jQuery('#topFillBlock').show(1000);
  }
});

jQuery('#' + jQuery('.selected').attr('data')).show();
jQuery('.portfolioItem').on('click', function(event){
  'use strict';
  jQuery('#' + jQuery('.selected').attr('data')).hide(300, 'linear');
  jQuery('.selected').removeClass('selected');
  jQuery(event.currentTarget).addClass('selected');
  jQuery('#' + event.currentTarget.getAttribute('data')).show(300, 'linear');
  
});
jQuery('#researchButton').on('click', function(){
  'use strict';
  jQuery('#interestsContainer').empty();
  window.interestsTree('#interestsContainer');
});
