Handlebars.registerHelper("escapeName", function () {
    var pre = document.createElement("pre");
    var text = document.createTextNode(this.name);
    pre.appendChild(text);
    return pre.innerHTML;
});
Handlebars.registerHelper("formatDate", function () {
    return new Date(this.latestUpdate).toLocaleTimeString();
});
Handlebars.registerHelper("emergencyIconName", function () {
    return emergencies[this.emergency];
});
Handlebars.registerHelper("statusIconName", function () {
    return statuses[this.status];
});
Handlebars.registerHelper("emergencyName", function () {
    switch (this.emergency) {
        case emergencies.CollapsedBuilding: return "Collapsed Building";
        case emergencies.Fire: return "Fire";
        case emergencies.Flooding: return "Flooding";
        case emergencies.RoadInterruption: return "Road Interruption";
        case emergencies.TrappedPerson: return "Trapped Person";
        case emergencies.InjuriedPerson: return "Injuried Person";
        case emergencies.NonSelfSufficientPerson: return "Non Self-Sufficient Person";
        default: throw "Invalid Signal";
    }
});
Handlebars.registerHelper("statusName", function () {
    switch (this.status) {
        case statuses.Fine: return "I'm Fine";
        case statuses.SlightlyWounded: return "Slightly Wounded";
        case statuses.Injuried: return "Injuried";
        case statuses.Trapped: return "Trapped";
        case statuses.TrappedAndInjuried: return "Trapped And Injuried";
        default: throw "Invalid Signal";
    }
});
Handlebars.registerHelper("deviceStatusName", function () {
    switch (this.deviceStatus) {
        case deviceStatuses.Powered: return "Powered";
        case deviceStatuses.Online: return "Online";
        case deviceStatuses.Offline: return "Offline";
        default: throw "Invalid Status";
    }
});
//# sourceMappingURL=HandlebarsHelpers.js.map