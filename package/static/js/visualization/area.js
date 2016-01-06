define(["viz/xc1ymn"], function(Base) {
    var me = new Base();
    me.meta.name = "area";
    me.meta.chartName = "line";
    me.appendOption = function(option) {
        option.itemStyle = {
            normal: {
                areaStyle: {
                    type: 'default'
                }
            }
        };
    }
    return me;
});
