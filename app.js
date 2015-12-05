var urlStart = "https://en.wikipedia.org/w/api.php?action=opensearch&limit=max&search=";

function searchWiki(str) {

  var json = $.ajax({
    type: "GET",
    dataType: 'jsonp',
    url: urlStart + str,
    crossDomain: true
    }).done(function( data ) {

      console.log(data);
      data[1].forEach(function(title, index) {
        var htmlString = '<div class="article animated fadeInUp"';
        htmlString += data[3][index] + '">';
        htmlString += '<a href="' + data[3][index] + '">' + title + '</a>';
        htmlString += '<p>' + data[2][index] + '</p>';
        htmlString += '</div>';
        $("section").append(htmlString);
      });

    })
    .fail( function(xhr, textStatus, errorThrown) {
        alert(xhr.responseText);
        alert(textStatus);
  });

}

$(document).ready(function() {

  var search = $("#search"),
      wiki = $("#wiki"),
      input = $("input"),
      main = $("main"),
      top = false;

  search.focus(function() {
    search.val("");
    if (!top) {
      input.css("width", "70vw");
      wiki.addClass("filtered");
    } else {
      main.removeClass("align-top");
      input.removeClass("aligned");
      $("img").removeClass("filtered");
      input.css("width", "76px");
      $("body").css("height", "100vh");
      $(".article").remove();
    }
  });

  search.focusout(function() {
    if (!top) {
      search.val("");
      wiki.removeClass("filtered");
      input.css("width", "76px");
    }
  });

  $(document).keypress(function(e) {

    if(e.which == 13 && search.val().length > 0 && input.is(":focus")) {

      main.addClass("align-top");
      top = true;
      input.addClass("aligned");
      $("body").css("height", "auto");
      searchWiki(input.val());

    }

  });

});
