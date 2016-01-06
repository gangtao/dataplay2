// Handle data transformation and manipultation
define([], function() {
    var Model = function(data) {
    	this._data = data.slice(0);
    	//by default, set the first row as header 
    	this._header= this._data.splice(0, 1)[0];
    };

    Model.prototype.getSerialsByCol= function(col, isMeasure) {
    	var colIndex = this._header.indexOf(col);
    	var serials = [];
    	if (colIndex >=0) {
    		this._data.map(function(row){
    			var value = row[colIndex];
    			if (isMeasure) {
    				value = parseFloat(value);
    			} 
    			serials.push(value);
    		});
    	}
    	return serials;
    };

    Model.prototype.getUniqueValuesByCol= function(col) {
        var colIndex = this._header.indexOf(col);
        var serials = [];
        if (colIndex >=0) {
            this._data.map(function(row){
                var value = row[colIndex];
                if (serials.indexOf(value) <0) {
                    serials.push(value);
                }
            });
        }
        return serials;
    };

    Model.prototype.getSerialsByFilter= function(col, value, filterCols, isMeasure) {
        var header = this._header;
        var colIndex = header.indexOf(col);

        var filterIndexs = [];

        filterCols.map(function(filterCol){
            var index = header.indexOf(filterCol);
            filterIndexs.push(index);
        })

        var serials = [];
        if (colIndex >=0) {
            this._data.map(function(row){
                var val = row[colIndex];
                if (val == value){
                    var sData =[];
                    filterIndexs.map(function(i){
                        var filterData = row[i];
                        if (isMeasure) {
                            filterData = parseFloat(filterData);
                        }
                        sData.push(filterData);
                    });

                    serials.push(sData);
                }
            });
        }
        return serials;
    };

    return Model
});
