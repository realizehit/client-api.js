var APIClient = require( '../src/client' )
var APIServer = require( 'realizehit-server-api' )

// Choose an ephemeral port
var HTTP_PORT = Math.floor( Math.random() * 10000 ) + 30000

describe( 'APIClient', function () {

    before(function () {
        this.server = new APIServer({
            httpPort: HTTP_PORT
        })
    })

    after(function () {
        this.server.destroy()
    })

    beforeEach(function () {
        this.client = new APIClient( 'http://127.0.0.1:' + HTTP_PORT )
    })

    describe( 'payload tests', function () {

        function testPayload ( payload ) {
            return this.client.publish({ foo: 'bar' }, payload )
        }

        function testErrPayload ( payload ) {
            return testPayload.call( this, payload )
            .then(
                function ( value ) {
                    throw new Error( "It should gave an error" )
                },
                function ( err ) {
                    if ( ! err ) {
                        throw new Error( "It should gave an error" )
                    }

                    // Uncomment if you need to debug :)
                    // console.warn( err.message )
                }
            )
        }

        it( "should publish a null payload", function () {
            return testPayload.call( this, null )
        })

        it( "should publish a false payload", function () {
            return testPayload.call( this, false )
        })

        it( "should publish a true payload", function () {
            return testPayload.call( this, true )
        })

        it( "should publish a positive numeric payload", function () {
            return testPayload.call( this, 1 )
        })

        it( "should publish a negative numeric payload", function () {
            return testPayload.call( this, -1 )
        })

        it( "should publish a zero numeric payload", function () {
            return testPayload.call( this, 0 )
        })

        it( "should publish a float numeric payload", function () {
            return testPayload.call( this, 0.423 )
        })

        it( "should publish an empty string payload", function () {
            return testPayload.call( this, '' )
        })

        it( "should publish a string payload", function () {
            return testPayload.call( this, 'foobar' )
        })

        it( "should publish an object from Array as payload", function () {
            return testPayload.call( this, [] )
        })

        it( "should publish an object from Object as payload", function () {
            return testPayload.call( this, {} )
        })

        it( "should NOT publish an undefined payload", function () {
            return testErrPayload.call( this, undefined )
        })

        it( "should NOT publish a function payload", function () {
            return testErrPayload.call( this, function () {} )
        })

        it( "should NOT publish an object that hasn't Object proto directly payload", function () {
            function Class () {}
            Class.prototype = Object.create( Object.prototype )
            return testErrPayload.call( this, new Class() )
        })

        it( "should NOT publish an object that hasn't Array proto directly payload", function () {
            function Class () {}
            Class.prototype = Object.create( Array.prototype )
            return testErrPayload.call( this, new Class() )
        })

    })

})
