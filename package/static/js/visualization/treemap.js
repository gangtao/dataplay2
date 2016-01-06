define(["viz/c1m1"], function(Base) {
    var me = new Base();
    me.meta.name = "treemap";
    me.meta.chartName = "treemap";

    me.option.toolbox = {
        show: true,
        feature: {
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
    };

    me.appendOption = function(option) {
        option.itemStyle = {
            normal: {
                label: {
                    show: true,
                    formatter: "{b}"
                },
                borderWidth: 1
            },
            emphasis: {
                label: {
                    show: true
                }
            }
        };
    }
    return me;
});
