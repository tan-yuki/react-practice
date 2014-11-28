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

        return (<li className={complete ? "complete" : "yet"} onClick={this.onClick}>
            <input
                type="checkbox"
                ref="check"
                onCheck={this.onCheck}
                defaultChecked={complete} />

            <span>{label}</span>
        </li>);
    }
});

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
            return (<TODOItem label={item.label} complete={item.complete} />);
        });

        return (<ul>{list}</ul>);
    }
});

var TODOForm = React.createClass({
    onSubmit: function(e) {
        e.preventDefault();

        var todoName = this.refs.todo.getDOMNode().value;

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
