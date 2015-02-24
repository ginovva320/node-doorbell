(function () {
    var DoorbellClient,
        exports,
        request = require('request'),
        Q = require('q'),
        _ = require('underscore');

    DoorbellClient = (function () {
        DoorbellClient.prototype.host = 'https://doorbell.io/api';

        /**
         * @param {string} applicationId
         * @param {string} apikey
         * @constructor
         */
        function DoorbellClient(applicationId, apikey) {
            this.apikey = apikey;
            this.appId = applicationId;
        }

        /**
         * Request sent when the form is displayed to the user
         * @returns {Promise}
         */
        DoorbellClient.prototype.open = function () {
            return this._sendRequest('open');
        };

        /**
         * Request sent when the form is submitted.
         * @param {string} email
         * @param {string} message
         * @param {string} [name]
         * @param {Object} [properties]
         * @returns {Promise}
         */
        DoorbellClient.prototype.submit = function (email, message, name, properties) {
            var params = {
                email: email,
                message: message
            };

            if (!_.isUndefined(name) && _.isString(name)) {
                params.name = name;
            }

            if (!_.isUndefined(properties) && _.isObject(properties) && !_.isEmpty(properties)) {
                params.properties = JSON.stringify(properties);
            }

            return this._sendRequest('submit', {
                form: params
            });
        };

        DoorbellClient.prototype._getRequestURL = function (action) {
            return this.host + '/applications/' + this.appId + '/' + action + '?key=' + this.apikey
        };

        DoorbellClient.prototype._sendRequest = function (action, options) {
            var deferred = Q.defer();

            if (_.isUndefined(options)) {
                options = {};
            }

            request(_.extend({
                url: this._getRequestURL(action),
                headers: {
                    'User-Agent': 'NodeJS'
                },
                method: 'POST'
            }, options), function (error, response, body) {
                if (!error && response.statusCode == 201) {
                    deferred.resolve();
                } else if (error) {
                    deferred.reject(error);
                } else {
                    deferred.reject(body);
                }
            });

            return deferred.promise;
        };

        return DoorbellClient;

    })();

    exports = module.exports = DoorbellClient;

}).call(this);