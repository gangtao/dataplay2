define(["comp/common/collapse",
        "comp/common/panel",
        "comp/dataselection",
        "comp/vizselection",
        "comp/bindingpanel",
        "viz/manager"], 
        function(Collapse, Panel, DataSelection, VizSelection, BindingPanel, Viz) {

    var vizData = undefined;
    var vizType = undefined;
    var vizBinding = undefined;

    var handleDataSelection = function(val) {
        if (val !== null) {
            updateData(val);
        } else {
            vizData = undefined;
        }
    };

    var handleVizSelection = function(val) {
        var binding = undefined
        if (val !== null) {
            vizType = val;
            binding = Viz.getVizBinding(val);
        } else {
            //
            vizType = undefined;
            binding = undefined;
        }

        updateBindingPanel(binding);
        updateViz();
    };

    var updateData = function(name) {
        $.get( "/data/" + name, function( data ) {
            var csv = data.csv;
            var data = Papa.parse(csv);
            vizData = data.data;
        });
    };

    var updateBindingPanel = function(binding){
        $("#vizBindingPanel").empty();

        if (binding) {
            var props = {};
            props.bindings = binding;
            props.values = vizData[0];
            props.handleBinding = handleBindingUpdate;

            ReactDOM.render(
                React.createElement(BindingPanel, props),
                document.getElementById('vizBindingPanel')
            );
        }
    };

    var handleBindingUpdate = function(binding) {
        vizBinding = binding;
        updateViz();
    };

    var updateViz = function() {
        var option = Viz.buildOption(vizData, vizBinding, vizType);
        if (option) {
            var myChart = echarts.init(document.getElementById('chartPanel'));
            myChart.setOption(option);
        } 
    }

    var VizPage = React.createClass({
        render: function() {
            var styles = {};
            styles.height = "400px";
            styles.width = "100%";
            return ( 
                <div className="row">
                    <div className="col-md-4">
                        <div className="panel-group" role="tablist" aria-multiselectable="true">
                            <Collapse title="Select Data" id="SelectDataCollapse">
                                <DataSelection handleSelection={handleDataSelection} />
                            </Collapse>

                            <Collapse title="Select Visualization Type" id="SelectVizCollapse">
                                <VizSelection handleSelection={handleVizSelection}  />
                            </Collapse>

                            <Collapse title="Select Data Binding Option" id="SelectBindingCollapse">
                                <div id="vizBindingPanel"/>
                            </Collapse>

                        </div>
                    </div>
                    <div className="col-md-8">
                        <Panel id="VizMain" title="Visualization">
                            <div id="chartPanel" style={styles}>
                            </div>
                        </Panel>
                    </div>
                </div>
            );
        },

        componentDidMount: function() {
            $('#SelectDataCollapse').collapse('show');
            $('#SelectVizCollapse').collapse('show');
            $('#SelectBindingCollapse').collapse('show');
        }
    });

    return VizPage;
});