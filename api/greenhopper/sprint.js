"use strict";

var fs = require('fs');
var path = require('path');
var errorStrings = require('./../../lib/error');

module.exports = SprintClient;

/**
 * Used to access Jira REST endpoints in '/rest/agile/1.0/sprint'
 * @param {JiraClient} jiraClient
 * @constructor AvatarClient
 */
function SprintClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns all system avatars of the given type.
     *
     * @method getSprint
     * @memberOf SprintClient#
     * @param opts The options to be used in the API request.
     * @param opts.sprintId Id to sprint.
     * @param callback Called when the sprint are retrieved.
     */
    this.getSprint = function (opts, callback) {
        if (!opts.sprintId) {
            throw new Error(errorStrings.NO_SPRINT_OPTION_ID_ERROR);
        }
        var options = {
            method: 'GET',
            json: true,
            followAllRedirects: true,
            uri: this.jiraClient.buildURL('/sprint/' + opts.sprintId,'agile/','1.0')
        };

        this.jiraClient.makeRequest(options, callback);
    };

}
