const URL = "http://200.205.110.233/manualquestion"
const URL_UPLOAD = "http://200.205.110.233/manualupload" 
var form = '';


function find(question) {
    var data = {"question" : question};

    $.ajax({
        type: "GET",
        url: URL + "?question=" + question,
        //data: data,
        success: success,
        error: error,
        dataType: "json"
    });
}

$("#inputFile").change(function (){
    var fileName = $(this).val();
    console.log("conteudo" + fileName);
    if(fileName != null){
        $('#btnUpload').prop("disabled", false);
    } else {
        $('#btnUpload').attr("disabled", "disabled");
    }
    form = new FormData();
    form.append('file', event.target.files[0]);
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
    $("#txtResposta").text(data.response.frase)
    $('#divResposta').removeClass("d-none");
    if(data.response.imagem != undefined && data.response.imagem != ''){
        $('#imgResposta').attr("src", "img/" + data.response.imagem.split("/")[1]);
        $('#imgResposta').removeClass("d-none");
    }
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

    console.log($('#inputFile')[0].files[0]);

    //$.ajax({
    //    url: URL_UPLOAD, // Url do lado server que vai receber o arquivo
    //    data: form,
    //    processData: false,
    //    contentType: false,
    //    type: 'POST',
    //    success: function (data) {
            // utilizar o retorno
    //        setFile("Manual.pdf");
    //        $this.html($this.data('original-text'));
    //        $('#btnUpload').attr("disabled", "disabled");
    //        habilitarCampos();
    //    }
    //});
    setTimeout(function() {
            $this.html($this.data('original-text'));
            $('#btnUpload').attr("disabled", "disabled");
            habilitarCampos();
    }, 5000);

});

function setFile(file) {
    $.ajax({
        type: "GET",
        url: URL + "?file=" + file,
        //data: data,
        success: function(){
            console.log("Nome setado com sucesso");
        },
        error: function() {
            console.log("Erro ao setar o nome");
        },
        dataType: "json"
    });
}

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
