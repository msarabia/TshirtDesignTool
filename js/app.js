var TShirtDesignTool =
{
    init: function () {
        var _this = TShirtDesignTool;
        _this.canvasInit();
       // _this.drawText("Hello world");

        //window.canvas.on('mouse:down', function(options) {
        //    console.log(options.e.clientX, options.e.clientY);
        //    if (options.target) {
        //        console.log('an object was clicked! ', options.target.type);
        //    }
        //});
    }
    , canvasInit: function () {
    //$('#canvas').removeAttr('style');
    window.canvas = new fabric.Canvas('canvas');
    canvas.setHeight(430);
    canvas.setWidth(385);
    //canvas.isDrawingMode=true;
    canvas.renderAll();
}
    , drawText: function () {

    //if (window.canvas.getObjects().length > 0) {
    //    window.canvas.item(0).text = Text;
    //    window.canvas.renderAll();
    //    return;
    //}

    var Text = $('#add-text-form textarea').val();
    if(Text==="")
        return;
    var SampleText = new fabric.Text(Text, {
        left: canvas.getWidth() / 2,
        top: canvas.getHeight() / 2
    });

    SampleText.on('selected', function() {
       // console.log('Text is selected');
        TShirtDesignTool.changeToEditorPanel(SampleText.text);
    });

    SampleText.on('added', function() {
        console.log('Text added');
    });

    SampleText.on('onkeydown', function(e) {
       // not fired
    });

    window.canvas.add(SampleText);
    TShirtDesignTool.changeToEditorPanel(Text);
    return;
} // end of drawText
    ,changeToEditorPanel:function(Text){
    $('#textPanel').empty();
    $('#textPanel').css("border","1px solid darkgray");
      var editorPanel=' <h6>Text Properties:</h6>'+
             '<textarea name="" onkeyup="return TShirtDesignTool.updateText(this.value)">'+Text+'</textarea>'+
             '<select name="font">'+
             '<option value="" selected>Change font</option><option value="1">OldSansBlack</option>'+
             '<option value="2">Megazine</option><option value="3" >Typodermic</option><option value="4">Impact</option>'+
            '</select>';
    $('#textPanel').append(editorPanel);
}   //end of changeToEditorPanel
    ,changeToAddTextPanel: function(){
        $('#textPanel').empty();
        $('#textPanel').removeAttr('style');
        var addTextPanel='<div class="panel">'+
            '<h5>Add Text</h5>'+
            '<form id="add-text-form" class="content">'+
            '<textarea class="text full input-text-1" name=""></textarea>'+
            '<fieldset>'+
            '<a href="#" title="Add" onclick="return TShirtDesignTool.drawText()" class="primary-button full">Add Text</a>'+
            '</fieldset>'+
            '</form>'+
            '</div>';
        $('#textPanel').append(addTextPanel);
}
    ,updateText: function(e){
    //var activeObject=window.canvas.getActiveObject();
    //activeObject.setAttribute('text',this.value);
    window.canvas.getActiveObject().text=e;
    canvas.renderAll();
}


};

$(document).ready(function () {
    TShirtDesignTool.init();

    document.onkeydown = function(e) {
        if (46 === e.keyCode || e.keyCode===110) {
            var activeObject=window.canvas.getActiveObject();
            if(activeObject!==null){
                window.canvas.remove(activeObject);
            }
            window.canvas.renderAll();
        }};


});