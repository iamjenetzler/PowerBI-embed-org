// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// ----------------------------------------------------------------------------

// Embed Power BI report
async function embedEditReport(embedParam) {
    // For setting type of token in embed config
    let models = window["powerbi-client"].models;
    let embedType = "report";

    let embedUrl;

    try {
        // Retrieves embed url for Power BI report
        embedUrl = await globals.getEmbedUrl(embedParam, embedType);
    } catch (error) {
        showError(error);
    }

    // Config to embed report in WRITE MODE
    let editReportConfig = {
        type: embedType,
        tokenType: models.TokenType.Aad,
        accessToken: loggedInUser.accessToken,
        embedUrl: embedUrl,
        permissions: models.Permissions.All,
        viewMode: models.ViewMode.Edit,
        allowEdit: true,        
        settings: {
            useCustomSaveAsDialog: true, // Enable custom Save As dialog
            background: models.BackgroundType.Transparent
        }
    };

    // Check if the embed url is for RDL report
    let isRDLReport = embedUrl.toLowerCase().indexOf("/rdlembed?") >= 0;

    // Check if reset is required
    let resetRequired = globals.isPreviousReportRDL || isRDLReport;

    globals.isPreviousReportRDL = isRDLReport;

    // Reset report container in case the current report or perviously embedded report is a RDL Report
    if (resetRequired) {
        powerbi.reset(globals.reportContainer.get(0));
    }

    // Show report container as there is no loaded event for RDL reports
    if (isRDLReport) {
        $(".report-wrapper").addClass("transparent-bg");
        showEmbedContainer(globals.reportSpinner, globals.reportContainer);
    }

    // Embed Power BI report in Edit mode
    let editReport = powerbi.embed(globals.reportContainer.get(0), editReportConfig);

    // Clear any other loaded handler events
    editReport.off("loaded");

    // Triggers when a report schema is successfully loaded
    editReport.on("loaded", function () {
        console.log("Report loaded");
        $(".report-wrapper").addClass("transparent-bg");
        showEmbedContainer(globals.reportSpinner, globals.reportContainer);
    });

    // Clear any other rendered handler events
    editReport.off("rendered");

    // Triggers when a report is successfully embedded in UI
    editReport.on("rendered", function () {
        console.log("Report render successful");
    });

    editReport.off("saveAsTriggered");
    editReport.on("saveAsTriggered", function () {
        console.log("Save As Triggered");

        // Show the custom save as dialog
        globals.customSaveAsDialog.css('display', 'block');

        // Ensure event handlers are only attached once
        $("#save-report").off("click").on("click", function () {
            let reportName = $("#report-name").val();
            let targetWorkspaceId = $("#workspace-save-select").val();
            let saveAsParameters = {
                name: reportName,
                targetWorkspaceId: targetWorkspaceId
            };

            editReport.saveAs(saveAsParameters).catch(function (error) {
                console.error("Save As error:", error);
            });

            // Hide custom Save As dialog
            globals.customSaveAsDialog.css('display', 'none');
        });

        $("#close-dialog").off("click").on("click", function () {
            // Hide custom Save As dialog
            globals.customSaveAsDialog.css('display', 'none');
        });
    });
}

// Embed Power BI dashboard
async function embedEditDashboard(embedParam) {

    // For setting type of token in embed config
    let models = window["powerbi-client"].models;
    let embedType = "dashboard";

    let embedUrl;

    try {
        // Retrieves embed url for Power BI dashboard
        embedUrl = await globals.getEmbedUrl(embedParam, embedType);
    } catch (error) {
        showError(error);
    }

    let editDashboardConfig = {
        type: embedType,
        tokenType: models.TokenType.Aad,
        accessToken: loggedInUser.accessToken,
        embedUrl: embedUrl,

        // Code to embed report in Edit mode
        permissions: models.Permissions.All,
        viewMode: models.ViewMode.Edit,
    };

    // Embed Power BI dashboard
    let editDashboard = powerbi.embed(globals.dashboardContainer.get(0), editDashboardConfig);

    // Clear any other loaded handler events
    editDashboard.off("loaded");

    // Triggers when a dashboard schema is successfully loaded
    editDashboard.on("loaded", function() {
        console.log("Dashboard loaded");
        showEmbedContainer(globals.dashboardSpinner, globals.dashboardContainer);
    });

    // Clear any other tileClicked handler events
    editDashboard.off("tileClicked");

    // Handle tileClicked event
    editDashboard.on("tileClicked", function(event) {
        console.log("Tile clicked");
    });

    // Clear any other error handler event
    editDashboard.off("error");

    // Below patch of code is for handling errors that occur during embedding
    editDashboard.on("error", function(event) {
        let errorMsg = event.detail;

        // Use errorMsg variable to log error in any destination of choice
        console.error(errorMsg);
        return;
    });
}

// Embed Power BI tilef
async function embedEditTile(embedParam) {

    // For setting type of token in embed config
    let models = window["powerbi-client"].models;
    let embedType = "tile";

    let embedUrl;

    try {
        // Retrieves embed url for Power BI tile
        embedUrl = await globals.getEmbedUrl(embedParam, embedType);
    } catch (error) {
        showError(error);
    }

    let editTileConfig = {
        type: embedType,
        tokenType: models.TokenType.Aad,
        accessToken: loggedInUser.accessToken,
        embedUrl: embedUrl,
        dashboardId: embedParam.dashboardId,

        // Code to embed report in Edit mode
        permissions: models.Permissions.All,
        viewMode: models.ViewMode.Edit,
    };

    // Embed Power BI tile
    let editTile = powerbi.embed(globals.tileContainer.get(0), editTileConfig);

    // Clear any other tileLoaded handler events
    editTile.off("tileLoaded");

    // Handle tileLoad event
    editTile.on("tileLoaded", function(event) {
        console.log("Tile loaded");
        showEmbedContainer(globals.tileSpinner, globals.tileContainer);
    });

    // Clear any other tileClicked handler events
    editTile.off("tileClicked");

    // Handle tileClicked event
    editTile.on("tileClicked", function(event) {
        console.log("Tile clicked");
    });
}

// Show report, dashboard and tile container once it is loaded
function showEmbedContainer(componentSpinner, componentContainer) {
    componentSpinner.hide();

    // Show embed container
    componentContainer.css({ visibility: "visible" });

    // Remove height and width property from embed container
    componentContainer.css({ "height": "", "width": "" });
}

 