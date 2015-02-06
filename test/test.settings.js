/* global describe, it, before, beforeEach, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	spec = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// FIXTURES //

var tmpl = require( './fixtures/template.json' );


// TESTS //

describe( 'settings', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a chart configuration without a settings field', function test() {
		template.settings = undefined;
		assert.notOk( spec.validate( template ) );
		assert.strictEqual( spec.errors().length, 1 );
	});

	it( 'should invalidate a chart configuration with an invalid settings field (non-object)', function test() {
		var values = [
			5,
			true,
			null,
			NaN,
			function(){},
			[],
			'beep'
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.settings = {};
			template.settings = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid autoResize setting (non-boolean)', function test() {
		var values = [
			5,
			'true',
			null,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.settings.autoResize = '';
			template.settings.autoResize = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid autoUpdate setting (non-boolean)', function test() {
		var values = [
			5,
			'true',
			null,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.settings.autoUpdate = '';
			template.settings.autoUpdate = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should not require any particular settings', function test() {
		template.settings = {};
		assert.ok( spec.validate( template ) );
	});

});
