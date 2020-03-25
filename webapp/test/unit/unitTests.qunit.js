/* global QUnit */
// QUnit.config.autostart = false;

QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

/*
sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sap.ui.demo.nav/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
*/