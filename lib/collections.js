var cropImg = function(fileObj, readStream, writeStream) {
  // Transform the image into a 10x10px thumbnail
  gm(readStream, fileObj.name()).autoOrient().resize('612', '612', "^").gravity('Center').extent('612', '612').stream().pipe(writeStream);
};


Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", { transformWrite: cropImg })]
});
