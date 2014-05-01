var request = window.indexedDB.open("NutricionDB",
                                    "Base de Datos Nutricion Integral");
request.onsuccess = function(event) {
  var db = event.result;
  if (db.version != "1") {
    // User's first visit, initialize database.
    var createdObjectStoreCount = 0;
    var objectStores = [
      { name: "MenuFormularios", keyPath: "id"}
    ];
 
    function objectStoreCreated(event) {
      if (++createdObjectStoreCount == objectStores.length) {
        db.setVersion("1").onsuccess = function(event) {
          loadData(db);
        };
      }
    }
 
    for (var index = 0; index < objectStores.length; index++) {
      var params = objectStores[index];
      request = db.createObjectStore(params.name, params.keyPath,
                                     params.autoIncrement);
      request.onsuccess = objectStoreCreated;
    }
  }
  else {
    // User has been here before, no initialization required.
    loadData(db);
  }
};

