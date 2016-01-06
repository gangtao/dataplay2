define([], function() {
    var Tab = React.createClass({
        render: function() {
            var styles = {};
            styles.overflow = "auto";

            var items = this.props.data;
            return ( 
                <div ref="Tab">
                    <ul className="nav nav-tabs" role="tablist">
                        {items.map(function(item) {
                            var id = "#" + item.name;
                            return <li role="presentation"><a href={id} aria-controls={item.name} role="tab" data-toggle="tab">{item.title}</a></li>;
                        })}
                    </ul>
                    <div className="tab-content">
                        {items.map(function(item) {
                            return <div role="tabpanel" className="tab-pane" id={item.name}></div>;
                        })}
                    </div>
                </div>
            );
        },
        componentDidMount: function() {
            var me = this.refs.Tab;
            $(me).find('a:first').tab('show');
        }
    });

    return Tab;
});