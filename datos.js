// Variables Gobales
var Datos = {};
var Formularios = {};


// Lee los datos simulados de los formularios
function LeerMenuFormularios()
{
	var MenuFormularios =  [
		{"IdCategoria" : "1",
		 "Categoria":"Visitas Especialistas",
		 "IdFormulario":"1", 
		 "Formulario":"Formulario 1"},
		 {"IdCategoria" : "1",
		  "Categoria":"Visitas Especialistas",
		  "IdFormulario":"2", 
		  "Formulario":"Formulario 2"}
	 ];

	return MenuFormularios
}

// carga los datos de preguntas, incialmente en variable para hacer la simulacion 
function LeerDatos()
{
	var Datos =     [{"IdPregunta" : "1",
	 "Pregunta":"Seleccione la ciudad",
	 "IdTipo":"1",
	 "Observacion":"No tiene observacion",
	 "Opciones":[
		 {"IdOpcion":"1", "Descripcion":"Medellin","Valor":"Medellin"},
		 {"IdOpcion":"2", "Descripcion":"Cali","Valor":"Cali"},
		 {"IdOpcion":"3", "Descripcion":"Bogota","Valor":"Bogota"},
		 {"IdOpcion":"4", "Descripcion":"Barranquilla","Valor":"Barranquilla"}
		 ]
	 },
		{"IdPregunta" : "2",
		 "Pregunta":"Genero",
		 "IdTipo":"1",
		 "Observacion":"",
		 "Opciones":[
			 {"IdOpcion":"1", "Descripcion":"Masculino","Valor":"Masculino"},
			 {"IdOpcion":"2", "Descripcion":"Femenino","Valor":"Femenino"}
		 ]
	 }];
}


// muestra error en caso de que l ooperacion no pueda ser concretada
function errorCB(err) {
	console.log("Error processing SQL: " + err.code);
}

// muestra comando terminado con exito.
function successCB() {
	console.log("success!");
}

// abre la base de datos, si no existe la crea
function AbrirDB(NombreDB)
{
    var db = window.openDatabase('NutricionDB', "1.0", 'NutricionDB', 1024000);
	return db;
}

// Crea la tabla de menu de formularios
function CrearMenuFormularios()
{
    var db = AbrirDB();
    db.transaction(function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS MenuFormularios');
        tx.executeSql('CREATE  TABLE  IF NOT EXISTS "Formularios" ("IdFormulario" INTEGER PRIMARY KEY  NOT NULL , "Formulario" VARCHAR(50) NOT NULL , "Categoria" Varchar(50) NOT NULL , "IdCategoria" INTEGER NOT NULL )');    
    }, errorCB, successCB);
}

// Guarda los formularios por medio de una transaccion
function GuardarMenuFormularios(menu)
{
    var db = AbrirDB();
    CrearMenuFormularios();
	db.transaction(function(tx) {
        for (var i = 0; i < menu.length; i++)
        {
            tx.executeSql('INSERT INTO MenuFormularios (IdFormulario, Formulario, IdCategoria, Categoria) VALUES (' +
                menu[i].IdFormulario + ', "' +
                menu[i].Formulario + '" , ' +
                menu[i].IdCategoria + ', "' +
                menu[i].Categoria + '")');            
        }    
    }, errorCB, successCB);
}


// Cargar los datos de formularios
function CargarMenuFormularios()
{
    var menu;
    var db = AbrirDB();
    db.readTransaction(function(tx) {
        tx.executeSql('SELECT * FROM Formularios Order By Categoria, Formulurio', [], function (tx, results) {
            var len = results.rows.length;s            
        }, errorCB );
    }, errorCB, successCB);
    return menu
}








