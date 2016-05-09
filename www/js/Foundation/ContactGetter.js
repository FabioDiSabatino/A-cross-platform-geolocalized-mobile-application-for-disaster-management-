var Foundation;
(function (Foundation) {
    var ContactGetter;
    (function (ContactGetter) {
        "use strict";
        ContactGetter.initialize = function () {
            if (typeof Foundation.ContactGetter.contacts === "undefined") {
                var contactOptions = new ContactFindOptions();
                contactOptions.multiple = true;
                contactOptions.desiredFields = ["displayName", "phoneNumbers", "photos"];
                navigator.contacts.find(["*"], function (cont) {
                    ContactGetter.contacts = cont;
                    var loaded = document.createEvent("Event");
                    loaded.initEvent("contactsLoaded", true, true);
                    document.dispatchEvent(loaded);
                }, function () {
                    ContactGetter.contacts = [];
                    var loaded = document.createEvent("Event");
                    loaded.initEvent("contactsLoaded", true, true);
                    document.dispatchEvent(loaded);
                }, contactOptions);
            }
        };
    })(ContactGetter = Foundation.ContactGetter || (Foundation.ContactGetter = {}));
})(Foundation || (Foundation = {}));
//# sourceMappingURL=ContactGetter.js.map