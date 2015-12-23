var ReactCategoryGrid = React.createClass({
    render: function() {
        //console.log(JSON.stringify(this.props.gridOptions), this.props.gridType);
        var heads = [], rows = [], lastCategory = null, headSize=this.props.gridOptions.length;
        this.props.gridOptions.forEach(function(head) {
            heads.push(<GridHead head={head} key={head.field}/>);
        }.bind(this));
        this.props.data.forEach(function(d) {
            if (d.category !== lastCategory) {
                rows.push(<CategoryRow category={d.category} size={headSize} key={d.category} />);
            }
            rows.push(<ItemRow item={d} gridOptions={this.props.gridOptions} key={d.displayOrder} />);
            lastCategory = d.category;
        }.bind(this));
        return (
            <div style={{height:'300px'}}>
                <table className="table table-bordered table-hover bs-grid category-table-striped">
                    <thead>
                        <tr>{heads}</tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
});

var GridHead = React.createClass({
    render: function() {
        var displayName = this.props.head.displayName;
        return (<th>{displayName}</th>);
    }
});

var CategoryRow = React.createClass({
    render: function() {
        return (<tr><th colSpan={this.props.size} className='category-tr'>{this.props.category}</th></tr>);
    }
});


var ItemRow = React.createClass({
    getInitialState: function() {
        return {item : this.props.item};
    },
    handleItemChange: function(newValue, oldValue, itemName) {
        console.log("newValue, oldValue, itemName: ", newValue, oldValue, itemName);
        this.props.item[itemName] = newValue;
        if(itemName ==  'price') {
            this.props.item['fixFee'] = newValue * this.props.item['quantity'];
        } else if(itemName == 'quantity') {
            this.props.item['fixFee'] = newValue * this.props.item['price'];
        }
        this.setState({item: this.props.item});
    },
    render: function() {
        //console.log(JSON.stringify(this.props.gridOptions), this.props.gridType);
        var cells = [], index=1;
        this.props.gridOptions.forEach(function(column) {
            var cellName = column.field;
            var cellValue = this.state.item[column.field];
            //console.log('cellName is ' + cellName + ' , cellValue is ' + cellValue);
            if(column.cellType == 'label') {
                cells.push(<td key={index}>{cellValue}</td>);
            } else if(column.cellType == 'codeTable') {
                var code = column.code;
                cells.push(<td key={index}><CodeTableCell cellValue={cellValue} cellName={cellName} code={code} onItemChange={this.handleItemChange}/></td>);
            } else if(column.cellType == 'stringInput') {
                cells.push(<td key={index}><InputCell cellValue={cellValue} cellName={cellName} onItemChange={this.handleItemChange}/></td>);
            } else if(column.cellType == 'numberInput') {
                cells.push(<td key={index}><InputCell cellValue={this.state.item[column.field]} cellName={cellName} onItemChange={this.handleItemChange}/></td>);
            } else if(column.cellType == 'booleanCheck') {
                cells.push(<td key={index}>{cellValue}</td>);
            }
            index++;
        }.bind(this));
        return (<tr>{cells}</tr>);
    }
});


var InputCell = React.createClass({
    getDefaultProps : function () {
        return { value: 0 }
    },
    handleCellBlur : function(event) {
        this.props.onItemChange(
            this.refs.inputCell.value, this.props.cellValue, this.props.cellName
        );
    },
    render: function() {
        return (<input type="text" defaultValue={this.props.cellValue} ref="inputCell" onBlur={this.handleCellBlur} readOnly={false}/>);
    }
});

var CodeTableCell = React.createClass({
    handleCellChange : function(event) {
        console.log('run in handleCellChange ',this.refs.codeTableCell.value, this.props.cellValue,this.props.cellName);
        this.props.onItemChange(
            this.refs.codeTableCell.value, this.props.cellValue, this.props.cellName
        );
    },
    render: function() {
        var codeId = this.props.code;
        var codeValue = this.props.cellValue;
        //console.log('run in codeTableCell ', codeId, codeValue);
        var codeTable = window.reactCategoryGrid.findCode(codeId);
        var field = [];
        codeTable.map(function(code) {
            field.push(<option value={code.value} key={code.value}>{code.label}</option>);
        });
        return (
            <select defaultValue={codeValue} ref="codeTableCell" onChange={this.handleCellChange}>{field}</select>
        );
    }
})

window.lossItemGridRender = function() {
    ReactDOM.render(
        <ReactCategoryGrid gridOptions={window.reactCategoryGrid.gridOptions}
                           gridType={window.reactCategoryGrid.gridType}
                           data={window.reactCategoryGrid.initLossItemData()}/>,
        document.getElementById('lossItemGrid')
    );
};
lossItemGridRender();