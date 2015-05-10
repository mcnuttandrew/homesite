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
