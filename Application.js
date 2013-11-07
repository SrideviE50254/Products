jQuery.sap.declare("Application");
jQuery.sap.require("sap.ui.app.Application");
var oModel = new sap.ui.model.json.JSONModel();
var myData = {};
sap.ui.app.Application.extend("Application", {

	init: function() {
		// This is our entry point into the application
		// TODO: Is there something we can show the user here while we wait
		// TASK: Try find a way to display a splash screen while data is being loaded
		var dialog = new sap.m.BusyDialog({
			text:'Loading Data...'
		});
		dialog.open();
		OData.read({ requestUri: "https://sapes1.sapdevcenter.com/sap/opu/odata/sap/ZGWSAMPLE_SRV/ProductCollection?$format=json" } 
				  , 
				  function (data) { 
					  dialog.close();
					  myData.Products = data.results;
					  oModel.setData(myData);
					  sap.ui.getCore().setModel(oModel);
				  } 
				);
	},
	
	main: function() {
		// create app view and put to html root element
        var root = this.getRoot();
        sap.ui.jsview("app", "view.App").placeAt(root);
	}

});
