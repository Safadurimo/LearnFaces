sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController",
	"../model/Game"
], function (BaseController,Game) {
	"use strict";

	return BaseController.extend("sap.ui.demo.nav.controller.Result", {

		onInit: function () {

		},
		
		onPressStartGame : function() {
			Game.startNewGame();
			this.getRouter().navTo("guess");
		},
		
		onPressHomePage: function() {
			this.getRouter().navTo("");
		}

	});

});