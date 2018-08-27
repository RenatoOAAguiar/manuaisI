const URL = "http://200.205.110.233:4501/manuais/"
var form = '';


function find(question) {
    var data = {"question" : question};

    $.ajax({
        type: "GET",
        url: URL + "/manual?question=" + question,
        //data: data,
        success: success,
        error: error,
        dataType: "json"
    });
}

$("#inputFile").change(function (){
    var fileName = $(this).val();
    if(fileName != null){
        $('#btnUpload').prop("disabled", false);
        form = new FormData();
        form.append('fileUpload', event.target.files[0]);
    } else {
        $('#btnUpload').attr("disabled", "disabled");
    }
});

$(document).ready(function() {
	$('#txtPergunta').focus();
});

$(document).keypress(function(e) {
    if(e.which == 13) {
        send();
    }
});

function error(jqXHR, exception){
    console.log("Status: " + jqXHR.status);
    console.log("Message: " + jqXHR.responseText);
    if(jqXHR.responseText != undefined){
        $("#txtResposta").text(jqXHR.responseText)
        $('#divResposta').removeClass("d-none");
    }
}

function success(data) {
    console.log(data);
    $("#txtResposta").text(data.response)
    $('#divResposta').removeClass("d-none");
}

$('#btnEnviar').on('click', function(){
    send();
});

$('#btnBackUpload').on('click', function(){
    location.reload();
});

$('#btnUpload').on('click', function(){
    var $this = $(this);
    $('#btnUpload').attr("disabled", "disabled");
    var loadingText = '<i class="fa fa-circle-o-notch fa-spin"></i> Upload...';
    if ($(this).html() !== loadingText) {
      $this.data('original-text', $(this).html());
      $this.html(loadingText);
    }

    $.ajax({
        url: URL + "/upload", // Url do lado server que vai receber o arquivo
        data: form,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            // utilizar o retorno
            $this.html($this.data('original-text'));
            $('#btnUpload').attr("disabled", "disabled");
            habilitarCampos();
        }
    });

});

function send(){
    var question = $('#txtPergunta').val();
    if(question != '' && question != undefined){
        find(question);
    }
}

$('#btnLimpar').on('click', function(){	
    $('#txtResposta' ).empty();
    $('#divResposta').addClass("d-none");
    $('#txtPergunta').val('');
});

function habilitarCampos() {
    $('#upload').addClass("d-none");
    $('#conteudo').removeClass("d-none");
}