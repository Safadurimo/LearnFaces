sap.ui.define([
	"sap/ui/model/json/JSONModel"
], function (JSONModel) {
	"use strict";
    var getPersons = function(){
	return  {
		"test": "Hallo",
		"personen": [{
			"picture": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Marilyn_Monroe%2C_Korea%2C_1954_cropped.jpg",
			"name": "Marilyn Monroe"
		}, {
			"picture": "https://upload.wikimedia.org/wikipedia/commons/f/f5/Einstein_1921_portrait2.jpg",
			"name": "Albert Einstein"
		}, {
			"picture": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Marie_Curie_%28Nobel-Chem%29.jpg",
			"name": "Marie Curie"
		}, {
			"picture": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Bill_Clinton.jpg",
			"name": "Bill Clinton"
		}, {
			"picture": "https://upload.wikimedia.org/wikipedia/commons/5/53/Donald_Trump_official_portrait_%28cropped%29.jpg",
			"name": "Donald Trump"
		}, {
			"picture": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg",
			"name": "George_Washington"
		}, {
			"picture": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg",
			"name": "Abraham_Lincoln"
		}, {
			"picture": "https://upload.wikimedia.org/wikipedia/commons/b/b8/FDR_in_1933.jpg",
			"name": "Franklin Roosevelt"
		}, {
			"picture": "https://upload.wikimedia.org/wikipedia/commons/8/8d/President_Barack_Obama.jpg",
			"name": "Barack Obama"
		}, {
			"picture": "https://upload.wikimedia.org/wikipedia/commons/5/5a/JimmyCarterPortrait2.jpg",
			"name": "Jimmy Carter"
		}]
	};
	
    };

	var shuffleArray = function (array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}

	};

	// return 3 random names from the argument names, which are not equal to excludename
	var get1otherNames = function (excludename, names) {
		var names = names.filter(word => (word != excludename));
		shuffleArray(names);
		return names[0];

	};

	var createNewGameFromPersons = function (persons, numberOfQuestions) {
		var personen_array = persons.personen.slice();
		var names = personen_array.map(x => x.name);
		shuffleArray(personen_array);
		var questions = personen_array.slice(0, numberOfQuestions);

		for (var i = 0; i < questions.length; i++) {
			var question = questions[i];
			var names = [question.name, get1otherNames(question.name, names)];
			// question["answers"]=get1otherNames(question.name,names);
			var answers = [{
				"answer": names[0]
			}, {
				"answer": names[1]
			}];
			if (Math.floor(Math.random() * 2) === 0) {
				question["correct"] = 0;
				question["answers"] = answers;
			} else {
				question["correct"] = 1;
				question["answers"] = answers.reverse();
			}
			delete question.name;
		}

		var current_question = questions[0];
		current_question["answer"] = undefined;

		var ret = {
			current_question_index: 1,
			current_question: current_question,
			questions: questions,
			score: 0,
			number_of_questions: questions.length

		}

		return ret;

	};

	var createNewGame = function () {
		var x = {
			"current_question_index": 1,
			"current_question": {
				"picture": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Marilyn_Monroe%2C_Korea%2C_1954_cropped.jpg",
				"answers": [{
					"answer": "Marylin Monroe"
				}, {
					"answer": "Friedrich Merz"
				}],
				"correct": 0,
				"answer": undefined
			},
			"number_of_questions": 2,
			"score": 0,
			"questions": [{
					"picture": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Marilyn_Monroe%2C_Korea%2C_1954_cropped.jpg",
					"answers": [{
						"answer": "Marylin Monroe"
					}, {
						"answer": "Friedrich Merz"
					}],
					"correct": 0
				}, {
					"picture": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Marie_Curie_%28Nobel-Chem%29.jpg",
					"answers": [{
						"answer": "Albert Einstein"
					}, {
						"answer": "Marie Curie"
					}],
					"correct": 1
				}

			]
		};

		return x;
	};

	return {

		createNewGame: createNewGame,

		createNewGameFromPersons: createNewGameFromPersons,

		startNewGame: function () {
			/*
			var oGame = createNewGame();
			*/

		
			var oGame = createNewGameFromPersons(getPersons(), 3);

			var oJSONModel = new JSONModel(oGame);
			var view = sap.ui.getCore().byId("container-nav---app--app");

			view.setModel(oJSONModel, "game");
		},

		setAnswer: function (answer) {

			var view = sap.ui.getCore().byId("container-nav---app--app");

			var oModel = view.getModel("game");
			oModel.setProperty("/current_question/answer", answer);
			var current_question = oModel.getProperty("/current_question");

			var score = oModel.getProperty("/score");
			if (current_question.correct === answer) {
				score = score + 1;
			}
			oModel.setProperty("/score", score);
			return current_question.correct === answer;

		},

		nextQuestion: function () {
			var view = sap.ui.getCore().byId("container-nav---app--app");
			var oModel = view.getModel("game");

			var current_question_index = oModel.getProperty("/current_question_index");
			var questions = oModel.getProperty("/questions");

			current_question_index = current_question_index + 1;
			var current_question = questions[current_question_index - 1];
			current_question["answer"] = undefined;

			oModel.setProperty("/current_question_index", current_question_index);
			oModel.setProperty("/current_question", current_question);

		},

		hasNextQuestion: function () {

			var view = sap.ui.getCore().byId("container-nav---app--app");
			var oModel = view.getModel("game");
			return oModel.getProperty("/current_question_index") < oModel.getProperty("/questions").length;
		}

	};

});