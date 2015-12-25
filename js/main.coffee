document.addEventListener "DOMContentLoaded", ->
  # Attach webcam
  Webcam.attach '#webcam_view'

  # Send picture to API when 'Take picture' button is clicked
  document.getElementById('btn_take_picture').onclick = () ->
    api = new ProjectOxfordEmotions()
    Webcam.snap (data_uri) ->
      api.upload data_uri

class ProjectOxfordEmotions
  upload: (image_data_uri) ->
    # Detect image format
    image_fmt = ''
    if image_data_uri.match(/^data\:image\/(\w+)/)
      image_fmt = RegExp.$1
    else
      throw 'Cannot locate image format in Data URI'

    # Extract raw base64 data
    raw_image_data = image_data_uri.replace(/^data\:image\/\w+\;base64\,/, '')

    # Create a blob with raw image data
    blob = new Blob([ Webcam.base64DecToArr(raw_image_data) ], type: 'image/' + image_fmt)

    # Send JSON data
    $.ajax({
      url:          'https://api.projectoxford.ai/emotion/v1.0/recognize',
      type:         'POST',
      headers:      {'Ocp-Apim-Subscription-Key': '76469f52edef4e52a72bcd8a6f2dd07c'}
      contentType:  'application/octet-stream',
      data:         blob,
      processData:  false,
      success:      _uploadSuccess,
      error:        _uploadError
    });

  _uploadSuccess = (response) ->
    console.log response
    $('#result').text(JSON.stringify(response, null, 2))

  _uploadError = (response)   ->
    console.log response