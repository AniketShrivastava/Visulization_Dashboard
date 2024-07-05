import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 60, left: 60 }; // Increased bottom margin

    svg.attr('width', width)
       .attr('height', height);

    const x = d3.scaleBand()
                .domain(data.map(d => d.title))
                .range([margin.left, width - margin.right])
                .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.intensity)]).nice()
                .range([height - margin.bottom, margin.top]);

    svg.append('g')
       .attr('fill', 'steelblue')
       .selectAll('rect')
       .data(data)
       .join('rect')
       .attr('x', d => x(d.title))
       .attr('y', d => y(d.intensity))
       .attr('height', d => y(0) - y(d.intensity))
       .attr('width', x.bandwidth());

    svg.append('g')
       .call(d3.axisLeft(y))
       .attr('transform', `translate(${margin.left}, 0)`);

    svg.append('g')
       .call(d3.axisBottom(x))
       .attr('transform', `translate(0, ${height - margin.bottom})`);

    // Title
    svg.append('text')
       .attr('x', width / 2)
       .attr('y', margin.top / 2)
       .attr('text-anchor', 'middle')
       .attr('font-size', '1.5em')
       .text('Bar Chart Title');

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default BarChart;
