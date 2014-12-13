var TODOItem = React.createClass({

    propTypes: {
        todo: React.PropTypes.shape({
            id:       React.PropTypes.number.isRequired,
            label:    React.PropTypes.string.isRequired,
            complete: React.PropTypes.bool.isRequired
        }),
        onClick:  React.PropTypes.func.isRequired
    },

    getInitialState: function() {
        return this.props.todo;
    },

    onClick: function(e) {
        this.props.onClick(this.props.todo.id);
    },

    render: function() {
        var todo = this.state;

        var id       = todo.id;
        var label    = todo.label;
        var complete = todo.complete;

        return (<li className={complete ? "complete" : "yet"} onClick={this.onClick}>
            <input
                type="checkbox"
                ref="check"
                onChange={this.onClick}
                checked={complete} />

            <span>{label}</span>
        </li>);
    }
});

var TODOList = React.createClass({

    propTypes: {
        items:   React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        onClick: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
        return {
            items: this.props.items
        };
    },

    render: function() {
        var onClick = this.props.onClick;
        var list = _.map(this.state.items, function(item) {
            return (<TODOItem
                key={item.id}
                todo={item}
                onClick={onClick}
            />);
        });

        return (<ul>{list}</ul>);
    }
});

var TODOForm = React.createClass({

    propTypes: {
        addNewTodo: React.PropTypes.func.isRequired
    },

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

var TODOInfo = React.createClass({
    propTypes: {
        items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    render: function() {
        var items = this.props.items;

        var completedCount = _.filter(items, function(item) {
                return item.complete;
            }).length;

        var remainCount = items.length - completedCount;

        return (<div>
            <ul>
              <li><span>completed: {completedCount}</span></li>
              <li><span>remain: {remainCount}</span></li>
            </ul>
        </div>);
    }
});

var TODO = React.createClass({

    getInitialState: function() {
        return {
            items: [
                {id: 1, label: 'hoge', complete: false},
                {id: 2, label: 'fuga', complete: true},
                {id: 3, label: 'bar',  complete: false},
            ]
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

    onClick: function(id) {
        var items = this.state.items;

        this.setState(_.map(items, function(item) {
            if (item.id === id) {
                item.complete = !item.complete;
            }

            return item;
        }));
    },

    render: function() {
        return (<div id="contents">
            <TODOForm addNewTodo={this.addNewTodo} />
            <TODOList items={this.state.items} onClick={this.onClick} />
            <TODOInfo items={this.state.items} />
        </div>);
    }
});


React.render(<TODO />, document.getElementById('workspace'));
