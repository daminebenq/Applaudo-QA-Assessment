# Cypress Test Automation project

## To install

* Requirements
    * node v14.19.1

To install the testing project, go to the root folder of the project and execute: `npm install`

## How to run the tests?

To execute and run the tests, there are 2 ways to do it:
1. using: `npm run cy:run` for a headless execution.
2. using: `npm run cypress:open` for a headed execution.

## Visual Regression Testing

This project includes visual regression validation, using the famous `cypress-image-snapshot` plugin.
Output folder: `cypress/snapshots`.

## Test reporting using Allure

To generate Allure reports: `npm run allure:generate`.
To open the results: `npm run allure:open`.
