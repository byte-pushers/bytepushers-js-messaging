/**
 * Created by tonte on 12/23/15.
 */
/**
 * Represents the application api.  If the variable is already defined use it,
 * otherwise create an empty object.
 *
 * @type {VA_AMS|*|VA_AMS|*|{}|{}}
 */
var VA_AMS = VA_AMS || {};
/**
 * Represents the application static variable. Use existing static variable, if one already exists,
 * otherwise create a new one.
 *
 * @static
 * @type {*|VA_AMS.handlers|*|VA_AMS.handlers|Object|*|Object|*}
 */
VA_AMS.handlers = VA_AMS.handlers || VA_AMS.namespace("gov.va.iam.acs.ams.handlers");
/**
 * Constructor method for the MessageHandler class.  The properties of this class can be initialized with
 * the jsonFormMessagesArrayObject.
 * @class
 * @classdesc   This class is a handler class; which means it has the behaviour to know how to handle the Form Messages.
 * @constructor
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
VA_AMS.handlers.FormMessageHandler = function () {

};
VA_AMS.handlers.FormMessageHandler.prototype.getErrorMessage = function (errorKey, label){
    if(Object.isString(label)){
        label.toNormalCase();
    }
};
