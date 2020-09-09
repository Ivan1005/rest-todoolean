$(document).ready(function() {
  getData();
  $(document).on('click', '.delete', function(){
    var elemento= $(this).parent().attr("data-id");
    elimina(elemento);
  });

  $(".but").click(function(){
    var newElement=$("#nuova-voce").val();
    createElement( newElement);
  });
  $(document).on('change', '.hide',function(event){
        var change=$(this).val();
        var id= $(this).parent().attr("data-id");
        changeElement(change,id);
   })
   $(document).on('click', '.fra', function(){
     $(this).children().show();
     $(this).mouseleave(function(){
       $(this).children().hide();
     });
   });
});


function changeElement (risposta,id){
  $.ajax(
    {
      url: 'http://157.230.17.132:3019/todos/'+id,
      method : 'PUT',
      data: {
        text : risposta
      },
      success : function(){
        $(".todos").empty();
        getData();
      },
      error: function(){
        alert("errore");
      }
    }
  );
}



function createElement (risposta) {
  $.ajax(
    {
      url: 'http://157.230.17.132:3019/todos/',
      method : 'POST',
      data: {
        text : risposta
      },
      success : function(){
        $(".todos").empty();
        getData();
      },
      error: function(){
        alert("errore");
      }
    }
  );
}


function elimina(risposta){
  $.ajax(
    {
      url:'http://157.230.17.132:3019/todos/'+risposta,
      method: 'DELETE',
      success: function(risposta){
        $(".todos").empty();
        getData();
      },
      error: function (){
        alert("ERRORE");
      }
    }
  );
}


function getData (){
  $.ajax(
    {
      url: 'http://157.230.17.132:3019/todos',
      success: function(risposta){
        getElement(risposta);
      },
      error : function(){
        alert("errore");
      }
    }
  );
}

function getElement (risposta) {
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);
  for ( var i = 0; i < risposta.length ; i++){
    var dati ={
      "text": risposta[i].text,
      "id" : risposta[i].id,
    }
    var html = template(dati);
    $(".todos").append(html);
  }
}
