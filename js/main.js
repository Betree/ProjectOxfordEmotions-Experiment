// Generated by CoffeeScript 1.10.0
(function() {
  var ProjectOxfordEmotions;

  document.addEventListener("DOMContentLoaded", function() {
    Webcam.attach('#webcam_view');
    return document.getElementById('btn_take_picture').onclick = function() {
      var api;
      api = new ProjectOxfordEmotions();
      return Webcam.snap(function(data_uri) {
        return api.upload(data_uri);
      });
    };
  });

  ProjectOxfordEmotions = (function() {
    var _uploadError, _uploadSuccess;

    function ProjectOxfordEmotions() {}

    ProjectOxfordEmotions.prototype.upload = function(image_data_uri) {
      var blob, image_fmt, raw_image_data;
      image_fmt = '';
      if (image_data_uri.match(/^data\:image\/(\w+)/)) {
        image_fmt = RegExp.$1;
      } else {
        throw 'Cannot locate image format in Data URI';
      }
      raw_image_data = image_data_uri.replace(/^data\:image\/\w+\;base64\,/, '');
      blob = new Blob([Webcam.base64DecToArr(raw_image_data)], {
        type: 'image/' + image_fmt
      });
      return $.ajax({
        url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
        type: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': 'YOUR_MICROSOFT_API_KEY'
        },
        contentType: 'application/octet-stream',
        data: blob,
        processData: false,
        success: _uploadSuccess,
        error: _uploadError
      });
    };

    _uploadSuccess = function(response) {
      console.log(response);
      return $('#result').text(JSON.stringify(response, null, 2));
    };

    _uploadError = function(response) {
      return console.log(response);
    };

    return ProjectOxfordEmotions;

  })();

}).call(this);

//# sourceMappingURL=main.js.map
