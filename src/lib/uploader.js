/**
 * ImageUploader.js - a client-side image resize and upload javascript module
 *
 * @author Ross Turner (https://github.com/zsinj)
 */
let ImageUploader = function(config) {
    if (!config || (!config.inputElement) || (!config.inputElement.getAttribute) || config.inputElement.getAttribute('type') !== 'file') {
        throw new Error('Config object passed to ImageUploader constructor must include "inputElement" set to be an element of type="file"');
    }
    this.setConfig(config);

    let This = this;
    this.config.inputElement.addEventListener('change', function(event) {
        let fileArray = [];
        let cursor = 0;
        for (; cursor < This.config.inputElement.files.length; ++cursor) {
            fileArray.push(This.config.inputElement.files[cursor]);
        }
        This.progressObject = {
            total : parseInt(fileArray.length, 10),
            done : 0,
            currentItemTotal : 0,
            currentItemDone : 0
        };
        if (This.config.onProgress) {
            This.config.onProgress(This.progressObject);
        }
        This.handleFileList(fileArray, This.progressObject);
    }, false);

    if (This.config.debug) {
        console.log('Initialised ImageUploader for ' + This.config.inputElement);
    }

};

ImageUploader.prototype.handleFileList = function(fileArray) {
    let This = this;
    if (fileArray.length > 1) {
        let file = fileArray.shift();
        this.handleFileSelection(file, function() {
            This.handleFileList(fileArray);
        });
    } else if (fileArray.length === 1) {
        this.handleFileSelection(fileArray[0], function() {
            if (This.config.onComplete) {
                This.config.onComplete(This.progressObject);
            }
        });
    }
};

ImageUploader.prototype.handleFileSelection = function(file, completionCallback) {
    let img = document.createElement('img');
    this.currentFile = file;
    let reader = new FileReader();
    let This = this;
    reader.onload = function(e) {
        img.src = e.target.result;

        setTimeout(function() {
            This.scaleImage(img, completionCallback);
        }, 1);

    };
    reader.readAsDataURL(file);
};

ImageUploader.prototype.scaleImage = function(img, completionCallback) {
    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);

    while (canvas.width >= (2 * this.config.maxWidth)) {
        canvas = this.getHalfScaleCanvas(canvas);
    }

    if (canvas.width > this.config.maxWidth) {
        canvas = this.scaleCanvasWithAlgorithm(canvas);
    }

    let imageData = canvas.toDataURL('image/png', this.config.quality);
    this.performUpload(imageData, completionCallback);
};

ImageUploader.prototype.performUpload = function(imageData, completionCallback) {
    let xhr = new XMLHttpRequest();
    let This = this;
    let uploadInProgress = true;
    xhr.onload = function(e) {
        uploadInProgress = false;
        This.uploadComplete(e, completionCallback);
    };
    xhr.upload.addEventListener("progress", function(e) {
        This.progressUpdate(e.loaded, e.total);
    }, false);
    xhr.open('POST', this.config.uploadUrl, true);
    /** CUSTOM **/
    Object.keys(this.config.headers).forEach(function (key) {
      xhr.setRequestHeader(key, This.config.headers[key]);
    });
    /** END CUSTOM **/
    xhr.send(imageData.split(',')[1]);

    if (this.config.timeout) {
        setTimeout(function() {
            if (uploadInProgress) {
                xhr.abort();
                This.uploadComplete({
                    target: {
                        status: 'Timed out'
                    }
                }, completionCallback);
            }
        }, this.config.timeout);
    }

    if (this.config.debug) {
        let resizedImage = document.createElement('img');
        this.config.workspace.appendChild(document.createElement('br'));
        this.config.workspace.appendChild(resizedImage);

        resizedImage.src = imageData;
    }
};

ImageUploader.prototype.uploadComplete = function(event, completionCallback) {
    this.progressObject.done++;
    this.progressUpdate(0, 0);
    completionCallback();
    if (this.config.onFileComplete) {
        this.config.onFileComplete(event, this.currentFile);
    }
};

ImageUploader.prototype.progressUpdate = function(itemDone, itemTotal) {
    console.log('Uploaded '+itemDone+' of '+itemTotal);
    this.progressObject.currentItemDone = itemDone;
    this.progressObject.currentItemTotal = itemTotal;
    if (this.config.onProgress) {
        this.config.onProgress(this.progressObject);
    }
};

ImageUploader.prototype.scaleCanvasWithAlgorithm = function(canvas) {
    let scaledCanvas = document.createElement('canvas');

    let scale = this.config.maxWidth / canvas.width;

    scaledCanvas.width = canvas.width * scale;
    scaledCanvas.height = canvas.height * scale;

    let srcImgData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    let destImgData = scaledCanvas.getContext('2d').createImageData(scaledCanvas.width, scaledCanvas.height);

    this.applyBilinearInterpolation(srcImgData, destImgData, scale);

    scaledCanvas.getContext('2d').putImageData(destImgData, 0, 0);

    return scaledCanvas;
};

ImageUploader.prototype.getHalfScaleCanvas = function(canvas) {
    let halfCanvas = document.createElement('canvas');
    halfCanvas.width = canvas.width / 2;
    halfCanvas.height = canvas.height / 2;

    halfCanvas.getContext('2d').drawImage(canvas, 0, 0, halfCanvas.width, halfCanvas.height);

    return halfCanvas;
};

ImageUploader.prototype.applyBilinearInterpolation = function(srcCanvasData, destCanvasData, scale) {
    function inner(f00, f10, f01, f11, x, y) {
        let un_x = 1.0 - x;
        let un_y = 1.0 - y;
        return (f00 * un_x * un_y + f10 * x * un_y + f01 * un_x * y + f11 * x * y);
    }
    let i, j;
    let iyv, iy0, iy1, ixv, ix0, ix1;
    let idxD, idxS00, idxS10, idxS01, idxS11;
    let dx, dy;
    let r, g, b, a;
    for (i = 0; i < destCanvasData.height; ++i) {
        iyv = i / scale;
        iy0 = Math.floor(iyv);
        // Math.ceil can go over bounds
        iy1 = (Math.ceil(iyv) > (srcCanvasData.height - 1) ? (srcCanvasData.height - 1) : Math.ceil(iyv));
        for (j = 0; j < destCanvasData.width; ++j) {
            ixv = j / scale;
            ix0 = Math.floor(ixv);
            // Math.ceil can go over bounds
            ix1 = (Math.ceil(ixv) > (srcCanvasData.width - 1) ? (srcCanvasData.width - 1) : Math.ceil(ixv));
            idxD = (j + destCanvasData.width * i) * 4;
            // matrix to vector indices
            idxS00 = (ix0 + srcCanvasData.width * iy0) * 4;
            idxS10 = (ix1 + srcCanvasData.width * iy0) * 4;
            idxS01 = (ix0 + srcCanvasData.width * iy1) * 4;
            idxS11 = (ix1 + srcCanvasData.width * iy1) * 4;
            // overall coordinates to unit square
            dx = ixv - ix0;
            dy = iyv - iy0;
            // I let the r, g, b, a on purpose for debugging
            r = inner(srcCanvasData.data[idxS00], srcCanvasData.data[idxS10], srcCanvasData.data[idxS01], srcCanvasData.data[idxS11], dx, dy);
            destCanvasData.data[idxD] = r;

            g = inner(srcCanvasData.data[idxS00 + 1], srcCanvasData.data[idxS10 + 1], srcCanvasData.data[idxS01 + 1], srcCanvasData.data[idxS11 + 1], dx, dy);
            destCanvasData.data[idxD + 1] = g;

            b = inner(srcCanvasData.data[idxS00 + 2], srcCanvasData.data[idxS10 + 2], srcCanvasData.data[idxS01 + 2], srcCanvasData.data[idxS11 + 2], dx, dy);
            destCanvasData.data[idxD + 2] = b;

            a = inner(srcCanvasData.data[idxS00 + 3], srcCanvasData.data[idxS10 + 3], srcCanvasData.data[idxS01 + 3], srcCanvasData.data[idxS11 + 3], dx, dy);
            destCanvasData.data[idxD + 3] = a;
        }
    }
};

ImageUploader.prototype.setConfig = function(customConfig) {
    this.config = customConfig;
    this.config.debug = this.config.debug || false;
    this.config.quality = 1.00;
    if (0.00 < customConfig.quality && customConfig.quality <= 1.00) {
        this.config.quality = customConfig.quality;
    }
    if (!this.config.maxWidth) {
        this.config.maxWidth = 1024;
    }

    // Create container if none set
    if (!this.config.workspace) {
        this.config.workspace = document.createElement('div');
        document.body.appendChild(this.config.workspace);
    }
};

export default ImageUploader;
