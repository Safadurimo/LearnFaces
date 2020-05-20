sap.ui.define([
	"sap/ui/model/json/JSONModel"
], function (JSONModel) {
	"use strict";

	var shuffleArray = function (array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}

	};
	
	// return 3 random names from the argument names, which are not equal to excludename
	var get3otherNames = function(excludename,names){
		var names = names.filter(word => word != excludename);
		return names.slice(0,3);
		
	};

	var createNewGameFromPersons = function (persons, numberOfQuestions) {
		var personen_array = persons.personen;
		var names = personen_array.map(x => x.name);
		shuffleArray(personen_array);
		var questions = personen_array.slice(0, numberOfQuestions);
		
		for(var i = 0; i<questions.length;i++){
			var question = questions[i];
			question["answers"]=get3otherNames(question.name,names);
			question["correct"] = Math.floor(Math.random() * 4);  
			question.answers.splice(question["correct"], 0, question.name);
			delete question.name;
		}
		
		var current_question = questions[0];
		current_question["answer"] = undefined;
		
		var ret = {
			current_question_index: 0,
			current_question : current_question,
			questions : questions
		}
		
		return ret;
		
	};

	var createNewGame = function () {
		var x = {
			"current_question_index": 0,
			"current_question": {
				"picture": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Marilyn_Monroe%2C_Korea%2C_1954_cropped.jpg",
				"answers": ["Marylin Monroe", "Friedrich Merz"],
				"correct": 0,
				"answer": undefined
			},
			"questions": [{
					"picture": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Marilyn_Monroe%2C_Korea%2C_1954_cropped.jpg",
					"answers": ["Marylin Monroe", "Friedrich Merz"],
					"correct": 0
				}, {
					"picture": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Marie_Curie_%28Nobel-Chem%29.jpg",
					"answers": ["Albert Einstein", "Marie Curie"],
					"correct": 1
				}

			]
		};

		return x;
	};

	return {

		createNewGame: createNewGame,
		
		createNewGameFromPersons : createNewGameFromPersons,

		startNewGame: function () {

			var oGame = createNewGame();
			var oJSONModel = new JSONModel(oGame);
			var view = sap.ui.getCore().byId("container-nav---app--app");

			view.setModel(oJSONModel, "game");
		},

		setAnswer: function (answer) {

			var view = sap.ui.getCore().byId("container-nav---app--app");

			var oModel = view.getModel("game");
			oModel.setProperty("/current_question/answer", answer);

		},

		nextQuestion: function () {
			var view = sap.ui.getCore().byId("container-nav---app--app");
			var oModel = view.getModel("game");

			var current_question_index = oModel.getProperty("/current_question_index");
			var questions = oModel.getProperty("/questions");

			current_question_index = current_question_index + 1;
			var current_question = questions[current_question_index];
			current_question["answer"] = undefined;

			oModel.setProperty("/current_question_index", current_question_index);
			oModel.setProperty("/current_question", current_question);

		},

		hasNextQuestion: function () {

			var view = sap.ui.getCore().byId("container-nav---app--app");
			var oModel = view.getModel("game");
			return oModel.getProperty("/current_question_index") < oModel.getProperty("/questions").length - 1;
		}

	};

});