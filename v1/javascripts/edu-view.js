'use strict';
const $ = require('jquery');
const eduCtrl = require('./edu-control');
const osc = require('../templates/osc.hbs');
const ampEG = require('../templates/amp-eg.hbs');
const cutoffFilter = require('../templates/filter.hbs');
const filterEG = require('../templates/filter-eg.hbs');
const buildComplete = require('../templates/complete.hbs');

module.exports.startBuild = () => {
    $("#eduModal").empty();
    $("#eduModal").append(osc);
    $("#eduModal").show();
};

//if no oscillator selected: flashes screen to user prompt selection
module.exports.oscAlert = () => {
    $("#oscAlert").fadeIn(500);
    setTimeout(() => {
        $("#oscAlert").fadeOut(1000);
    }, 1000);
};

module.exports.printAmpEG = () => {
    $("#eduWrap").empty();
    $("#eduWrap").append(ampEG);
    eduCtrl.ampDraw();
};

module.exports.printFilter = () => {
    $("#eduWrap").empty();
    $("#eduWrap").append(cutoffFilter);
    eduCtrl.cutoffDraw();
};


module.exports.printFilterEG = () => {
    $("#eduWrap").empty();
    $("#eduWrap").append(filterEG);
    eduCtrl.filterDraw();
};

module.exports.leaveBuilder = () => {
    $("#eduModal").empty();
    $("#eduModal").hide();
    $("#completeModal").show();
    $("#completeModal").append(buildComplete);
    setTimeout(() => {
        $("#completeModal").fadeOut(300);
        $("#completeModal").empty();
    }, 1500);
};
