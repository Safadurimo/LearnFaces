sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"../model/Game"
], function (BaseController, JSONModel, Game) {
	"use strict";

	return BaseController.extend("sap.ui.demo.nav.controller.Home", {

		onInit: function () {
			
			var sPath = jQuery.sap.getModulePath("sap.ui.demo.nav", "/model/persons.json");

			// initialize the model with the JSON file
			var oModel = new JSONModel(sPath);

			// set the model to the view
			this.getView().setModel(oModel, "jsonFile");
			
		},

		onPressStartGame: function () {
			Game.startNewGame();
			this.getRouter().navTo("guess");

			
		}
	});

});