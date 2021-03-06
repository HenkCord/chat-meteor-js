import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import './layouts/WidgetSendMessageModalLayout.html';

Template.WidgetSendMessageModalLayout.onCreated(function(){
    import './stylesheet/WidgetSendMessageModal.css';
});

Template.WidgetSendMessageModalFormLayout.helpers({
    users() {
        /*
         Session.get("userForSendMessage") =>
         [{username: "User", userId: "id"}]
         */
        return Session.get("WidgetSendMessageModal");
    }
});

Template.WidgetSendMessageModalFormLayout.events({
    'submit .send-message'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;
        if(text.length === 0){
            throw new Meteor.Error('Введите сообщение');
        }

        const users = Session.get("WidgetSendMessageModal");
        var columns = [];
        var i = 0;
        $.each(users, function (index, value) {
            columns[i] = value.userId;
            i++;
        });
        // Insert a task into the collection
        Meteor.call('Dialogs.insert', text,columns);

        $('#WidgetSendMessageModal').modal('hide');

    },
    /*'click .user-remove'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        const instance = Template.instance();
        const users = instance.getUsers();
        var columns = [];
        var i = 0;
        $.each(users, function (index, value) {
            columns[i] = value.userId;
            i++;
        });
    },*/
});
