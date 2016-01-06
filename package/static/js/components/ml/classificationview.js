define(["comp/ml/mlview",
        "ml/viz/clsviz"
        ], function(ML, CLSViz) {

    var name = "Classification";
    var shortName = "cls";

    var buildTrainParameterHandler = function(trainPara, dataBinding){
        trainPara.label = dataBinding.Label;
        trainPara.features = dataBinding.Features.join();
    };

    var renderPredictVizHandler = function(option, dataBinding) {
        var clsviz = new CLSViz(option);
        clsviz.render();
    };

    var ClassificationPage = React.createClass({
        render: function() {
            return ( 
                <ML modelName={name} modelShortName={shortName} buildTrainParameterHandler={buildTrainParameterHandler} renderPredictVizHandler={renderPredictVizHandler} />
            );
        },
        componentDidMount: function() {
        }
    });

    return ClassificationPage;
});