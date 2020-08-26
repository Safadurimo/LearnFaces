sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"../model/Game"
], function (BaseController, JSONModel, Game) {
	"use strict";

	return BaseController.extend("sap.ui.demo.nav.controller.Home", {

		onInit: function () {
			
			
		},

		onPressStartGame: function () {
			
			Game.startNewGame();
			this.getRouter().navTo("guess");

			
		}
	});

});