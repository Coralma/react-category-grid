;(function() {


    function laborHourFunctions() {
        var PRODUCTS = [
            {category: 'Sporting Goods', price: '49.99', stocked: true, name: 'Football',quantity: '1', total:''},
            {category: 'Sporting Goods', price: '9.99', stocked: true, name: 'Baseball',quantity: '1', total:''},
            {category: 'Sporting Goods', price: '29.99', stocked: false, name: 'Basketball',quantity: '1', total:''},
            {category: 'Electronics', price: '99.99', stocked: true, name: 'iPod Touch',quantity: '1', total:''},
            {category: 'Electronics', price: '399.99', stocked: false, name: 'iPhone 5',quantity: '1', total:''},
            {category: 'Electronics', price: '199.99', stocked: true, name: 'Nexus 7',quantity: '1', total:''},
            {category: 'Electronics', price: '299.99', stocked: true, name: 'iPad 5',quantity: '1', total:''}
        ];
        var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

        return {
            productList: PRODUCTS,
            testFirstFun : function() {
                return "Exec testFirstFun";
            },
            testSecondFun: function(param) {
                return "The param is: " + param;
            },
            addProduct : function() {
                PRODUCTS.push({category: 'Electronics', price: '299.99', stocked: true, name: this.generateMixed(5),quantity: '1', total:''});
            },
            generateMixed: function(n) {
                var res = "";
                for(var i = 0; i < n ; i ++) {
                    var id = Math.ceil(Math.random()*35);
                    res += chars[id];
                }
                return res;
            }
        }
    }
    this.window.LaborHourUtils = laborHourFunctions();
}.call(this));