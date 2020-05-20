sap.ui.define([
	"Quickstart/model/Game"
], function (Game) {
	
	"use strict";
	
	QUnit.test("Game", function (assert) {
		var model = Game.createNewGame();
		assert.ok( model.hasOwnProperty("current_question_index"));
		assert.ok( model.current_question_index === 0);
	});

});