
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

var formula = [];

    // Definición de modelos
    $data.Entity.extend("MenuFormulario", {
        IdFormulario: { type: "int", key: true, computed: true },
        Formulario: { type: "string", required: true },
        IdCategoria: { type: "int", required: true },
        Categoria: { type: "string", required: true }
    });

    
    $data.EntityContext.extend("NutriDataBase", {
        MenuFormularios: { type: $data.EntitySet, elementType: MenuFormulario }
    });

    NutriDB = new NutriDataBase({ 
        provider: 'indexedDb', databaseName: 'NutriDB'
    });

//
//    NutriDB.onReady(function() {
////        NutriDB.MenuFormularios.toArray(function(result) {
////            if(result.length)
////            { 
////                formula = result;
////            }
////            else
////            {
////                alert(0);
////            }
////        });
//
//
//    });

    // Guarda los formularios por medio de una transaccion
    function GuardarMenuFormularios(menu)
    {
        
        NutriDB.MenuFormularios.addMany(menu);
        NutriDB.saveChanges();
    }

    // Cargar los datos de formularios
    function CargarMenuFormularios()
    {
        var menu = [];
        
        var deps = NutriDB.MenuFormularios.toArray();
        deps.then(function (result) {
            menu = result;
        });
        
//        NutriDB.MenuFormularios.filter(
//            function(item) {
//                // Filter predicate
//                return item.Id > 0;
//            }
//        ).toArray(function(result) {
//            menu = result;
//        });
        return menu
    }





