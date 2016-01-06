define(["comp/ml/mlview",
        "ml/viz/clsviz"
        ], function(ML, Viz) {

    var name = "Cluster";
    var shortName = "cluster";

    var buildTrainParameterHandler = function(trainPara, dataBinding){
        trainPara.train = dataBinding.Features.join();
    };

    var renderPredictVizHandler = function(option, dataBinding) {
        option.target = dataBinding.Target;
        var viz = new Viz(option);
        viz.render();
    };

    var ClusterPage = React.createClass({
        render: function() {
            return ( 
                <ML modelName={name} modelShortName={shortName} buildTrainParameterHandler={buildTrainParameterHandler} renderPredictVizHandler={renderPredictVizHandler} />
            );
        },
        componentDidMount: function() {
        }
    });

    return ClusterPage;
});