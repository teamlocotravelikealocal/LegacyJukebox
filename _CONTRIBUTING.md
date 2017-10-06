# Contributing Workflow

### Fork the repo

Fork the repo on github, then add that repo (NOT the forked repo) as an upstream remote:

```
git remote add upstream https://github.com/reactorcore/<NAME_OF_REPO>.git
```

### Cut a feature branch from master and get on the branch

Cut a branch off of master. Do NOT cut new branches from existing feature branches.

```
git checkout -b `branch-name`
```

### Make commits to your branch

Make changes and commits on your branch, and make sure that you
only make changes that are relevant to this branch. If you find
yourself making unrelated changes, make a new branch for those
changes.

#### Guidelines for commit messages

- Commit messages should be written in the present tense; e.g. "Fix continuous
  integration script".
- The first line of your commit message should be a brief summary of what the
  commit changes. Aim for about 70 characters max. Remember: This is a summary,
  not a detailed description of everything that changed.
- If you want to explain the commit in more depth, following the first line should
  be a blank line and then a more detailed description of the commit. This can be
  as detailed as you want, so dig into details here and keep the first line short.

### Rebase upstream changes into your branch

Rebase changes to the upstream master into your branch by running the following command from your branch:

```
git pull --rebase upstream master
```

If there are no conflicts, this should just roll all of your changes back on top of the changes from upstream, leading to a nice, clean, linear commit history.

If there are conflicting changes, Git will pause rebasing to allow you to sort
out the conflicts. You do this the same way you solve merge conflicts,
by checking all of the files git says have been changed in both histories
and picking the versions you want. Be aware that these changes will show
up in your pull request, so try and incorporate upstream changes as much
as possible.

You pick a file by `git add`ing it - you do not make commits during a rebase.

Once you are done fixing conflicts for a specific commit, continue the rebasing process:

```
git rebase --continue
```

### Make sure all tests pass

Once the rebasing process is complete, you should run the existing tests to make sure you didn’t break anything, then run your new tests (there are new tests, right?) and
make sure they work also.

If rebasing broke anything, fix it, then follow this process again from rebasing onwards, until you get here again and all the tests pass.

### Make a pull request from your branch to upstream master

Make a pull request from your fork and branch to the upstream master, detailing exactly what changes you made and what feature this should add.

At least one other person MUST give your changes a code review, and once
they are satisfied they will merge your changes into upstream.

Alternatively, they may have some requested changes. You should make more commits to your
branch to fix these, then follow this process again from rebasing onwards,
until you get here again and there are no more requested changes.

Thanks for contributing!

<!-- Links -->
[style guide]: https://github.com/reactorcore/style-guide
[n-queens]: https://github.com/reactorcore/n-queens
[Underbar]: https://github.com/reactorcore/underbar
[curriculum workflow diagram]: http://i.imgur.com/p0e4tQK.png
[cons of merge]: https://f.cloud.github.com/assets/1577682/1458274/1391ac28-435e-11e3-88b6-69c85029c978.png
[Bookstrap]: https://github.com/reactorcore/bookstrap
[Taser]: https://github.com/reactorcore/bookstrap
[tools workflow diagram]: http://i.imgur.com/kzlrDj7.png
[Git Flow]: http://nvie.com/posts/a-successful-git-branching-model/
[GitHub Flow]: http://scottchacon.com/2011/08/31/github-flow.html
[Squash]: http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html
