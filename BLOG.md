# Development Blog

## Saturday, October 2, 2021

- Created a new private repo in GitHub.
- Looked through available bootstrap templates at <https://www.typescriptlang.org/docs/bootstrap>. TSDX seems like a good fit for this project.
- TSDX might have been overkill for this project. It does provide a solid set of defaults though. Nice to have Prettier, ESLint, and Jest setup with one CLI command.
- Added a unit test with the sample input and output. It fails (as expected).
- Setup the Jest extension to automatically run the tests on file change.
- Child process soccer game interrupted the main thread. Suspending.

## Sunday, October 3, 2021

- I get to write code today!
- Able to parse and identify the type of each line in the file. Now I need to aggregate the results. Good time to stretch and make some tea.
- The decision to summarize data up to the sensor level means some inefficiency due to having to loop through the sensors. Changing that decision now would be too time consuming.
- The example test passes! Time to start throwing some more evil data at it.
- Bad data tests are passing. Let's test it with changing reference environments and separate recordings for the same sensor.
