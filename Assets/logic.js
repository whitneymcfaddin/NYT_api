$(document).ready(function () {

  var api_key = "60CNCAFaPGmHNesHPgghQV3zmVDBLTWf";
  var search;
  var numRecords;
  var startYr;
  var endYr;

  var title;
  var author;
  var pubDate;
  var section;
  var link;
  var articleDiv;
  // Event listener and NYT api //

  $("#search-button").on("click", function (e) {
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    e.preventDefault();
    search = $("#search").val();
    numRecords = $("#num-records").val();
    startYr = $("#start-year").val();
    endYr = $("#end-year").val();

    url += '?' + $.param({
      'api-key': api_key,
      'q': search
    });

    if (startYr) {
      url += '&' + $.param({
        'begin_date': startYr
      });
    }

    if (endYr) {
      url += '&' + $.param({
        'end_date': endYr
      });
    }


    console.log(url);

    // make AJAX request to queryURL, this will be a 'Get' request
    $.ajax({
      url: url,
      method: "GET"
    }).done(function (response) {
      $("#articles-here").empty();
      for (var i = 0; i < numRecords; i++) {
        console.log(response.response);
        articleDiv = $("<div>");
        articleDiv.addClass("article-div rounded");
        title = $("<h3>");
        title.addClass("article-title");
        title.text(response.response.docs[i].headline.main);
        author = $("<p>");
        author.text(response.response.docs[i].byline.original);
        author.addClass("article-author");
        pubDate = $("<p>");
        pubDate.text("Published on: " + response.response.docs[i].pub_date);
        pubDate.addClass("article-date");
        link = $("<a>");
        link.attr("href", response.response.docs[i].web_url);
        link.text(response.response.docs[i].web_url);
        link.addClass("article-link");
        title.appendTo(articleDiv);
        author.appendTo(articleDiv);
        pubDate.appendTo(articleDiv);
        link.appendTo(articleDiv);
        articleDiv.appendTo($("#articles-here"));
      }
    });

  });//End onclick

  $("#clear-button").on("click", function () {
    $("#articles-here").empty();
  });

});
