define(["data/model"], function(Model) {
    var me = function() {
        this.option = {
            series: [],
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: []
            }
        };

        this.meta = {
            "name": "c1m1",
            "chartName": "none",
            "binding": [{
                "name": "Category",
                "type": "Category",
                "maxFeed": 1
            }, {
                "name": "Measure",
                "type": "Measure",
                "maxFeed": 1
            }]
        };
    };

    me.prototype.buildOption = function(data, binding) {

        if (!binding.Category || !binding.Measure) {
            return;
        }

        var myOption = $.extend(true, {}, this.option);

        var vizData = new Model(data);
        var cData = vizData.getSerialsByCol(binding.Category, false);
        myOption.legend.data = cData;

        var mData = vizData.getSerialsByCol(binding.Measure, true);
        var sOption = {};
        sOption.name = binding.Measure;
        sOption.type = this.meta.chartName;

        var i = 0,
            length = cData.length;
        var pieData = [];
        for (; i < length; i++) {
            var item = {};
            item.name = cData[i];
            item.value = mData[i];
            pieData.push(item);
        }

        sOption.data = pieData;

        this.appendOption(sOption);

        myOption.series.push(sOption);
        return myOption;
    };

    me.prototype.appendOption = function(option) {}

    return me;
});
