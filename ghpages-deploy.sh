#!/bin/bash
git push origin --delete gh-pages;
git subtree push --prefix dist origin gh-pages;