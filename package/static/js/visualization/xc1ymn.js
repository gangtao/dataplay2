define(["data/model"], function(Model) {
    var me = function() {
        this.option = {
            xAxis: [{
                type: 'category',
                data: []
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [],
            legend: {
                data: []
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['line', 'bar', 'stack', 'tiled']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            tooltip: {
                trigger: 'axis'
            },
        };

        this.meta = {
            "name": "xc1ymn", //X 1 category with Y n measures
            "chartName": "none",
            "binding": [{
                "name": "x",
                "type": "Category",
                "maxFeed": 1
            }, {
                "name": "y",
                "type": "Measure",
                "maxFeed": 10
            }]
        };
    };

    me.prototype.buildOption = function(data, binding) {

        if (!binding.x || !binding.y) {
            return;
        }

        var myOption = $.extend(true, {}, this.option);

        var vizData = new Model(data);
        var xData = vizData.getSerialsByCol(binding.x, false);
        myOption.xAxis[0].data = xData;
        myOption.legend.data = binding.y;
        var that = this;

        binding.y.map(function(yBinding) {
            var yData = vizData.getSerialsByCol(yBinding, true);
            var sOption = {};
            sOption.name = yBinding;
            sOption.type = that.meta.chartName;
            sOption.data = yData;
            that.appendOption(sOption);

            myOption.series.push(sOption);
        });
        return myOption;
    };

    me.prototype.appendOption = function(option) {}

    return me;
});
