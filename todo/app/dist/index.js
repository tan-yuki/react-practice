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
            return (
                React.createElement("li", {className: item.complete ? "complete" : "yet"}, 
                  item.label
                )
            );
        });

        return (React.createElement("ul", null, list));
    }
});

var TODOForm = React.createClass({displayName: 'TODOForm',
    onSubmit: function(e) {
        e.preventDefault();

        var todo = this.refs.todo.getDOMNode().value;

        alert(todo);
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
