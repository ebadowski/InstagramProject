# Instagram Hashtag Archiver

This script helps you to download locally the latest pictures related to a specific Instagram hashtag.  
It will fetch them and add them in a daily folder (like `2013-8-16` for the 16th of August 2013).

No resume feature.  
No extra metadata.  
No OAuth pain.

## Install

You need to clone this Gist and install at least **CasperJS 1.1**.

```bash
brew update
brew install phantomjs
brew install casperjs --devel

git clone https://gist.github.com/6245811.git instagram-hashtag-gist
```

## Usage

```bash
cd instagram-hashtag-gist

# Downloading the 200 latest pictures of Hack the Barbican 2013
# > hackthebarbican.org
casperjs instagram-hashtag.js htb2013 200

# Downloading the 100 latest pictures related to Sud Web
# > http://sudweb.fr
casperjs instagram-hashtag.js sudweb
```