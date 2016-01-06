define(["viz/manager"], function(Viz) {
    var VizSelectionPanel = React.createClass({
        render: function(){
            return (
                <select className="input-medium" id="selectVizType"/>
            );
        },

        componentDidMount: function() {
            var handle = this.props.handleSelection;
            var vizTypeSelect = $("#selectVizType");
            var types = Viz.getVizTypes();
            vizTypeSelect.select2({
                data: types,
                tags: "true",
                width: "256px",
                placeholder: "Select a visualization type",
                allowClear: true
            });

            vizTypeSelect.val(null).trigger("change");

            vizTypeSelect.change(function(){
                console.log("New Viz Type selected : " + $(this).val());
                handle($(this).val());
            }); 
        }
    });

    return VizSelectionPanel;
});