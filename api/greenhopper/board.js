"use strict";

var fs = require('fs');
var path = require('path');
var errorStrings = require('./../../lib/error');

module.exports = BoardClient;

/**
 * Used to access Jira REST endpoints in '/rest/agile/1.0/board'
 * @param {JiraClient} jiraClient
 * @constructor AvatarClient
 */
function BoardClient(jiraClient) {
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
    this.getAllBoard = function (opts, callback) {
        var options = {
            method: 'GET',
            json: true,
            followAllRedirects: true,
            uri: this.jiraClient.buildURL('/board', 'agile/', '1.0'),
            qs: {
                startAt: opts.startAt,
                maxResults: opts.maxResults,
                type: opts.type,
                projectKeyOrId: opts.projectKeyOrId
            }
        };

        this.jiraClient.makeRequest(options, callback);
    };

    this.getAllSprint = function (opts, callback) {
        var qs = {
            startAt: opts.startAt,
            maxResults: opts.maxResults,
            state: opts.state
        };
        var options = this.buildRequestOptions(opts, '/sprint/', 'GET', {}, qs);
        this.jiraClient.makeRequest(options, callback);
    };

    this.buildRequestOptions = function (opts, path, method, body, qs) {
        if (!opts.boardId) {
            throw new Error(errorStrings.NO_BOARD_IDENTIFIER);
        }
        var idOrKey = opts.boardId;
        var basePath = '/board/' + idOrKey;
        if (!qs) qs = {};
        if (!body) body = {};

        return {
            uri: this.jiraClient.buildURL(basePath + path, 'agile/', '1.0'),
            method: method,
            body: body,
            qs: qs,
            followAllRedirects: true,
            json: true
        };
    }

}
