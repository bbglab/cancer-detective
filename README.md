
# Readme

## Installation and run

You need Python 3.8+.
It is recommended to use conda but not required.

Install:

```sh
python setup.py develop
```

Running the website is as simple as:

```sh
python web.py
```

Running as cli:
```sh
play -c [lung/skin]
```

or see help:
```sh
play --help
```

The website should be accessible by going in your
browser to localhost:8080

## Configuration

In the `conf` folder you can create a file named
`game.cfg` or you can pass a different location
to the script:

```sh
python web.py /path/to/game.cfg
```

This configuration file can be used to tweak the
server and the application configuration. 
Take a look at the `conf/game.spec.cfg` file
for further details.

## Contributing

Feel free to contribute as much as you want to the code.

Some things to take into account:

- do not edit the `static/css/style.css` file directly
  but instead edit the `style.sass` file and compile it

### Contributor's guide

Please try not to commit directly to the main repo. Use your fork and make pull requests
instead. It's so much cooler, you're gonna love it. How to do it?

1. Fork this repo (There is Fork button somewhere on github)
2. Clone your fork to your local (your computer) (There is clone button somewhere in your fork). If you have the repo already cloned from the main github repo, just add a new remote pointing at your fork, like this: `git remote add fork <cloning address of your fork`. Check if it looks good: `git remote -v`. Note - you can call this remote pointing to your fork as fork or upstream (that is more correct way of calling it)
3. In your local: Create new branch, like this: `git checkout -b my_new_shiny_feature`
4. Hack hack hack
5. Add changes: `git add -p`
6. Commit them: `git commit -m "Add so nice feature!"`
7. Push it to your remote fork: `git push origin my_new_shiny_feature`. If you have remotes pointing to both your fork and main repo, make sure you're sending it to your fork! Probably not `origin` then, but `fork` or however you called it. I personally have the main repo called `upstream` and the fork is `origin`, but some people would not agree and have it called the opposite. Do as it makes sense for you.
8. Go to your fork on github => `branches` and your branch is there! Find the option
"Pull request" which will open a pull request on the main repo!
9. Now there is open pull request on the main repo, everybody can see it, test it, review it,
comment it and also approve it!
10. Approved by somebody? Or you're confident it's fine? Then Merge! "Rebase and merge" Now it 
is part of the code in the main repo!
11. Go to your local cloned directory and fetch. Do this every time to see if there are some new changes.

Note: It's always better if you use `fetch` and no `pull`. Pull does fetch and merge and it is 
not considered very safe.
Do this instead:
1. `git fetch` or you can specifically fetch from main repo `git fetch upstream` (in case you called it upstream ;) )
2. `git log --oneline` or even better `git lg` if I shared with you. You should see your master
branch with commits and other local and remote branches.
3. Is there something new? That means: does origin/master point to different place than master?
4. If yes, `git checkout origin/master` and check differences: `git diff <master commit> <origin/master commit>` You should see only the newly added/removed/changed code.
5. Does it match your expectation? Then make master branch follow origin/master: `git branch -f master origin/master`. Check out with `git lg` that it looks as you want to.
6. Run `git branch`: you see you're in detached head state. Checkout master again: `git checkout master`.
7. TADAA!

Another note: You can add both your fork and main repo to your local git repo as remote.
Check what you have in remote: `git remote -v`. If you cloned from your fork, then it should
point there. You can add the main repo with `git remote add`

[Useful source](https://ohshitgit.com/)

## License

The software is licensed under GNU-GPLv3, and 
the the artworks in the images folder are licensed
under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
