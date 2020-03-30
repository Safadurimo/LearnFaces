/* global QUnit */
// QUnit.config.autostart = false;

/*
QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});
*/
	


sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"Quickstart/test/unit/AllTests"
	], function (AllTests) {
		QUnit.start();
	});
});
