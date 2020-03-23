sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController",
	"../model/Game"
], function (BaseController,Game) {
	"use strict";

	return BaseController.extend("sap.ui.demo.nav.controller.Guess", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.ui.demo.nav.view.Guess
		 */
		onInit: function () {
			
		},
		
		onHavingGuessed: function (oEvent) {
			var idOfPressedButton = oEvent.getSource().getId();
			var pressedButton = this.getView().byId(idOfPressedButton);
			var answer = idOfPressedButton.charAt(idOfPressedButton - 1)
			Game.setAnswer(answer);
			
			var btn = this.byId("button1"); // new sap.ui.commons.Button({text:'Hello World'});
			btn.addStyleClass("myButtonStyle");
		},
		
		onNext: function (oEvent) {
			if(Game.hasNextQuestion()){
				Game.nextQuestion();
			}
			else {
				this.getRouter().navTo("result");
			}
			
		}

  
  


		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sap.ui.demo.nav.view.Guess
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sap.ui.demo.nav.view.Guess
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sap.ui.demo.nav.view.Guess
		 */
		//	onExit: function() {
		//
		//	}

	});

});