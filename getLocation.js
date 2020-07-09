if (navigator) {
  // 現在地を取得
  navigator.geolocation.getCurrentPosition(

    // [第1引数] 取得に成功した場合の関数
    function( position )
    {
      // 取得したデータの整理
      var data = position.coords;

      // データの整理
      var lat = data.latitude;
      var lng = data.longitude;

      // HTMLへの書き出し
      //document.getElementById( 'result' ).innerHTML = '<p>緯度' + lat + '</p>' + '<p>経度' + lng + '</p>' ;

      var tweet = getParam('tweet');
      var author = getParam('author');

      console.log(typeof tweet);
      console.log(typeof author);
      execPost('https://mylocationbot.glitch.me/', {'lat': lat.toString(), 'lng': lng.toString(), 'author': author.toString(), 'tweet': tweet});

      function getParam(name, url) {
          if (!url) url = window.location.href;
          name = name.replace(/[\[\]]/g, "\\$&");
          var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
              results = regex.exec(url);
          if (!results) return null;
          if (!results[2]) return '';
          return decodeURIComponent(results[2].replace(/\+/g, " "));
      }

      function execPost(action, data) {
       // フォームの生成
       var form = document.createElement("form");
       form.setAttribute("action", action);
       form.setAttribute("method", "post");
       form.style.display = "none";
       document.body.appendChild(form);
       // パラメタの設定
       if (data !== undefined) {
        for (var paramName in data) {
         var input = document.createElement('input');
         input.setAttribute('type', 'hidden');
         input.setAttribute('name', paramName);
         input.setAttribute('value', data[paramName]);
         form.appendChild(input);
        }
       }
       // submit
       form.submit();
      }
    },

    // [第2引数] 取得に失敗した場合の関数
    function( error )
    {
      // エラーコード(error.code)の番号
      // 0:UNKNOWN_ERROR				原因不明のエラー
      // 1:PERMISSION_DENIED			利用者が位置情報の取得を許可しなかった
      // 2:POSITION_UNAVAILABLE		電波状況などで位置情報が取得できなかった
      // 3:TIMEOUT					位置情報の取得に時間がかかり過ぎた…

      // エラー番号に対応したメッセージ
      var errorInfo = [
        "原因不明のエラーが発生しました…。" ,
        "位置情報の取得が許可されませんでした…。" ,
        "電波状況などで位置情報が取得できませんでした…。" ,
        "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
      ] ;

      // エラー番号
      var errorNo = error.code ;

      // エラーメッセージ
      var errorMessage = "[エラー番号: " + errorNo + "]\n" + errorInfo[ errorNo ] ;

      // アラート表示
      alert( errorMessage ) ;

      // HTMLに書き出し
      //document.getElementById("result").innerHTML = errorMessage;

    } ,

    // [第3引数] オプション
    {
      "enableHighAccuracy": false,
      "timeout": 8000,
      "maximumAge": 2000,
    }

  ) ;
}

// 対応していない場合
else
{
  // エラーメッセージ
  var errorMessage = "お使いの端末は、GeoLacation APIに対応していません。" ;

  // アラート表示
  alert( errorMessage ) ;

  // HTMLに書き出し
  //document.getElementById( 'result' ).innerHTML = errorMessage ;
}
