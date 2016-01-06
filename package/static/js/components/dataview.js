define(["comp/common/collapse",
        "comp/common/panel",
        "comp/dataselection"], 
        function(Collapse, Panel, DataSelection) {

    var DataUploadPanel = React.createClass({
        render: function(){
            return (
                <div>
                    <form role="form" method="post" encType="multipart/form-data"
                        onSubmit={this.trackFormSubmission} >
                        <div className="form-group">
                            <input id="input-id" type="file" name="file"></input>
                        </div>
                    </form>
                </div>
            );
        },

        componentDidMount: function() {
            $("#input-id").fileinput({
                'showPreview' : true,
                'uploadUrl' : '/csvdata',
                'allowedFileExtensions' : ['csv']
            });
        }
    });
    

    var handleSelection = function(val) {
        if (val !== null) {
            updateDataTable(val);
        } else {
            $('#dataTablePanel').empty();
        }
    }


    var updateDataTable = function(name) {
        var para = {};
        //para.headerOnly = true;

        $.get( "/data/" + name, para, function( data ) {
            var csv = data.csv;
            var data = Papa.parse(csv);
            console.log(data);

            $('#DataTablePanel').empty();

            //TODO : Update Loading State with icon?
            ReactDOM.render(
                React.createElement(DataTable, {
                    data: data.data
                }),
                document.getElementById('dataTablePanel')
            );

            $('#dataTable').DataTable();
        });
    };

    var DataTablePanel = React.createClass({
        render: function(){
            return (
                <Panel id="dataTablePanel" title="Data View">
                </Panel>
            );
        },
        componentDidMount: function() {
        }
    });

    var DataRow = React.createClass({
        render: function() {
            var rowData = this.props.data;
            return (
                <tr>
                    {rowData.map(function(item){
                        return <td>{item}</td>
                    })}
                </tr>
            );
        }
    });

    var DataTable = React.createClass({
        render: function(){
            var tdata = this.props.data;
            var header = tdata[0];
            tdata.splice(0, 1);
            
            return (
                <table id="dataTable" className="table">
                    <thead>
                        <tr>
                            {header.map(function(item) {
                                return <th>{item}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {tdata.map(function(item) {
                            return <DataRow data={item}></DataRow>;
                        })}
                    </tbody>
                </table>
            );
        },
        componentDidMount: function() {

        }
    });

    var DataPage = React.createClass({
        render: function() {
            return ( 
                <div className="row">
                    <div className="col-md-4">
                        <div className="panel-group" role="tablist" aria-multiselectable="true">
                            <Collapse title="Select Data" id="SelectDataCollapse">
                                <DataSelection headerOnly="true" handleSelection={handleSelection} />
                            </Collapse>

                            <Collapse title="Add Data" id="DataUploadCollapse">
                                <DataUploadPanel></DataUploadPanel>
                            </Collapse>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <DataTablePanel/>
                    </div>
                </div>
            );
        },

        componentDidMount: function() {
            $('#SelectDataCollapse').collapse('show');
        }
    });

    return DataPage;
});