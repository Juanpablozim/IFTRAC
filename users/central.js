const lastLogin = 'LastLogin';

function validate () {
    let strDados = localStorage.getItem(lastLogin);
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
        ultimoLogin = objDados.login[0].id;

        if ((Date.now() - objDados.login[0].horario) < 1800000) {
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

function redirecionar(){
    if( validate() ){
        window.location = "usuario/usuario.html";
    }else{
        window.location = "login/login.html";
    }
}