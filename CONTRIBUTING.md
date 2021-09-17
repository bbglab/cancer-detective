# Contributing to Cancer Detective

Hello! Thanks for your interest. In this document you'll see a brief guidelines that you need to know in order to make
a nice contribution to the project. 

1. Fork [the repo](https://github.com/bbglab/cancer-detective) to your account. Please try not to commit directly to the main repo. Use your fork and make pull requests
instead. It's so much cooler, you're gonna love it.
2. Clone your fork to your local (your computer). If you have the repo already cloned from the main github repo, just add a new remote pointing at your fork, like this: `git remote add fork <cloning address of your fork`. Check if it looks good: `git remote -v`. Note - you can call this remote pointing to your fork as fork or upstream (that is more correct way of calling it)
3. In your local: Create new branch, like this: `git checkout -b my_new_shiny_feature`
4. Code and make your awesome contribution. Hack, hack, hack...
5. Add changes: `git add -p`
6. Commit them: `git commit -m "feat: added a nice feature!"`
7. Push it to your remote fork: `git push origin my_new_shiny_feature`. 
8. Go to your fork on GitHub in `branches` where your branch is there! Find the option
   "_Pull request_" which will open a pull request on the main repo!

Note: You can add both your fork and main repo to your local git repo as remote.
Check what you have in remote: `git remote -v`. If you cloned from your fork, then it should
point there. You can add the main repo with `git remote add`

## Commit messages

For a good practise is recommended to follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) guidance
with short and self-explanatory commits.

Also, check: [useful source](https://ohshitgit.com/)
