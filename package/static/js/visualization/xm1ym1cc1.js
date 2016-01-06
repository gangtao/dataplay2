define(["data/model"], function(Model) {
    var me = function() {
        this.option = {
            xAxis: [{
                type: 'value',
                scale: true
            }],
            yAxis: [{
                type: 'value',
                scale: true
            }],
            series: [],
            legend: {
                data: []
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
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
                trigger: 'axis',
                showDelay: 0,
                axisPointer: {
                    show: true,
                    type: 'cross',
                    lineStyle: {
                        type: 'dashed',
                        width: 1
                    }
                }
            },
        };

        this.meta = {
            "name": "xm1ym1cc1", //X 1 measure with Y 1 measure Color 1 category
            "chartName": "none",
            "binding": [{
                "name": "x",
                "type": "Measure",
                "maxFeed": 1
            }, {
                "name": "y",
                "type": "Measure",
                "maxFeed": 1
            }, {
                "name": "color",
                "type": "Category",
                "maxFeed": 1
            }]
        };
    };

    me.prototype.buildOption = function(data, binding) {
        if (!binding.x || !binding.y || !binding.color) {
            return;
        }

        var myOption = $.extend(true, {}, this.option);
        var vizData = new Model(data);

        var cValues = vizData.getUniqueValuesByCol(binding.color);

        myOption.legend.data = cValues;
        var that = this;

        cValues.map(function(item) {
            var serial = {};
            serial.name = item;
            serial.type = that.meta.chartName;
            serial.data = vizData.getSerialsByFilter(binding.color, item, [binding.x, binding.y], true);

            myOption.series.push(serial);
        })

        return myOption;
    };

    me.prototype.appendOption = function(option) {}

    return me;
});
