module Foundation.ContactGetter {
    "use strict";
    export var contacts: Contact[];
    export var initialize = () => {
        if (typeof Foundation.ContactGetter.contacts === "undefined") {
            var contactOptions = new ContactFindOptions();
            contactOptions.multiple = true;
            contactOptions.desiredFields = ["displayName", "phoneNumbers", "photos"];
            navigator.contacts.find(["*"], (cont: Contact[]) => {
                ContactGetter.contacts = cont;
                let loaded = document.createEvent("Event");
                loaded.initEvent("contactsLoaded", true, true);
                document.dispatchEvent(loaded);
            }, () => {
                ContactGetter.contacts = [];
                let loaded = document.createEvent("Event");
                loaded.initEvent("contactsLoaded", true, true);
                document.dispatchEvent(loaded);
            }, contactOptions);
        }
    };
}