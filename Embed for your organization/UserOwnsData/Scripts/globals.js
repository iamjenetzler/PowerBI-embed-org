// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// ----------------------------------------------------------------------------

// Cache DOM objects
const globals = {
    workspaceSelect: null,
    workspaceSaveSelect: null,
    workspaceDefaultOption: null,
    workspaceSaveDefaultOption: null,
    reportDiv: null,
    dashboardDiv: null,
    tileDiv: null,
    reportSelect: null,
    dashboardSelect: null,
    reportWrapper: null,
    dashboardWrapper: null,
    tileWrapper: null,
    reportDisplayText: null,
    dashboardDisplayText: null,
    tileDisplayText: null,    
    tileSelect: null,
    reportContainer: null,
    dashboardContainer: null,
    tileContainer: null,
    powerBiHostname: null,
    isPreviousReportRDL: null,
    customSaveAsDialog: null,
    dialogButtons: null,
    embedButton: null,
    embedEditButton: null,
    cancelButton: null,
    filterContainer: null,
    regionSelect: null
}

// Cache logged in user's info
const loggedInUser = {
    accessToken: undefined
};

$(function () {
    globals.workspaceSelect = $("#workspace-select");
    globals.workspaceSaveSelect = $("#workspace-save-select");
    globals.workspaceDefaultOption = $("#workspace-default-option").get(0);
    globals.workspaceSaveDefaultOption = $("#workspace-save-default-option").get(0);
    globals.reportDiv = $("#report-div");
    globals.dashboardDiv = $("#dashboard-div");
    globals.tileDiv = $("#tile-div");
    globals.reportSelect = $("#report-select");
    globals.dashboardSelect = $("#dashboard-select");
    globals.reportWrapper = $(".report-wrapper");
    globals.dashboardWrapper = $(".dashboard-wrapper");
    globals.tileWrapper = $(".tile-wrapper");
    globals.reportDisplayText = $(".report-display-text");
    globals.dashboardDisplayText = $(".dashboard-display-text");
    globals.tileDisplayText = $(".tile-display-text");
    globals.tileSelect = $("#tile-select");
    globals.reportContainer = $("#report-container");
    globals.dashboardContainer = $("#dashboard-container");
    globals.tileContainer = $("#tile-container");
    globals.reportSpinner = $("#report-spinner");
    globals.dashboardSpinner = $("#dashboard-spinner");
    globals.tileSpinner = $("#tile-spinner");
    globals.dialogButtons = $(".dialog-buttons")
    globals.customSaveAsDialog = $(".custom-save-as-dialog");
    globals.embedButton = $("#embed");
    globals.embedEditButton = $("#embed-edit");
    globals.saveButton = $("#save-report");
    globals.cancelButton = $("#close-dialog");
    globals.regionSelect = $("#region-select");

    // Set default state of isPreviousReportRDL flag
    globals.isPreviousReportRDL = false;
});