/*global BytePushers*/
(function (BytePushers) {
    'use strict';
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
     * @type {*|BytePushers.models|*|BytePushers.models|Object|*|Object|*}
     */
    BytePushers.models = BytePushers.models || BytePushers.namespace("software.byetpushers.models");
    /**
     * Constructor method for the Message class.  The properties of this class can be initialized with
     * the jsonUserObject.
     * @class
     * @classdesc   This class is a domain model message class; which means it has both behavior and state information about the Message.
     * @param {type: String, value: String} jsonMessageObject  Represents the JSON representation of a Message object.
     * @constructor
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    BytePushers.models.Message = function (jsonMessageObject) {
        var type = (Object.isDefined(jsonMessageObject) && Object.isDefined(jsonMessageObject.type)) ? jsonMessageObject.type : null,
            value = (Object.isDefined(jsonMessageObject) && Object.isDefined(jsonMessageObject.value)) ? jsonMessageObject.value : null;

        this.getType = function () {
            return type;
        };

        this.getValue = function () {
            return value;
        };

        this.setValue = function (someValue) {
            value = someValue;
        };
        this.toJSON = function (serializeUIProperties) {
            serializeUIProperties = (Object.isDefined(serializeUIProperties) && Object.isBoolean(serializeUIProperties)) ? serializeUIProperties : false;
            var jsonType = (Object.isString(type)) ? "\"" + type + "\"" : null,
                jsonValue = (Object.isString(value)) ? "\"" + value + "\"" : null,
                json = "{" +
                    "\"type\": " + jsonType + "," +
                    "\"value\": " + jsonValue +
                    "}";

            return json;
        };

        this.toUIObject = function () {
            var UIObject = JSON.parse(this.toJSON(true));

            return UIObject;
        };
    };
    BytePushers.models.Message.SUCCESSFUL = "successful";
    BytePushers.models.Message.ERROR = "error";
    BytePushers.models.Message.ERROR_MSG = "Sorry, we are unable save your data at this time.  Please contact your System Administrator if this continues.";
    BytePushers.models.Message.prototype.toString = function () {
        return "Message  {type: " + this.getType() + ", value: " + this.getValue() + "}";
    };
}(BytePushers));