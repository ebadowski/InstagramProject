# Instagram Hashtag Archiver

This script helps you to download locally the latest pictures related to a specific Instagram hashtag.  
It will fetch them and add them in a daily folder (like `2013-8-16` for the 16th of August 2013).

No resume feature.  
No extra metadata.  
No OAuth pain.

```bash
# Downloading the 200 latest pictures of Hack the Barbican 2013
# > hackthebarbican.org
casperjs statigram-tag.js htb2013 200

# Downloading the 100 latest pictures related to Sud Web
# > http://sudweb.fr
casperjs statigram-tag.js sudweb
```