"use strict";

var casper = require('casper').create({
  pageSettings: {
    loadImages:  false,
    loadPlugins: false,
    webSecurityEnabled: false
  }
});
var instagramTag = casper.cli.get(0);
var baseUrl = "http://statigr.am/tag/" + instagramTag + '/';
var downloaded = [];
var queued = [];

if (!instagramTag){
  casper.echo('Requiring at least a valid Instagram hashtag to query.').exit();
}

function requiresDownload(url){
  return ~downloaded.indexOf(url) + ~queued.indexOf(url) === 0;
}

function queue(url){
  if (requiresDownload(url)){
    queued.push(url);
  }
}

function processQueue(){
  if (queued.length === 0){
    return;
  }

  var urls = queued.slice(0, 5);
  queued = queued.slice(5);

  casper.eachThen(urls, function(response){
    this.thenOpen(response.data, function(response) {
      var modified = new Date(response.headers.get("Last-Modified"));

      casper.download(
        response.url,
       [modified.getUTCFullYear(), modified.getUTCMonth()+1, modified.getUTCDate()].join("-") + "/" + response.url.split("/").pop()
      );
    });
  });

  processQueue();
}

casper.start(baseUrl, function(){
  this.getElementsAttribute('.photos-wrapper .lienPhotoGrid:only-child img', 'src').map(queue);

  processQueue();
});

casper.run();