// Singlton to manipulate all visualization
define(["viz/line", 
    "viz/bar", 
    "viz/area", 
    "viz/pie", 
    "viz/scatter",
    "viz/treemap"], function(Line, Bar, Area, Pie, Scatter, TreeMap) {
    var vizMetaData = [
        Line.meta,
        Bar.meta,
        Area.meta,
        Pie.meta,
        Scatter.meta,
        TreeMap.meta,
    ];

    var Viz = {};

    Viz.getVizTypes = function() {
        var result = [];
        vizMetaData.map(function(item) {
            result.push(item.name)
        })
        return result;
    };

    Viz.getVizBinding = function(viz) {
        var meta = Viz.getVizMeta(viz);

        if (meta) {
            return meta.binding;
        }

        return undefined;
    };

    Viz.getVizMeta = function(viz) {
        var i = 0,
            length = vizMetaData.length;
        for (; i < length; i++) {
            if (vizMetaData[i].name === viz) {
                return vizMetaData[i];
            }
        }
        return undefined;
    }

    var _getViz = function(type) {
        if (type === "line") {
            return Line;
        } else if (type === "bar") {
            return Bar;
        } else if (type === "area") {
            return Area;
        } else if (type === "pie") {
            return Pie;
        } else if (type === "scatter") {
            return Scatter;
        } else if (type === "treemap") {
            return TreeMap;
        }
    }

    Viz.buildOption = function(data, binding, type) {
        if (!data) {
            return;
        }

        if (!binding) {
            return;
        }

        if (!type) {
            return;
        }

        var vizInterface = _getViz(type);
        if (vizInterface) {
            return vizInterface.buildOption(data, binding);
        }
        return undefined;
    }

    return Viz;
});
