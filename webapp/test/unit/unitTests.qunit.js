/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"Quickstart/test/unit/AllTests"
	], function (AllTests) {
		QUnit.start();
	});
});
