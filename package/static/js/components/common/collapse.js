define([], function() {
    var CollapsePanel = React.createClass({
        render: function() {
            var id = "#" + this.props.id;
            var headId = "heading_" + this.props.id;
            return ( 
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id={headId}>
                        <h4 className="panel-title">
                            <a role="button" data-toggle="collapse" data-parent="#accordion" href={id} aria-expanded="true" aria-controls={this.props.id}>
                                {this.props.title}
                            </a>
                        </h4>
                    </div>
                    <div id={this.props.id} className="panel-collapse collapse" role="tabpanel" aria-labelledby={headId}>
                        <div className="panel-body">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            );
        }
    });

    return CollapsePanel;
});