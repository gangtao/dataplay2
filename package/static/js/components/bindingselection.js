define([], function() {
    var BindingSelection = React.createClass({
        render: function(){
            if ( this.props.isMultiple ) {
                return (
                    <select className="input-medium" ref="selectType" 
                    multiple="multiple" />
                );
            } else {
                return (
                    <select className="input-medium" ref="selectType"/>
                );
            }
            
        },

        componentDidMount: function() {
            var data = this.props.value;
            var handle = this.props.handleSelection;
            var select = $(this.refs.selectType);
            var name = this.props.name;

            select.select2({
                data: data,
                tags: "true",
                width: "256px",
                placeholder: name,
                allowClear: true
            });

            select.val(null).trigger("change");

            select.change(function(){
                var nv = {};
                nv[name] = $(this).val();
                handle(nv);
            }); 
        }
    });

    return BindingSelection;
});