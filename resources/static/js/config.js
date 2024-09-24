CKEDITOR.editorConfig = function (config) {
    config.removePlugins = 'bidi,image,forms,adobeair,devtools,find,maximize,a11yhelp,about,divarea,liststyle,tabletools,tableresize,contextmenu,codemirror,docprops,preview,smiley,sourcearea,save,flash,iframe,tabletools,templates,showblocks,newpage,language,print,div';
    config.width = '1000';
    config.height = '100';
};

CKEDITOR.plugins.add('blockimagepaste', {
    init: function (editor) {
        function replaceImgText(html) {
            var ret = html.replace(/<img[^>]*src="data:image\/(bmp|dds|gif|jpg|jpeg|png|psd|pspimage|tga|thm|tif|tiff|yuv|ai|eps|ps|svg);base64,.*?"[^>]*>/gi,
                function (img) {
                    alert("KO");
                    return '';
                });

            return ret;
        }

        function chkImg() {
            if (editor.readOnly) {
                return;
            }

            setTimeout(function () {
                editor.document.$.body.innerHTML = replaceImgText(editor.document.$.body.innerHTML);
            }, 100);
        }

        editor.on('contentDom', function () {
            editor.document.on('drop', chkImg);
            editor.document.getBody().on('drop', chkImg);
            editor.document.on('paste', function (e) { chkImg(editor); });
            editor.document.getBody().on('paste', function (e) { chkImg(editor); });
        });
    } // Init
});