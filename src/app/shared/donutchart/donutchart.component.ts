import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
declare var $: any;

@Component({
  selector: 'app-donutchart',
  templateUrl: './donutchart.component.html',
  styleUrls: ['./donutchart.component.css']
})
export class DonutchartComponent implements OnInit, OnChanges {
  @Input()
  public percentage: number;
  public data: any[] = [];
  private margin = { top: 0, right: 0, bottom: 0, left: 0 };
  private width: number;
  private height: number;
  private radius: number;

  private arc: any;
  private labelArc: any;
  private pie: any;
  private color: any;
  private svg: any;

  constructor() {
    this.width = 200;
    this.height = 200;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  ngOnInit() {
    this.initSvg()
    this.drawPie();
  }

  ngOnChanges(changes) {
    var completedValue = 100 - this.percentage;
    this.data = [
      { label: "State", percentage: this.percentage },
      { label: "Completed", percentage: completedValue }
    ];
    this.initSvg()
    this.drawPie();
  }

  private initSvg() {
    this.color = d3Scale.scaleOrdinal()
      .range(["#30d666", "#F3E909"]);
    this.arc = d3Shape.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(this.radius - 50);
    this.labelArc = d3Shape.arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);
    this.pie = d3Shape.pie()
      .sort(null)
      .value((d: any) => d.percentage);
    this.svg = d3.select("svg")
      .append("g")
      .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");;
  }

  private drawPie() {
    let g = this.svg.selectAll(".arc")
      .data(this.pie(this.data))
      .enter().append("g")
      .attr("class", "arc");
    g.append("path").attr("d", this.arc)
      .style("fill", (d: any) => this.color(d.data.label));
    g.append("text").attr("transform", (d: any) => "translate(" + this.labelArc.centroid(d) + ")")
      .attr("dy", ".35em");
  }

}