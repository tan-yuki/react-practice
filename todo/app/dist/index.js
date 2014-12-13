var TODOItem = React.createClass({displayName: 'TODOItem',

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

        return (React.createElement("li", {className: complete ? "complete" : "yet", onClick: this.onClick}, 
            React.createElement("input", {
                type: "checkbox", 
                ref: "check", 
                onChange: this.onClick, 
                checked: complete}), 

            React.createElement("span", null, label)
        ));
    }
});

var TODOList = React.createClass({displayName: 'TODOList',

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
            return (React.createElement(TODOItem, {
                key: item.id, 
                todo: item, 
                onClick: onClick}
            ));
        });

        return (React.createElement("ul", null, list));
    }
});

var TODOForm = React.createClass({displayName: 'TODOForm',

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
        return React.createElement("form", {onSubmit: this.onSubmit}, React.createElement("input", {type: "text", ref: "todo"}));
    }
});

var TODOInfo = React.createClass({displayName: 'TODOInfo',
    propTypes: {
        items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    render: function() {
        var items = this.props.items;

        var completedCount = _.filter(items, function(item) {
                return item.complete;
            }).length;

        var remainCount = items.length - completedCount;

        return (React.createElement("div", null, 
            React.createElement("ul", null, 
              React.createElement("li", null, React.createElement("span", null, "completed: ", completedCount)), 
              React.createElement("li", null, React.createElement("span", null, "remain: ", remainCount))
            )
        ));
    }
});

var TODO = React.createClass({displayName: 'TODO',

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
        return (React.createElement("div", {id: "contents"}, 
            React.createElement(TODOForm, {addNewTodo: this.addNewTodo}), 
            React.createElement(TODOList, {items: this.state.items, onClick: this.onClick}), 
            React.createElement(TODOInfo, {items: this.state.items})
        ));
    }
});


React.render(React.createElement(TODO, null), document.getElementById('workspace'));
