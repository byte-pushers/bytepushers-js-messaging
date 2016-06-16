/*global BytePushers, angular*/
(function (BytePushers) {
    'use strict';

    angular.module('software.bytepushers.filters.messages.module', []).filter('uniqueMessage', function () {
        return function (messages) {
            var filteredArray = [], foundDuplicateMessage, filterResult, existingMessageValue, someMessageValue;

            if (Object.isArray(messages) && messages.length > 0) {
                filteredArray = messages.filter(function (existingMessage, existingMessageIndex, existingMessages) {
                    foundDuplicateMessage = false;
                    filterResult = false;
                    foundDuplicateMessage = existingMessages.some(function (someMessage, someMessageIndex) {
                        if (existingMessageIndex !== someMessageIndex) {
                            if (Object.isDefined(existingMessage) && Object.isDefined(someMessage)) {
                                existingMessageValue = Object.getProperty(existingMessage, "value");
                                someMessageValue = Object.getProperty(someMessage, "value");
                                if (existingMessageValue === someMessageValue) {
                                    return true;
                                }
                            }
                        }

                        return false;
                    });

                    if (!foundDuplicateMessage) {
                        filterResult = true;
                    }

                    return filterResult;
                });
            } else {
                filteredArray = messages;
            }

            return filteredArray;

        };
    }).filter('errorMessage', function () {
        return function (messages) {
            var filteredArray = [], filterResult = false, messageType, messageValue;
            if (Object.isArray(messages) && messages.length > 0) {
                /*jslint unparam:true*/
                filteredArray = messages.filter(function (message, messageIndex, messageArray) {
                    messageType = Object.getProperty(message, "type");
                    if (messageType.toLowerCase() === BytePushers.models.Message.ERROR) {
                        messageValue = Object.getProperty(message, "value");
                        if (!Object.isDefined(messageValue)) {
                            Object.setProperty(message, "value", BytePushers.models.Message.ERROR_MSG);
                        }
                        filterResult = true;
                    } else {
                        filterResult = false;
                    }

                    return filterResult;
                });
                /*jslint unparam:false*/
            } else {
                filteredArray = messages;
            }

            return filteredArray;
        };
    }).filter('successfulMessage', function () {
        return function (messages) {
            var filteredArray = [], filterResult = false;
            if (Object.isArray(messages)) {
                /*jslint unparam:true*/
                filteredArray = messages.filter(function (message, messageIndex, messageArray) {
                    if (message.getType().toLowerCase() === BytePushers.models.Message.SUCCESSFUL) {
                        if (!Object.isDefined(message.getValue())) {
                            message.setValue("Warning:  Successful action did not produce a message.");
                        }
                        filterResult = true;
                    } else {
                        filterResult = false;
                    }

                    return filterResult;
                });
                /*jslint unparam:false*/
            }

            return filteredArray;
        };
    });
}(BytePushers));