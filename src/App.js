Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    items:{
        html:''
    },


 launch: function() {
                    Ext.create('Rally.data.WsapiDataStore', {
                        model: 'Defect',
                        autoLoad: true,
                        filters: [
                            {
                                property: 'Name',
                                operator: 'contains',
                                value: 'a'
                            }
                        ],
                        listeners: { 
                        
                            load: this._onDataLoaded,
                            scope: this                        
                        }
                    });
                },
            
                _onDataLoaded: function(store, data) {
                    var records = [];
                    Ext.Array.each(data, function(record) {
                    
                        var requirementDetails = Rally.nav.Manager.getDetailUrl(record.get('Requirement'));
                        console.log(requirementDetails);
                        
                        console.log(record.get("Owner"));
                        var requirementDisplay = '';
                        if (record.get('Requirement') !== null) {
                            requirementDisplay = '<a href="'+ requirementDetails +'">' + record.get('Requirement').Name + '</a>';
                        }
                        
                        var ownerDisplay = '';
                        if (record.get("Owner") !== null) {
                            ownerDisplay = record.get('Owner')._refObjectName;
                        }
                         
                        
                        records.push({
                            FormattedID: record.get('FormattedID'),
                            Name: "<span onclick='javascript:Ext.Msg.alert(\"Clicked.\")'>" + record.get('Name') + "</span>",
                            Owner: ownerDisplay,
                            Blocked: record.get('Blocked'),
                            Requirement: requirementDisplay,
                            OpenedDate: record.get('OpenedDate')
                        });
                    });
            
                    this.add({
                        xtype: 'rallygrid',
                        store: Ext.create('Rally.data.custom.Store', {
                            data: records,
                            pageSize: 50
                        }),
                        columnCfgs: [
                            {
                                text: 'ID', dataIndex: 'FormattedID'
                            },
                            {
                                text: 'Name', dataIndex: 'Name', flex: 1
                            },
                            {
                                text: 'Owner', dataIndex: 'Owner'
                            },
                            {
                                text: 'Blocked', dataIndex: 'Blocked'
                            },
                            {
                                text: 'Requirement', dataIndex: 'Requirement'
                            }
                        ]
                    });
                }
                
                
                    
});
