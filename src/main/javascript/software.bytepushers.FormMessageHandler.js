/*global BytePushers*/
(function (BytePushers) {
    'use strict';
    /**
     * Created by tonte on 12/23/15.
     */
    /**
     * Represents the application api.  If the variable is already defined use it,
     * otherwise create an empty object.
     *
     * @type {BytePushers|*|BytePushers|*|{}|{}}
     */
    BytePushers = BytePushers || {};
    /**
     * Represents the application static variable. Use existing static variable, if one already exists,
     * otherwise create a new one.
     *
     * @static
     * @type {*|BytePushers.handlers|*|BytePushers.handlers|Object|*|Object|*}
     */
    BytePushers.handlers = BytePushers.handlers || BytePushers.namespace("software.bytepushers.handlers");
    /**
     * Constructor method for the MessageHandler class.  The properties of this class can be initialized with
     * the jsonFormMessagesArrayObject.
     * @class
     * @classdesc   This class is a handler class; which means it has the behaviour to know how to handle the Form Messages.
     * @constructor
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    BytePushers.handlers.FormMessageHandler = function () { return; };
    /*jslint unparam: true*/
    BytePushers.handlers.FormMessageHandler.prototype.getErrorMessage = function (errorKey, label) {
        if (Object.isString(label)) {
            label.toNormalCase();
        }
    };
    /*jslint unparam: false*/
}(BytePushers));