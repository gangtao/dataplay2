define(["event/manager"], function(EventBus) {
    var MenuItem = React.createClass({
        render: function() {
            return ( 
                <li role="presentation">
                    <a role="menuitem" className="menu_item" href="#" onClick={this.handleClick}>{this.props.name}</a>
                </li>
            );
        },
        handleClick: function(){
            EventBus.trigger("MenuEvent_"+this.props.name);
        }
    });

    var Menu = React.createClass({
        render: function() {
            var items = this.props.items;

            if (items.length > 0) {
                return ( 
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown">
                            {this.props.name}
                        <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
                            {items.map(function(result) {
                                return <MenuItem name={result}></MenuItem>;
                            })}
                        </ul>
                    </li>
                );  
            } else {
                return ( 
                    <li><a href="#" onClick={this.handleClick}>{this.props.name}</a></li>
                );
            }
        },
        handleClick: function(){
            EventBus.trigger("MenuEvent_"+this.props.name);
        }
    });

    return Menu;
});