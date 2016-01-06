define(["comp/bindingselection"], function(BindingSelection) {

    var selectedBinding = {};

    var BindingPanel = React.createClass({
        render: function(){
            var bindings = this.props.bindings;
            var values = this.props.values;
            var handle = this.handleSelect;
            return (
                <form>
                    {bindings.map(function(binding) {
                        return <div className="form-group">
                                <label>{binding.name} ({binding.type}) : </label>
                                <BindingSelection name={binding.name} value={values} handleSelection={handle} isMultiple={binding.maxFeed>1}>
                                </BindingSelection>
                            </div>
                    })}
                </form>
            );
        },

        componentDidMount: function() {
        },

        handleSelect: function(nv) {
            for (var p in nv) {
                selectedBinding[p] = nv[p];
            }

            this.props.handleBinding(selectedBinding);
        }
    });

    return BindingPanel;
});


