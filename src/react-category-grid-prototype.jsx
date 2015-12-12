var ReactGrid = React.createClass({
    render: function() {
        var rows = [];
        var lastCategory = null;
        var tableStyle = {
            color: 'blue',
            fontWeight: 'bold',
            width: '100%'
        }
        console.log('this.props.products is ' +this.props.products);
        this.props.products.forEach(function(product) {
            if (product.category !== lastCategory) {
                rows.push(<CategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ItemRow product={product} key={product.name} />);
            lastCategory = product.category;
        }.bind(this));
        console.log('rows is ' + rows);
        return (
            <div className>
                <table className="table table-bordered table-hover bs-grid category-table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
});


var CategoryRow = React.createClass({
    render: function() {
        return (<tr><th colSpan="4" className='category-tr'>{this.props.category}</th></tr>);
    }
});

var ItemRow = React.createClass({
    getInitialState: function() {
        return {product: this.props.product};
    },
    handlePriceChange : function(event) {
        console.log('call the handle change.', event);
        this.props.product.price = event.target.value;
        this.props.product.total =  this.calculateTotal(this.props.product.price, this.props.product.quantity);
        this.setState({product: this.props.product});
    },
    handleQuantityChange : function(event) {
        this.props.product.quantity = event.target.value;
        this.props.product.total =  this.calculateTotal(this.props.product.price, this.props.product.quantity);
        this.setState({product: this.props.product});
    },
    calculateTotal : function(price, quantity) {
        return price * quantity;
    },
    render: function() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
                {this.props.product.name}
            </span>;
        var total = this.calculateTotal(this.props.product.price, this.props.product.quantity);
        return (
            <tr>
                <td>{name}</td>
                <td>$<input type="text" value={this.state.product.price} onChange={this.handlePriceChange}/></td>
                <td><input type='text' value={this.props.product.quantity} onChange={this.handleQuantityChange} /></td>
                <td>{total}</td>
            </tr>
        );
    }
});

/*var ItemInputCell = React.createClass({

    render: function() {
        return (<input type="text" value={this.state.product.price} onChange={this.handlePriceChange}/>);
    }
});*/

var PRODUCTS = [
    {category: 'Sporting Goods', price: '49.99', stocked: true, name: 'Football',quantity: '1', total:''},
    {category: 'Sporting Goods', price: '9.99', stocked: true, name: 'Baseball',quantity: '1', total:''},
    {category: 'Sporting Goods', price: '29.99', stocked: false, name: 'Basketball',quantity: '1', total:''},
    {category: 'Electronics', price: '99.99', stocked: true, name: 'iPod Touch',quantity: '1', total:''},
    {category: 'Electronics', price: '399.99', stocked: false, name: 'iPhone 5',quantity: '1', total:''},
    {category: 'Electronics', price: '199.99', stocked: true, name: 'Nexus 7',quantity: '1', total:''},
    {category: 'Electronics', price: '299.99', stocked: true, name: 'iPad 5',quantity: '1', total:''},
];

ReactDOM.render(
    <ReactGrid products={PRODUCTS} />,
    document.getElementById('example')
);
