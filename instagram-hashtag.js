"use strict";

var casper = require('casper').create({
  pageSettings: {
    loadImages:  false,
    loadPlugins: false,
    webSecurityEnabled: false
  },
  viewportSize: {
    height: 1000,
    width: 1024
  }
});
var instagramTag = casper.cli.get(0);
var treshold = casper.cli.get(1) || 100;
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

  console.log("DOWNLAOD TIME!!!");
  var count = 0;

  casper.eachThen(queued, function(response){
    this.thenOpen(response.data, function(response) {
      var modified = new Date(response.headers.get("Last-Modified"));
      var position = queued.indexOf(response.url);

      casper.echo('Download #' + (count++) + ' – '+response.url, 'INFO');
      casper.download(
        response.url,
       [modified.getUTCFullYear(), modified.getUTCMonth()+1, modified.getUTCDate()].join("-") + "/" + response.url.split("/").pop()
      );

      // Stacking in downloaded
      // and removing the url from the queued array
      downloaded.push(response.url);
      queued = queued.slice(0, position).concat(queued.slice(position + 1));
    });
  });
}

function clickAndLoad(){
  casper.click('.more');

  casper.waitWhileVisible('#conteneurLoaderEnCours', function(){});

  casper.then(function(){
    var elements = casper.getElementsAttribute('.photos-wrapper .lienPhotoGrid:only-child img', 'src');

    console.log("Now displaying " + elements.length + " pictures.");

    if (elements.length < treshold){
      casper.waitForSelector(".more", clickAndLoad);
    }
    else{
      elements.map(queue);
      processQueue();
    }
  });
}

casper.start(baseUrl, clickAndLoad);

casper.run();