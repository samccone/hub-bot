## hub-bot

There is this rise in github bots, however they each kinda exist in a void between each other

**ie:**
* https://github.com/facebook/mention-bot
* https://github.com/Bernardstanislas/eslint-bot
* https://github.com/markstory/lint-review
* https://github.com/ampsauce

It would be great to have a "tap" kind of output on ci that you could post to a bot... and the bot would read the "tap" format and take the correct action on a PR / Issue

For instance:

* lints tasks would cause comments inline in the diff
* test failures would post a detailed comment in the PR
* CI could determine who should review the PR and the bot could comment back on the PR

The win here is so long as the tool on CI outputs to a standard format the "bot" can then take these generic actions inside of the PR / Issue, as compared to N number of bots for N number of "lints"
