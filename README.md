# TS-Nerdery-Challanges

## Steps

1. Fork this repo to your account
2. Before you start making changes create a new `develop` branch (`git checkout -b develop`)
3. Run `yarn install` in your terminal to install the dependencies


## First Challenge - Temperature Summary

You are given a list of temperatures that ocurred for major US cities over the past week. Temperature readings were taken in inconsistent intervals. Process the temperature readings and create a function that will retun a summary of the temperature data for a given day. The summary should include the following information:

1. First temperature reading for the day
2. Last temperature reading for the day
3. Highest temperature reading for the day
4. Lowest temperature reading for the day
5. Average of temperature readings that day

Description of the two functions are in the file `src/app.ts`

### Function Descriptions

The `processReadings` function will be called once with a list temperature readings and return nothing.

The `getTemperatureSummary` function will be called any number of items with a date and city, and returns the temperature summary for taht day in that city. If there is no temperature data for taht day and city, return null.

When you have finished your challenge, please run the next command `yarn test` to make sure your code works as expected.

Recomendation: for a better performance and clean code please run the command `yarn format` and `yarn lint`


## Second Challenge - Types Challenges

### Description

The `types challenges` consist in 6 exercise that will have you recreating built-ins like `ReadOnly` and `ReturnType` and bulding custom ones like `OmitByType` and `MyAwaited`. You'll learn how to manipulate object properties, work with conditional types, and extract types from wrapped structures like `Promise`

Description of the six exercises are in the file `src/type-exercises.ts`

For each file, we expect you to implement the utility type and include an example showing how to use it. The goal is to create the type as specified and demonstrate its functionality with real-world code examples.