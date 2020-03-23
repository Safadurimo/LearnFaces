sap.ui.define([
		"sap/ui/model/json/JSONModel",
], function (JSONModel) {
	"use strict";

	return {

		startNewGame: function () {
			
			// var x = 1;
			var oJSONModel = new JSONModel(
				{
					"current_question_index": 0,
					"current_question": {
							"picture": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Marilyn_Monroe%2C_Korea%2C_1954_cropped.jpg",
							"answers": ["Marylin Monroe", "Friedrich Merz"],
							"correct": 0,
							"answer" : undefined
						},
					"questions" : [
						{
							"picture": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Marilyn_Monroe%2C_Korea%2C_1954_cropped.jpg",
							"answers": ["Marylin Monroe", "Friedrich Merz"],
							"correct": 0
						},
						{
						    "picture": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Marie_Curie_%28Nobel-Chem%29.jpg",
							"answers": ["Albert Einstein", "Marie Curie"],
							"correct": 1
						}
						
						]
				}
				);
			
			var view = sap.ui.getCore().byId("container-nav---app--app");
			
			view.setModel(oJSONModel,"game");
		},
		
		setAnswer : function(answer) {
			
			var view = sap.ui.getCore().byId("container-nav---app--app");
			
			var oModel = view.getModel("game");
			oModel.setProperty( "/current_question/answer", answer);
			
		},
		
		
		nextQuestion: function(){
			var view = sap.ui.getCore().byId("container-nav---app--app");
			var oModel = view.getModel("game");
			
			var current_question_index = oModel.getProperty("/current_question_index");
			var questions = oModel.getProperty("/questions");   
			
			current_question_index = current_question_index + 1;
			var current_question = questions[current_question_index];
			current_question["answer"] = undefined;
			
			oModel.setProperty("/current_question_index", current_question_index);
			oModel.setProperty("/current_question",current_question);
			
		},
		
		hasNextQuestion : function() {
			
			var view = sap.ui.getCore().byId("container-nav---app--app");
			var oModel = view.getModel("game");
			return oModel.getProperty("/current_question_index") < oModel.getProperty("/questions").length -1;
		}

	};

});
