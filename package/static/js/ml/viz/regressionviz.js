// D3 based visuaization for classification result
define([], function() {
    var margin = {
        top: 50,
        right: 30,
        bottom: 50,
        left: 50
    };

    var RegressionViz = function(option) {
        this._trainData = option.data;
        this._features = option.features;
        this._target = option.target;
        this._predictData = option.predict;
        this._predictScale = option.scale;
        this._rootContainerId = option.containerId;
        this._width = option.size.width - margin.left - margin.right;
        this._height = option.size.height - margin.top - margin.bottom;

        this._xScale = d3.scale.linear().range([0, this._width]);
        this._yScale = d3.scale.linear().range([this._height, 0]);

        this._color = d3.scale.category10();
        this._xAxis = d3.svg.axis().scale(this._xScale).orient("bottom");
        this._yAxis = d3.svg.axis().scale(this._yScale).orient("left");

        this._svg = d3.select("#" + this._rootContainerId).append("svg")
            .attr("width", this._width + margin.left + margin.right)
            .attr("height", this._height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    };

    RegressionViz.prototype.render = function() {
        var x = this._xScale;
        var y = this._yScale;
        var color = this._color;
        // Update the domain
        var xRange = d3.extent(this._trainData, function(d) {
            return d.x;
        });

        var yRange = d3.extent(this._trainData, function(d) {
            return d.y;
        });

        x.domain(xRange).nice();
        y.domain(yRange).nice();

        //Draw the X,Y axises
        this._svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + (this._height + 10) + ")").call(this._xAxis).append("text").attr("class", "label").attr("x", this._width).attr("y", -6).style("text-anchor", "end").text(this._features[0]);

        this._svg.append("g").attr("class", "y axis").attr("transform", "translate(-10,0)").call(this._yAxis).append("text").attr("class", "label").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text(this._target);

        //Draw the training data 
        this._svg.selectAll(".dot").data(this._trainData).enter().append("circle").attr("class", "dot").attr("r", 3.5).attr("cx", function(d) {
            return x(d.x);
        }).attr("cy", function(d) {
            return y(d.y);
        }).style("fill", function(d) {
            return color("data");
        });

        //Draw the predict region
        var xStep = (x(xRange[1]) - x(xRange[0])) / this._predictScale;
        var yStep = (y(yRange[0]) - y(yRange[1])) / this._predictScale;

        var line = d3.svg.line()
            .x(function(d) {
                return x(d.x);
            })
            .y(function(d) {
                return y(d.y);
            })
            .interpolate("basis");

        this._svg.append("path")
            .attr("d", line(this._predictData))
            .style("stroke", color("regression"))
            .style("stroke-width", 3)
            .style("fill", "None");

    };

    return RegressionViz;

});
