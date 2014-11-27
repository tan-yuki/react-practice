var TODOList = React.createClass({
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

var TODOForm = React.createClass({
    onSubmit: function(e) {
        e.preventDefault();

        var todo = this.refs.todo.getDOMNode().value;

        alert(todo);
    },

    render: function() {
        return <form onSubmit={this.onSubmit}><input type="text" ref="todo"/></form>;
    }
});

var TODO = React.createClass({
    render: function() {
        return (<div id="contents">
            <TODOForm />
            <TODOList />
        </div>);
    }
});


React.render(<TODO />, document.getElementById('workspace'));
