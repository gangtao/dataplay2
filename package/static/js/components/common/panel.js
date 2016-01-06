define([], function() {
    var Panel = React.createClass({
        render: function() {
            var styles = {};
            styles.overflow = "auto";
            return ( 
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">{this.props.title}</h3>
                    </div>
                    <div className="panel-body" id={this.props.id} style={styles}>
                        {this.props.children}
                    </div>
                </div>
            );
        }
    });

    return Panel;
});