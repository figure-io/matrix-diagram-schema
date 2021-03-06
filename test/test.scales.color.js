/* global describe, it, before, beforeEach, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	validate = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// FIXTURES //

var tmpl = require( './fixtures/template.json' );


// TESTS //

describe( 'color-scale', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a chart configuration with an invalid color-scale field (non-object)', function test() {
		var values = [
			5,
			true,
			null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var scale = template.scales.color;
		for ( var i = 0; i < values.length; i++ ) {
			template.scales.color = scale;
			template.scales.color = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid color-scale type (non-string and not `ordinal`)', function test() {
		var values = [
			'beep',
			3,
			true,
			NaN,
			null,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.scales.color.type = 'ordinal';
			template.scales.color.type = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid color-scale description (non-string)', function test() {
		var values = [
			3,
			true,
			NaN,
			null,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.scales.color.description = '';
			template.scales.color.description = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid color-scale domain (non-array)', function test() {
		var values = [
			3,
			true,
			NaN,
			null,
			function(){},
			'beep',
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.scales.color.domain = [];
			template.scales.color.domain = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid color-scale range (non-array)', function test() {
		var values = [
			3,
			true,
			NaN,
			null,
			function(){},
			'beep',
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.scales.color.range = [];
			template.scales.color.range = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should require `type`, `domain`, and `range` fields', function test() {
		var val;

		template.scales.color.type = undefined;
		assert.notOk( validate( template ) );
		template.scales.color.type = 'ordinal';

		val = template.scales.color.domain;
		template.scales.color.domain = undefined;
		assert.notOk( validate( template ) );
		template.scales.color.domain = val;

		template.scales.color.range = undefined;
		assert.notOk( validate( template ) );
		template.scales.color.range = [];
	});

});
