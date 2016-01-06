define(["viz/c1m1"], function(Base) {
    var me = new Base();
    me.option.toolbox = {
        show: true,
        feature: {
            dataView: {
                show: true,
                readOnly: false
            },
            magicType: {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'left',
                        max: 1548
                    }
                }
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    };

    me.meta.name = "pie";
    me.meta.chartName = "pie";

    me.appendOption = function(option) {
        option.radius = '55%';
        option.center = ['50%', '60%'];
    }
    return me;
});
