let counter = 1;

$(function(){

  if( 'serviceWorker' in navigator ) {
    navigator.serviceWorker.register('/static/scr/serviceworker.js').then(function(registration){
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(e){
      console.log('ServiceWorker registration failed: ', e);
    });
  }

  // if( storageAvailable('localStorage') ) {
  //   console.log('can storage');
  // } else {
  //   console.log('can\'t storage');
  // }
  $('main').click(function(){
    counter++;
    $('h1').html(counter);
  });
});

function storageAvailable(type) {
  try {
    let storage = window[type],
              x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED' ) &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0;
  }
}