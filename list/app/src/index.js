var List = React.createClass({
    getInitialState: function() {
        return {
            items: [
                {label: 'hoge', complete: false},
                {label: 'fuga', complete: true},
                {label: 'bar',  complete: false},
            ]
        };
    },

    render: function() {
        var list = _.map(this.state.items, function(item) {
            return (
                <li className={item.complete ? "complete" : "yet"}>
                  {item.label}
                </li>
            );
        });

        return (<ul>{list}</ul>);
    }
});


React.render(<List />, document.getElementById('workspace'));
