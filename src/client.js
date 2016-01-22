var request = require( 'superagent' )
var assign = require( 'object-assign' )
var URI = require( 'uri-js' )
var Promise = require( 'bluebird' )
var Subscription = require( 'realizehit-subscription' )

var defaultOptions = {
    uri: undefined
}

function APIClient ( options ) {
    options = this.options = assign( {}, defaultOptions,
        typeof options === 'string' && { uri: options } ||
        typeof options === 'object' && options ||
        {}
    )

    if ( ! options.uri ) {
        throw new Error( "You must define API Server endpoint" )
    }

    this.uri = URI.parse( options.uri )

}

module.exports = APIClient

APIClient.prototype.publish = function APIClient$publish ( pattern, payload, options ) {
    var self = this

    return Promise.try(function () {

        // Required pattern
        if ( typeof pattern === 'undefined' ) {
            throw new Error( "pattern not provided" )
        }

        // Required payload
        if ( typeof payload === 'undefined' ) {
            throw new Error( "payload not provided" )
        }

        // Defaults for options
        options = typeof options === 'object' && options || {}

        // Check pattern content
        try {
            (new Subscription.Pattern( pattern )).stringify()
        } catch ( err ) {
            console.warn( err.message )
            throw new TypeError( "pattern does not seem to be right" )
        }

        // Check payload content
        switch( typeof payload ) {
            case 'object':

                if ( payload === null ) {
                    break
                }

                var proto = Object.getPrototypeOf( payload )

                if ( proto === Array.prototype ) {
                    break
                }

                if ( proto === Object.prototype ) {
                    break
                }

                throw new Error( "We just accept raw Arrays or Objects as payload" )

            case 'function':

                throw new Error( "payload could not be a function" )

        }

    })
    .then(function () {
        return new Promise(function ( fulfill, reject ) {
            var req = request.post( self.options.uri )

            // Attach headers
            if ( typeof options.headers === 'object' ) {
                req.set( options.header )
            }

            // Attach body content
            req.send({
                pattern: pattern,
                payload: payload
            })

            req.end(function ( err, res ) {
                if ( err ) {
                    return reject( err )
                }

                // NOTE:
                // Maybe we should add here some logic to deal with non 2xx errors?

                fulfill( res.body )
            })
        })
    })
}
