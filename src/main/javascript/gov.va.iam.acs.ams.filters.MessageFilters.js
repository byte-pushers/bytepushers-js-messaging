/**
 * Created by pouncilt on 9/19/14.
 */

angular.module('gov.va.iam.acs.ams.filters.messages.module', []).filter('uniqueMessage', function () {
    'use strict';
    return function (messages) {
        var filteredArray = [];

        if(Object.isArray(messages) && messages.length > 0){
            filteredArray = messages.filter(function (existingMessage, existingMessageIndex, existingMessages) {
                var foundDuplicateMessage = false, filterResult = false;
                foundDuplicateMessage = existingMessages.some(function (someMessage, someMessageIndex) {
                    if (existingMessageIndex !== someMessageIndex) {
                        if (Object.isDefined(existingMessage) && Object.isDefined(someMessage)) {
                            var existingMessageValue = Object.getProperty(existingMessage, "value");
                            var someMessageValue = Object.getProperty(someMessage, "value");
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
}).filter('errorMessage', function (){
    'use strict';
    return function (messages) {
        var filteredArray = [], filterResult = false;
        if(Object.isArray(messages) && messages.length > 0){
            filteredArray = messages.filter(function(message, messageIndex, messageArray) {
                var messageType = Object.getProperty(message, "type");
                if(messageType.toLowerCase() === VA_AMS.models.Message.ERROR) {
                    var messageValue = Object.getProperty(message, "value");
                    if(!Object.isDefined(messageValue)) {
                        Object.setProperty(message, "value", VA_AMS.models.Message.ERROR_MSG);
                    }
                    filterResult = true;
                } else {
                    filterResult = false;
                }

                return filterResult;
            });
        } else{
            filteredArray = messages;
        }

        return filteredArray
    }
}).filter('successfulMessage', function (){
    'use strict';
    return function (messages) {
        var filteredArray = [], filterResult = false;
        if(Object.isArray(messages)){
            filteredArray = messages.filter(function(message, messageIndex, messageArray) {
                if(message.getType().toLowerCase() === VA_AMS.models.Message.SUCCESSFUL) {
                    if(!Object.isDefined(message.getValue())) {
                        message.setValue("Warning:  Successful action did not produce a message.");
                    }
                    filterResult = true;
                } else {
                    filterResult = false;
                }

                return filterResult;
            });
        }

        return filteredArray
    }
});