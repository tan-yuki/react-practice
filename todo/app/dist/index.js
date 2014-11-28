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

        return (React.createElement("li", {className: complete ? "complete" : "yet", onClick: this.onClick}, 
            React.createElement("input", {
                type: "checkbox", 
                ref: "check", 
                onCheck: this.onCheck, 
                defaultChecked: complete}), 

            React.createElement("span", null, label)
        ));
    }
});

var TODOList = React.createClass({displayName: 'TODOList',
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
            return (React.createElement(TODOItem, {label: item.label, complete: item.complete}));
        });

        return (React.createElement("ul", null, list));
    }
});

var TODOForm = React.createClass({displayName: 'TODOForm',
    onSubmit: function(e) {
        e.preventDefault();

        var todoName = this.refs.todo.getDOMNode().value;

    },

    render: function() {
        return React.createElement("form", {onSubmit: this.onSubmit}, React.createElement("input", {type: "text", ref: "todo"}));
    }
});

var TODO = React.createClass({displayName: 'TODO',
    render: function() {
        return (React.createElement("div", {id: "contents"}, 
            React.createElement(TODOForm, null), 
            React.createElement(TODOList, null)
        ));
    }
});


React.render(React.createElement(TODO, null), document.getElementById('workspace'));
