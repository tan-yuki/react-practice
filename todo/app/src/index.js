var TODOItem = React.createClass({

    getInitialState: function() {
        return {
            label: this.props.label,
            complete: this.props.complete
        };
    },

    toggle: function() {
        this.setState({
            complete: !this.state.complete
        });
    },

    onCheck: function(e) {
        this.toggle();
    },

    onClick: function(e) {
        this.toggle();
    },

    render: function() {
        var state = this.state;

        var label = state.label;
        var complete = state.complete;
        var id = this.props.id;

        return (<li className={complete ? "complete" : "yet"} onClick={this.onClick}>
            <input
                type="checkbox"
                ref="check"
                onChange={this.onCheck}
                checked={complete} />

            <span>{label}</span>
        </li>);
    }
});

var TODOList = React.createClass({
    render: function() {
        var list = this.props.items.map(function(item) {
            return (<TODOItem label={item.label} complete={item.complete} id={item.id} key={item.id} />);
        });

        return (<ul>{list}</ul>);
    }
});

var TODOForm = React.createClass({

    onSubmit: function(e) {
        e.preventDefault();

        var todoName = this.refs.todo.getDOMNode().value;
        if (!todoName) {
            return;
        }

        this.props.addNewTodo({
            label: todoName,
            complete: false
        });

        this.refs.todo.getDOMNode().value = '';
    },

    render: function() {
        return <form onSubmit={this.onSubmit}><input type="text" ref="todo" /></form>;
    }
});

var TODO = React.createClass({

    getInitialState: function() {
        return {
            items: []
        };
    },

    addNewTodo: function(item) {
        var items = this.state.items;

        var newId = items.length + 1;
        items.push(_.extend(item, {
            id: newId
        }));
        this.setState(items);
    },

    render: function() {
        return (<div id="contents">
            <TODOForm addNewTodo={this.addNewTodo} />
            <TODOList items={this.state.items} />
        </div>);
    }
});


React.render(<TODO />, document.getElementById('workspace'));
