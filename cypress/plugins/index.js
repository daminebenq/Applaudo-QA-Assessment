/// <reference types="@shelex/cypress-allure-plugin" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');

const fs = require('fs');
const path = require('path');

module.exports = (on, config) => {
    const file = fs.readFileSync(path.resolve('.env'), 'utf-8')
    file.split('\n').map(line => {
        if (line.trim() !== '') {
            const [key, value] = line.split('=')
            config.env[key] = value
        }
    })
    allureWriter(on, config);
    addMatchImageSnapshotPlugin(on, config);
    
    return config;
};
