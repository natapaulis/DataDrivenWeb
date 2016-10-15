// put your javascript code here

var category_template, animals_template, modal_template;

var current_category = animals_data.category[0];
var current_animal = current_category.animals[0];


function showTemplate(template, data){
	var html = template(data);
	$('#content').html(html);
}

function showModal(template, data){
	var html = template(data);
	$('#modal-container').html(html);
}

function displayModal(event){
	var index = $(this).data("id");
	current_animal = current_category.animals[index];
	showModal(modal_template, current_animal);
	$("#imageModal").modal('show');
}


$(document).ready(function(){

  var source = $("#category-template").html();
  category_template = Handlebars.compile(source);

  source = $("#animals-template").html();
  animals_template = Handlebars.compile(source);

  source = $("#modal-template").html();
  modal_template = Handlebars.compile(source);


  $("#category-tab").click(function(){
    showTemplate(category_template, animals_data);

    $(".nav .active").removeClass("active");
		$("#albums-tab").addClass("active");

    $(".category-thumbnail").click(function (){
      $(".nav .active").removeClass("active");
  		$("#animals-tab").addClass("active");

      var index = $(this).data("id");
      current_category = animals_data.category[index];
      showTemplate(animals_template, current_category);

      $(".animals-thumbnail").click(displayModal);
		});
	});

  $("#animals-tab").click(function(){
    $(".nav .active").removeClass("active");
		$("#animals-tab").addClass("active");
    showTemplate(animals_template, current_category);

    $(".animals-thumbnail").click(displayModal);

  });

  $("#category-tab").click();


	$('#searchbox').keypress(function(e){
		if (e.which == 13) {
			$(".nav .active").removeClass("active");
			$("#category-tab").addClass("active");
			var search_text = $('#searchbox').val().toUpperCase();
			var filteredData = {
				category: animals_data.category.filter(function(d){
					if (d.name.toUpperCase().search(search_text) > -1){
						return true;
					}
					return false;
				})
		  };
		  showTemplate(category_template, filteredData);

		  $(".category-thumbnail").click(function (){
        $(".nav .active").removeClass("active");
  		  $("#animals-tab").addClass("active");

        var index = $(this).data("id");
        current_category = filteredData.category[index];
        showTemplate(animals_template, current_category);

        $(".animals-thumbnail").click(displayModal);
		  });
    }

	});

});
