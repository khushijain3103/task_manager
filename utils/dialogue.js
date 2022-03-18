export function showAlert(message){
    let div  = document.createElement('div');
    div.className = "alert alert-info";
    div.innerHTML = message + 
                    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
    document.querySelector('#liveAlertPlaceholder').append(div);                
}