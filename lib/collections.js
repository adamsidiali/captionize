
/*
====================================
====================================
Note on transformWrite: GM seems to be
crashing on the server...

Found a few issues opened that sounded
similar. No solutions yet.

#TODO
====================================
====================================
*/
var cropImg = function(fileObj, readStream, writeStream) {
  // Transform the image into a 10x10px thumbnail
  gm(readStream, fileObj.name()).autoOrient().resize('612', '612', "^").gravity('Center').extent('612', '612').stream().pipe(writeStream);
};


Images = new FS.Collection("images", {
  stores: [new FS.Store.GridFS("images")],
  filter: {
    allow: {
      contentTypes: ['image/*'] //allow only images in this FS.Collection
    }
  }
});
