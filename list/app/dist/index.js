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


React.render(React.createElement(TODOList, null), document.getElementById('workspace'));
