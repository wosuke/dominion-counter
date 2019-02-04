// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// indexedDB
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
let db,
    dbName    = 'sampleDB',
    dbVersion = '1',
    storeName = 'counter',
    count_a   = 0,
    count_b   = 0,
    count_c   = 0;

// DB名を指定して接続
let openReq = indexedDB.open(dbName, dbVersion);

// 接続に失敗
openReq.onerror = function (event) {
  console.log('接続失敗');
}

// DBのバージョン更新（DBの新規作成も含む）時のみ実行
openReq.onupgradeneeded = function (event) {
        db          = event.target.result;
  const objectStore = db.createObjectStore(storeName, {keyPath : 'id'});

  objectStore.createIndex(    "id",     "id", { unique: true  });
  objectStore.createIndex("action", "action", { unique: false });
  objectStore.createIndex(   "buy",    "buy", { unique: false });
  objectStore.createIndex(  "coin",   "coin", { unique: false });

  console.log('DB更新');
}

// onupgradeneededの後に実行。更新がない場合はこれだけ実行
openReq.onsuccess = function (event) {

      db       = event.target.result;
  let trans_g  = db.transaction(storeName, 'readonly'),
      store_g  = trans_g.objectStore(storeName),
      getReq_g = store_g.get(1);

  getReq_g.onsuccess = function (event) {

    console.log(event.target.result);
    if (typeof event.target.result === 'undefined') {
      count_a = 0;
      count_b = 0;
      count_c = 0;
    } else {
      count_a = event.target.result.action;
      count_b = event.target.result.buy;
      count_c = event.target.result.coin;
    }

    let trans  = db.transaction(storeName, "readwrite"),
        store  = trans.objectStore(storeName),
        putReq = store.put({
          id: 1,
          action: count_a,
          buy:    count_b,
          coin:   count_c
        });

    putReq.onsuccess = function (event) {
      $('#add_a>p').html(count_a);
      $('#add_b>p').html(count_b);
      $('#add_c>p').html(count_c);
      console.log('更新成功');
    }
  }

}

$(function(){

  if( 'serviceWorker' in navigator ) {
    navigator.serviceWorker.register('static/scr/serviceworker.js').then( function ( registration ) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch( function ( err ) {
      console.log('ServiceWorker registration failed: ', err);
    });
  }

  $('#add_a').click(function(){
    count_a++;
    $(this).children('p').html(count_a);
    dbUpdate();
  }).on('touchstart',function(){
    $(this).css('border','1em solid rgba(230, 82, 34, 0.7)');
  }).on('touchend',function(){
    $(this).css('border','1em solid rgba(230, 82, 34, 0.3)');
  });

  $('#add_b').click(function(){
    count_b++;
    $(this).children('p').html(count_b);
    dbUpdate();
  }).on('touchstart',function(){
    $(this).css('border','1em solid rgba(182, 230, 34, 0.7)');
  }).on('touchend',function(){
    $(this).css('border','1em solid rgba(182, 230, 34, 0.3)');
  });

  $('#add_c').click(function(){
    count_c++;
    $(this).children('p').html(count_c);
    dbUpdate();
  }).on('touchstart',function(){
    $(this).css('border','1em solid rgba(230, 180, 34, 0.7)');
  }).on('touchend',function(){
    $(this).css('border','1em solid rgba(230, 180, 34, 0.3)');
  });

  $('#reset').click(function(){
    count_a = 0;
    count_b = 0;
    count_c = 0;
    $('#add_a>p').html(count_a);
    $('#add_b>p').html(count_b);
    $('#add_c>p').html(count_c);
    dbUpdate();
  });

});

function dbUpdate(){

  let trans  = db.transaction(storeName, "readwrite"),
      store  = trans.objectStore(storeName),
      putReq = store.put({
        id: 1,
        action: count_a,
        buy:    count_b,
        coin:   count_c
      });

  putReq.onsuccess = function (event) {
    console.log('DB UPDATA');
  }

}

$(window).on('touchmove.noScroll', function (e) {
  e.preventDefault();
});