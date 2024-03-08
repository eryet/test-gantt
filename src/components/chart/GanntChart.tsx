// src/components/GanttChart.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';


interface GanttData {
  name: string;
  startDate: string;
  endDate: string;
}

interface GanttChartProps {
  data: GanttData[];
}

const GanttChart: React.FC<GanttChartProps> = ({ data }) => {
  const svgRef = useRef(null);
  const [sortCriteria, setSortCriteria] = useState<string>('');
  const [filterCriteria, setFilterCriteria] = useState<string>('');
  const [colorCriteria, setColorCriteria] = useState<string>('');

  const handleSort = (criteria: string) => {
    setSortCriteria(criteria);
    // Sorting logic using D3 or manipulating DOM elements
  };

  const handleFilter = (criteria: string) => {
    setFilterCriteria(criteria);
    // Filtering logic
  };

  const handleColor = (criteria: string) => {
    setColorCriteria(criteria);
    // Coloring logic
  };

  // https://www.linkedin.com/pulse/simple-time-line-chart-using-d3js-nextjs-lee-han-jian/
  useEffect(() => {
    if (!svgRef.current) return;

    // d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 30, bottom: 40, left: 200 };
    const width = 1000 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const data = [
      { name: "Task A", startDate: new Date(2021, 0, 1), endDate: new Date(2021, 0, 5) },
      { name: "Task B", startDate: new Date(2021, 0, 3), endDate: new Date(2021, 0, 9) },
    ];

    const minDate: any = d3.min(data, d => d.startDate);
    const maxDate: any = d3.max(data, d => d.endDate);

    const xScale = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([margin.left, width]);

    svg.selectAll('.task')
      .data(data)
      .enter()
      .append('rect')
      .attr("transform", `translate(${margin.left})`)
      .attr('class', 'task')
      .attr('x', d => xScale(d.startDate))
      .attr('y', (d, i) => i * 30)
      .attr('width', d => xScale(d.endDate) - xScale(d.startDate))
      .attr('height', 20)
      .attr('fill', 'steelblue');

    const xAxis = d3.axisBottom(xScale)
      .ticks(d3.timeDay.every(1))
      .tickFormat(((domainValue: Date | number, index: number) => {
        if (domainValue instanceof Date) {
          return d3.timeFormat("%b %d")(domainValue);
        } else {
          return "";
        }
      }) as unknown as (domainValue: Date | d3.NumberValue, index: number) => string);

    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(${margin.left},${height + margin.top})`)
      .call(xAxis);

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([margin.top, height])
      .padding(0.1);

    svg.append("g")
      .call(d3.axisLeft(yScale))
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left})`)
  }, []);

  return (
    <div>
      <div id="button-container">
        <div className="button-block">
          <h4>Sort by</h4>
          <ul id="sorter">
            <li><button onClick={() => handleSort('name')}>Name</button></li>
            <li><button onClick={() => handleSort('start_date')}>Start date</button></li>
            <li><button onClick={() => handleSort('end_date')}>End date</button></li>
            <li><button onClick={() => handleSort('amount')}>Amount</button></li>
          </ul>
        </div>
        <div className="button-block">
          <h4>Filter by</h4>
          <ul id="filter">
            <li><button onClick={() => handleFilter('')}>All</button></li>
            <li><button onClick={() => handleFilter('male')}>Male</button></li>
            <li><button onClick={() => handleFilter('female')}>Female</button></li>
          </ul>
        </div>
        <div className="button-block">
          <h4>Color by</h4>
          <ul id="color">
            <li><button onClick={() => handleColor('')}>None</button></li>
            <li><button onClick={() => handleColor('amount')}>Amount</button></li>
          </ul>
        </div>
      </div>
      <svg ref={svgRef} width={1000} height={500} style={{ backgroundColor: 'rgb(240, 240, 240)', marginLeft: "20px" }}></svg>
    </div>
  );
};

export default GanttChart;
