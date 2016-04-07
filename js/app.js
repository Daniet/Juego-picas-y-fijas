$(document).foundation();

function noRepetirNumero( num1, num2){
    if( num1.indexOf( num2) < 0){
        return true;
    }else{
        return false;
    }
}

function crearNumeroAleatorio(){
    var aleatorio = Array();
    while( aleatorio.length < 4){
        var num2 = parseInt( Math.random() * 10);
        if( noRepetirNumero( aleatorio, num2)){
            aleatorio.push( num2);
        }
    }
    return aleatorio.join('');
}

function puntuacion( aleatorio, numero){
    var picas = 0;
    var fijas = 0;
    for( var x in numero){
        var posicion = aleatorio.indexOf( numero[x]);
        if( posicion >= 0){
            if( posicion == x){
                fijas++;
            }else{
                picas++;
            }
        }
    }
    return {
        'picas': picas,
        'fijas': fijas
    };
}

function estado( estado){
    
    switch( estado){
        case 'ganar':
            alert( 'Muy bien a ganado el juego');
            break;
        case 'Reiniciar Juego':
            window.location=document.URL;
            break;
        default:
            alert( 'estado no identificado');
            break;
    }
    
}

$( document).ready( function(){
    //numero aleatorio
    var aleatorio = crearNumeroAleatorio();
    console.log( aleatorio);
    // contador de intentos
    var intentetos = 1;
    // controles del juego
    $( '.control div a').click( function(){
        switch ( $( this).text()) {
            case 'Borrar':
                $('#numero').val( $('#numero').val().substr( 0,($('#numero').val().length -1)));
                break;
            case 'Terminar Juego':
                estado('salir');
                break;
            case 'Adivinar':
                puntos = puntuacion( aleatorio, $('#numero').val());
                $('#puntaje .historico').prepend(
                    '<div class="small-3 columns">'+(intentetos++)+
                    '</div><div class="small-3 columns">'+$('#numero').val()+
                    '</div><div class="small-3 columns">'+puntos.picas+
                    '</div><div class="small-3 columns">'+puntos.fijas+
                    '</div>');
                $('#numero').val('');
                if( puntos.fijas == 4){
                    estado( 'ganar');
                }
                break;
            default:
                if( $('#numero').val().length < 4 && noRepetirNumero( $("#numero").val(), $( this).text())){
                    $( '#numero').val( $("#numero").val() + $( this).text());
                }
                break;
        }
    });
    
    $( 'body').keypress( function( evt){
        if( evt.keyCode == 13){
            puntos = puntuacion( aleatorio, $('#numero').val());
            $('#puntaje .historico').prepend( '<div class="small-3 columns">'+(intentetos++)+'</div><div class="small-3 columns">'+$('#numero').val()+'</div><div class="small-3 columns">'+puntos.picas+'</div><div class="small-3 columns">'+puntos.fijas+'</div>');
            $('#numero').val('');
            if( puntos.fijas == 4){
                estado( 'ganar');
            }
        }else{
            
            if( evt.keyCode > 47 && 57){
                if( $('#numero').val().length < 4 && noRepetirNumero( $("#numero").val(), String.fromCharCode( evt.keyCode))){
                    $( '#numero').val( $("#numero").val() + String.fromCharCode( evt.keyCode));
                }
                                
            }
        }
    });
    
});