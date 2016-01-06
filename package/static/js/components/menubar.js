define(["comp/menu"], function(Menu) {
    var MenuBar = React.createClass({
        render: function() {
            var items = this.props.data;
            return ( 
                <ul className="nav navbar-nav">
                    {items.map(function(result) {
                        return <Menu name={result.name} key={result.id} items={result.items}></Menu>;
                    })}
                </ul>
            );
        }
    });

    return MenuBar;
});