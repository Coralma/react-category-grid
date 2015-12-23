var ReactGrid = React.createClass({
    render: function() {
        var rows = [];
        var lastCategory = null;
        var tableStyle = {
            color: 'blue',
            fontWeight: 'bold',
            width: '100%'
        }
        //console.log('this.props.products is ' +this.state.products);
        this.props.products.forEach(function(product) {
            if (product.category !== lastCategory) {
                rows.push(<CategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ItemRow product={product} key={product.name} />);
            lastCategory = product.category;
        }.bind(this));
        //console.log('rows is ' + rows);
        return (
            <div className>
                <table className="table table-bordered table-hover bs-grid category-table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Channel</th>
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
        return (<tr><th colSpan="5" className='category-tr'>{this.props.category}</th></tr>);
    }
});

var ItemRow = React.createClass({
    getInitialState: function() {
        return {product: this.props.product};
    },
    /*handlePriceChange : function(event) {
        console.log('call the handle change.', event);
        this.props.product.price = event.target.value;
        this.props.product.total =  this.calculateTotal(this.props.product.price, this.props.product.quantity);
        this.setState({product: this.props.product});
    },
    handleQuantityChange : function(event) {
        this.props.product.quantity = event.target.value;
        this.props.product.total =  this.calculateTotal(this.props.product.price, this.props.product.quantity);
        this.setState({product: this.props.product});
    },*/
    handleRowItemChange: function(newValue, oldValue, itemName) {
        console.log("newValue, oldValue, itemName: ", newValue, oldValue, itemName);
        this.props.product[itemName] = newValue;
        this.props.product.total = this.calculateTotal(this.props.product.price, this.props.product.quantity);
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
        /*var total = this.calculateTotal(this.props.product.price, this.props.product.quantity);*/
        var total = this.state.product['total'];
        var price = this.state.product['price'];
        var quantity = this.state.product['quantity'];
        //console.log("price and quantity: ", price, quantity);
        //console.log("run the laborHour Utils: " + window.LaborHourUtils.testFirstFun());
        return (
            <tr>
                <td>{name}</td>
                <td><InputCell cellValue={price} cellName={'price'} onRowItemChange={this.handleRowItemChange}/></td>
                <td><InputCell cellValue={quantity} cellName={'quantity'} onRowItemChange={this.handleRowItemChange}/></td>
                <td>{total}</td>
                <td><CodeTableCell cellValue={this.state.product['channel']} cellName={'channel'} code='001' onRowItemChange={this.handleRowItemChange}/></td>
            </tr>
        );
    }
});

var InputCell = React.createClass({
    getDefaultProps : function () {
        return { value: 0 }
    },
    handleCellBlur : function(event) {
        this.props.onRowItemChange(
            this.refs.inputCell.value, this.props.cellValue, this.props.cellName
        );
    },
    render: function() {
        return (<input type="text" defaultValue={this.props.cellValue} ref="inputCell" onBlur={this.handleCellBlur} onChange={this.handleCellChange} readOnly={false}/>);
    }
});

var CodeTableCell = React.createClass({
    handleCellChange : function(event) {
        console.log('run in handleCellChange ',this.refs.codeTableCell.value, this.props.cellValue,this.props.cellName);
        this.props.onRowItemChange(
            this.refs.codeTableCell.value, this.props.cellValue, this.props.cellName
        );
    },
    render: function() {
        var codeId = this.props.code;
        var codeValue = this.props.cellValue;
        //console.log('run in codeTableCell ', codeId, codeValue);
        var codeTable = window.LaborHourUtils.findCode(codeId);
        var field = [];
        codeTable.map(function(code) {
            field.push(<option value={code.value} key={code.value}>{code.label}</option>);
        });
        return (
            <select defaultValue={codeValue} ref="codeTableCell" onChange={this.handleCellChange}>{field}</select>
        );
    }
})

window.itemGridRender = function() {
    ReactDOM.render(
        <ReactGrid products={window.LaborHourUtils.productList} />,
        document.getElementById('example')
    );
};
itemGridRender();