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
     * @type {*|BytePushers.handlers|*|BytePushers.handlers|Object|*|Object|*}
     */
    BytePushers.handlers = BytePushers.handlers || BytePushers.namespace("software.bytepushers.handlers");
    /**
     * Constructor method for the MessageHandler class.  The properties of this class can be initialized with
     * the jsonUserObject.
     * @class
     * @classdesc   This class is a handler class; which means it has the behaviour to know how to handle the Message.
     * @param {String}  jsonMessagesArrayObject  Represents the JSON representation of a Answer object.
     * @constructor
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    BytePushers.handlers.MessageHandler = function (jsonMessagesArrayObject) {
        var messages = (Object.isArray(jsonMessagesArrayObject) && jsonMessagesArrayObject.length > 0) ? jsonMessagesArrayObject : [];
        this.removeMessage = function (index) {
            if ((!Object.isDefined(messages[index].numLives) || messages[index].numLives) === 0) {
                messages.splice(index, 1);
            } else {
                messages[index].numLives -= 1;
            }
        };

        this.hasMessages = function () {
            return (messages.length > 0) ? true : false;
        };

        /*jslint unparam: true*/
        this.hasErrorMessages = function () {
            return messages.some(function (message, index) {
                if (Object.isDefined(message)) {
                    var messageType = Object.getProperty(message, "type");
                    if (messageType.toLowerCase() === "error") {
                        return true;
                    }
                }

                return false;
            });
        };
        this.hasSuccessfulMessages = function () {
            return messages.some(function (message, index) {
                if (Object.isDefined(message)) {
                    var messageType = Object.getProperty(message, "type");
                    if (messageType.toLowerCase().includes(BytePushers.models.Message.SUCCESSFUL)) {
                        return true;
                    }
                }
            });
        };
        /*jslint unparam: false*/

        this.clearMessages = function (type) {
            var filteredArray = [], filterResult = false;
            type = (Object.isDefined(type)) ? type : "all";

            filteredArray = messages.filter(function (message) {
                if (Object.isDefined(message)) {
                    var messageType = Object.getProperty(message, "type");
                    if (type === "all" || messageType.toLowerCase() === type) {
                        filterResult = false;
                    } else {
                        filterResult = true;
                    }
                }

                return filterResult;
            });

            messages = filteredArray;
        };

        /**
         * @param {BytePushers.models.Message} someMessage is the message object we are adding
         * @param addDuplicateMessages flag to allow duplicates, defaults to false
         * @param lives is an integer indicating how many times clearMessages() can be called
         * on the message without it being removed.  This is used for times when state transitions
         * happen and you want the message to stay around for the next state.
         */
        this.addMessage = function (someMessage, addDuplicateMessages, lives) {
            var messageValue, messageType, someMessageValue, foundDuplicatedMessage;

            addDuplicateMessages = Boolean(addDuplicateMessages);
            someMessage.numLives = (Object.isDefined(lives) && parseInt(lives, 10) === lives) ? lives : 0;

            if (addDuplicateMessages) {//we don't care if there are dups
                messages.push(someMessage);
            } else {
                foundDuplicatedMessage = messages.some(function (message) {
                    if (Object.isDefined(message) && Object.isDefined(someMessage)) {
                        messageValue = Object.getProperty(message, "value");
                        someMessageValue = Object.getProperty(someMessage, "value");
                        if (messageValue === someMessageValue) {
                            return true;
                        }
                    }
                });

                if (!foundDuplicatedMessage) {
                    /* jslint vars: false */
                    messageValue = Object.getProperty(someMessage, "value");
                    messageType = Object.getProperty(someMessage, "type");
                    /* jslint vars: true */
                    messages.push({type: messageType, value: messageValue});
                }
            }
        };

        this.addMessages = function (someMessages, addDuplicateMessages, lives) {
            if (Object.isArray(someMessages)) {
                /*jslint unparam: true*/
                someMessages.forEach(function (message, index, array) {
                    this.addMessage(message, addDuplicateMessages, lives);
                }, this);
                /*jslint unparam: false*/
            }
        };

        this.addSuccessfulMessage = function (msgValue) {
            if (Object.isString(msgValue)) {
                var msg = new BytePushers.models.Message({
                    type: BytePushers.models.Message.SUCCESSFUL,
                    value: msgValue
                }).toUIObject();
                this.addMessage(msg);
            }
        };

        this.addErrorMessage = function (msgValue) {
            if (Object.isString(msgValue)) {
                var msg = new BytePushers.models.Message({
                    type: BytePushers.models.Message.ERROR,
                    value: msgValue
                }).toUIObject();
                this.addMessage(msg);
            }
        };
        this.addErrorMessages = function (someMessages) {
            if (Object.isArray(someMessages)) {
                someMessages.forEach(function (aMessage) {
                    this.addErrorMessage(aMessage);
                }, this);
            }
        };

        this.getMessages = function () {
            return messages;
        };
    };
}(BytePushers));