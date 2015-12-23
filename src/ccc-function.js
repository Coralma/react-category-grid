;(function() {
    function categoryGridFunctions() {
        var gridOptions = [
            {displayName:'序号' ,field: "displayOrder", cellType:'label', headStyle:'width: \'50px\'',visible:'true'},
            {displayName:'操作' ,field: "operator", cellType:'codeTable', code:'002'},
            {displayName:'损失项目' ,field: "itemName", cellType:'stringInput'},
            {displayName:'配件编号' ,field: "itemCode", cellType:'stringInput'},
            {displayName:'配件渠道' ,field: "channel", cellType:'codeTable', code:'001'},
            {displayName:'参考单价' ,field: "referPrice", cellType:'numberInput'},
            {displayName:'单价' ,field: "price", cellType:'numberInput'},
            {displayName:'用量' ,field: "quantity", cellType:'numberInput'},
            {displayName:'折后材料费' ,field: "discMaterialFee", cellType:'numberInput'},
            {displayName:'工种' ,field: "workType", cellType:'codeTable', code:'003'},
            {displayName:'维修程度' ,field: "fixLevel", cellType:'stringInput'},
            {displayName:'参考维修费' ,field: "referFixFee", cellType:'numberInput'},
            {displayName:'维修费' ,field: "fixFee", cellType:'numberInput'},
            {displayName:'折后维修费' ,field: "discFixFee", cellType:'numberInput'},
            {displayName:'参考拆装费' ,field: "referInstallFee", cellType:'numberInput'},
            {displayName:'拆装费' ,field: "installFee", cellType:'numberInput'},
            {displayName:'折后拆装费' ,field: "discInstallFee", cellType:'numberInput'},
            {displayName:'喷漆程度' ,field: "sprayLevel", cellType:'codeTable', code:'004'},
            {displayName:'参考喷漆费' ,field: "referSprayFee", cellType:'numberInput'},
            {displayName:'喷漆费' ,field: "sprayFee", cellType:'numberInput'},
            {displayName:'折后喷漆费' ,field: "discSprayFee", cellType:'numberInput'},
            {displayName:'回收' ,field: "reclaim", cellType:'booleanCheck'},
            {displayName:'残值' ,field: "scrapValue", cellType:'numberInput'},
            {displayName:'折旧' ,field: "depreciation", cellType:'label'},
            {displayName:'复勘' ,field: "resurvey", cellType:'booleanCheck'},
        ];
        var gridType = 1;
        /*var lossItemData = [
            {displayOrder:'1', itemName:'左前大灯',itemCode:'DK51 51 040C', category:'前照灯'},
        ];*/
        var lossItemData = [];
        return {
            gridOptions: gridOptions,
            gridType:gridType,
            lossItemData: lossItemData,
            initLossItemData: function() {
                if(lossItemData.length == 0) {
                    for(var i=1;i<100;i++) {
                        lossItemData.push({displayOrder:i, itemName:'左前大灯',itemCode:'DK51 51 040C', category:'前照灯',price:0, quantity:0, fixFee:0, referPrice:0,discMaterialFee:0,fixLevel:0,referFixFee:0,discFixFee:0,referInstallFee:0,installFee:0,discInstallFee:0,referSprayFee:0,sprayFee:0,discSprayFee:0,scrapValue:0});
                    }
                }
                return lossItemData;
            },
            addLossItemData: function(num) {
                var index = lossItemData.length + 1;
                var total = index + num;
                for(var i=index;i < total;i++) {
                    lossItemData.push({displayOrder:i, itemName:'左前大灯',itemCode:'DK51 51 040C', category:'前照灯',price:0, quantity:0, fixFee:0, referPrice:0,discMaterialFee:0,fixLevel:0,referFixFee:0,discFixFee:0,referInstallFee:0,installFee:0,discInstallFee:0,referSprayFee:0,sprayFee:0,discSprayFee:0,scrapValue:0});
                }
            },
            findCode :function(codeId) {
                var codeTable = {};
                if(codeId == '001') {
                    codeTable = [{value:'1', label:'4S店'},{ value:'2', label:'市场价'},{value:'3', label:'适用价' }]
                } else if(codeId == '002') {
                    codeTable = [{value:'1', label:'换件'},{ value:'2', label:'维修'},{value:'3', label:'拆装'},{value:'4', label:'喷漆'},{value:'5', label:'辅料'}]
                } else if(codeId == '003') {
                    codeTable = [{value:'1', label:'钣金'},{ value:'2', label:'机工'},{value:'3', label:'电工' }]
                } else if(codeId == '004') {
                    codeTable = [{value:'1', label:'全漆'},{ value:'2', label:'半漆'},{value:'3', label:'补漆' }]
                }
                return codeTable;
            },
        };
    }
    this.window.reactCategoryGrid = categoryGridFunctions();
}.call(this));































