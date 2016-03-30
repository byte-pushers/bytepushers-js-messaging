define(['BytePushers', 'Message'], function(BytePushers){
    describe('Message tests', function() {
        it('should define BytePushers instance', function() {
            expect(BytePushers).toBeDefined();
        });
        it('should define BytePushers.models.Message instance', function() {
            var config = {type: 'boolean', value: true};
            var message = new BytePushers.models.Message(config);
            expect(message).toBeDefined();
            expect(message.getType()).toBe('boolean');
            expect(message.getValue()).toBe(true);
        });
        it('should define BytePushers.models.Message constants', function() {
            expect(BytePushers.models.Message.SUCCESSFUL).toBe('successful');
            expect(BytePushers.models.Message.ERROR).toBe('error');
            expect(BytePushers.models.Message.ERROR_MSG).toBe('Sorry, we are unable save your data at this time.  Please contact your System Administrator if this continues.');
        });
    });
});
