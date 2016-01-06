define(["comp/common/collapse",
        "comp/common/panel",
        "comp/dataselection",
        "comp/bindingpanel",
        "comp/common/tab",
        "ml/viz/clsviz",
        "ml/manager"], function(Collapse, Panel, DataSelection, BindingPanel, Tab, CLSViz, ML) {

    var modelName = undefined;
    var modelShortName = undefined;

    var predictResultLabel = "Predict Result";
    var dataUrl = "/data/";

    var modelCreateUrl = undefined;
    var trainUrl = undefined;
    var predictVizUrl = undefined;
    var predictUrl = undefined;
    var modelListUrl = undefined;

    var buildTrainParameter = undefined;
    var renderPredictViz = undefined;

    var trainData = undefined;
    var dataName = undefined;
    var modelType = undefined;
    var dataBinding = undefined;
    var modelId = undefined;

    var tabOption = [{
                        "name":"viz",
                        "title":"Visualization"
                    },{
                        "name":"predict",
                        "title":"Predict"
                    }];

    var initParameters = function() {
        modelCreateUrl = "/ml/" + modelShortName + "/create";
        trainUrl = "/ml/" + modelShortName + "/train";
        predictVizUrl = "/ml/" + modelShortName + "/predictViz";
        predictUrl = "/ml/" + modelShortName + "/predict";
        modelListUrl = "/mlmodel/list/" + modelName;
    }

    var handleDataSelection = function(val) {
        $('#SelectBindingCollapse').collapse('show');
        $("#mlBindingPanel").empty();
        dataName = val;

        if (val) {
            updateData(val);
        } else {
            trainData = undefined;
        } 
    };

    var updateData = function(name) {
        var para = {};
        para.headerOnly = true;

        $.get( dataUrl + name, para, function( data ) {
            var csv = data.csv;
            var data = Papa.parse(csv);
            trainData = data.data;

            var props = {};
            props.bindings = ML.getBinding(modelName);
            props.values = trainData[0];
            props.handleBinding = handleBinding;

            ReactDOM.render(
                React.createElement(BindingPanel, props),
                document.getElementById('mlBindingPanel')
            );
        });
    };

    var handleBinding = function(binding){
        dataBinding = binding;
        $('#TrainCollapse').collapse('show');
    };

    var handleTrain = function(){
        console.log("strat to train the whole dataset~");
        var para = {};
        para.type = modelType;

        $.get( modelCreateUrl, para, function( data ) {
            if ( data.result === "Success") {
                modelId = data.model;

                var trainPara = {};
                trainPara.id = modelId;
                trainPara.data = dataName;
                //trainPara.label = dataBinding.Label;
                //trainPara.features = dataBinding.Features.join();

                buildTrainParameter(trainPara, dataBinding);

                $.get(trainUrl, trainPara, function( tdata ) {
                    if (tdata.result === "Success" ) {
                        updateTrainResult();
                        updateVizPanel();
                    } else {
                        alert("Failed to train the model : " + modelType);
                    }
                });

            } else {
                alert("Failed to create the model : " + modelType);
            }
        });
    };

    var updateTrainResult = function() {
        var props = {};
        props.cols = dataBinding.Features.slice(0);  // Clone the array

        ReactDOM.render(
            React.createElement(PredictDataTable, props),
            document.getElementById('predict')
        );

        var vprops = {};
        vprops.id = "vizpanel";

        ReactDOM.render(
            React.createElement(PredictVizPanel, vprops),
            document.getElementById('viz')
        );
    };

    var updateVizPanel = function() {
        var param = {};
        param.id = modelId;
        param.scale = 30;

        $.get(predictVizUrl, param, function( data ) {
            if (data.result === "Success" ) {
                // Convert ' to " which is json standard
                var predictVizData = $.parseJSON(data.predict.replace(/\'/g,"\""));
                console.log(predictVizData);

                var option = {};
                option.size = {};
                option.size.width = $("#vizpanel").width();
                option.size.height = $("#vizpanel").height();
                option.features = dataBinding.Features;
                option.containerId = "vizpanel";
                option.data = predictVizData.data;
                option.predict = predictVizData.predict;
                option.scale = param.scale;

                $("#vizpanel").empty();
                renderPredictViz(option, dataBinding);
            }
        });
    };

    var PredictRow = React.createClass({
        render: function(){
            var tdata = this.props.data;
            return (
                <tr ref="predictRow">
                    {tdata.map(function(item) {
                        if (item !== predictResultLabel) {
                            return <td><input placeholder={item}></input></td>
                        } else {
                            return <td key="resultCell"><div ref="resultCell"/></td>;
                        }
                        
                    })}
                </tr>
            )
        },
        componentDidMount: function() {
            var me = this.refs.predictRow;
            var result = this.refs.resultCell;
            $(me).focusout(function(){
                var data = [];
                var ready = true;
                $(this).find("input").each(function(index, item) {
                    var text = $(this).val();
                    if ( text.length > 0 ) {
                        // TODO
                        // Validate if the feature is a number
                        data.push(parseFloat(text));
                    } else {
                        ready = false;
                    }
                });

                if (ready) {
                    var para = {};
                    para.id = modelId;
                    para.data = JSON.stringify([data]);
                    $.get(predictUrl, para, function( pdata ) {
                        if (pdata.result === "Success" ) {
                            var label = $.parseJSON(pdata.predict.replace(/\'/g,"\""))
                            $(result).text(label[0]);
                        } else {
                            alert("failed to predict the result!");
                        }
                    });
                }
            })
        }
    });

    var PredictDataTable = React.createClass({
        render: function(){   
            var tdata = this.props.cols;
            tdata.push(predictResultLabel);
            return (
                <table id="predictTable" className="table">
                    <thead>
                        <tr>
                            {tdata.map(function(item) {
                                return <th>{item}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <PredictRow data={tdata} />
                    </tbody> 
                </table>
            );
        },
        componentDidMount: function() {

        }
    });

    var PredictVizPanel = React.createClass({
        render: function(){  
            var styles = {};
            styles.width = "100%";
            styles.height = "400px" 
            return (
                <div id={this.props.id} style={styles}>
                </div>
            );
        },
        componentDidMount: function() {

        }
    });


    var MLPage = React.createClass({
        render: function() {
            modelName = this.props.modelName;
            modelShortName = this.props.modelShortName;
            buildTrainParameter = this.props.buildTrainParameterHandler;
            renderPredictViz = this.props.renderPredictVizHandler;

            initParameters();
            return ( 
                <div className="row">
                    <div className="col-md-4">
                        <div className="panel-group" role="tablist" aria-multiselectable="true">

                            <Collapse title="Select Model" id="SelectModelCollapse">
                                <select className="input-medium" id="selectModelType"/>
                            </Collapse>

                            <Collapse title="Select Data" id="SelectDataCollapse">
                                <DataSelection handleSelection={handleDataSelection} />
                            </Collapse>

                            <Collapse title="Select Data Binding" id="SelectBindingCollapse">
                                <div id="mlBindingPanel"/>
                            </Collapse>

                            <Collapse title="Train The Model" id="TrainCollapse">
                                <div>
                                    <button className="btn btn-default btn-xs" onClick={handleTrain}>Train</button>
                                </div>
                            </Collapse>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <Panel id="MLMain" title="Predict View">
                            <Tab data={tabOption} />
                        </Panel>
                    </div>
                </div>
            );
        },
        componentDidMount: function() {
            $('#SelectModelCollapse').collapse('show');
            $.get( modelListUrl, function( data ) {
                var data = $.parseJSON(data);
                var ModelSelect = $("#selectModelType");
                ModelSelect.select2({
                    data: data,
                    tags: "true",
                    width: "256px",
                    placeholder: "Select a model",
                    allowClear: true
                });

                ModelSelect.val(null).trigger("change");

                ModelSelect.change(function(){
                    $('#SelectDataCollapse').collapse('show');
                    modelType = $(this).val();
                });
            });
        }
    });

    return MLPage;
});