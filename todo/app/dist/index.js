var TODOItem = React.createClass({displayName: 'TODOItem',

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

        return (React.createElement("li", {className: complete ? "complete" : "yet", onClick: this.onClick}, 
            React.createElement("input", {
                type: "checkbox", 
                ref: "check", 
                onChange: this.onCheck, 
                checked: complete}), 

            React.createElement("span", null, label)
        ));
    }
});

var TODOList = React.createClass({displayName: 'TODOList',
    render: function() {
        var list = this.props.items.map(function(item) {
            return (React.createElement(TODOItem, {label: item.label, complete: item.complete, id: item.id, key: item.id}));
        });

        return (React.createElement("ul", null, list));
    }
});

var TODOForm = React.createClass({displayName: 'TODOForm',

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

var TODO = React.createClass({displayName: 'TODO',

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
        return (React.createElement("div", {id: "contents"}, 
            React.createElement(TODOForm, {addNewTodo: this.addNewTodo}), 
            React.createElement(TODOList, {items: this.state.items})
        ));
    }
});


React.render(React.createElement(TODO, null), document.getElementById('workspace'));
