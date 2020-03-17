sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("sap.ui.demo.nav.controller.Home", {

		onInit: function () {
			
		},

		onPressStartGame: function () {
			this.getRouter().navTo("guess");

			var sPath = jQuery.sap.getModulePath("sap.ui.demo.nav", "/model/persons.json");

			// initialize the model with the JSON file
			var oModel = new JSONModel(sPath);

			// set the model to the view
			this.getView().setModel(oModel, "jsonFile");
		}
	});

});