# Argentina Vacuna - Sistema de Gestión de Vacunación

## Descripción del Proyecto

Argentina Vacuna es una aplicación web desarrollada para gestionar la trazabilidad de las vacunas adquiridas por el Ministerio de Salud de la Nación Argentina. El sistema permite realizar un seguimiento detallado de cada dosis de vacuna, desde su adquisición por parte del Ministerio hasta su administración a cada persona en los centros de vacunación.

## Requisitos Funcionales

- Registro de vacunas adquiridas por el Ministerio de Salud.
- Seguimiento de la trazabilidad de cada dosis de vacuna por lote-proveedor.
- Distribución de vacunas a las distintas provincias y centros de vacunación.
- Registro de información detallada sobre las dosis aplicadas a las personas.
- Control de vencimiento de las vacunas y alertas para dosis vencidas no aplicadas.
- Registro de descarte de vacunas por mal estado o vencimiento.
- Gestión de reasignación de vacunas de un centro de vacunación a otro.

## Instalación
1. Clonar el repositorio desde GitHub:

```bash
git clone https://github.com/marekmars/vacunatorio.git
cd vacunatorio
```
2. Instalar las dependencias del proyecto:
 ```bash
npm update
```  
3. Ejecutar la aplicación
```bash
npm start
```
4. La aplicación se ejecutará en el entorno local y estará disponible en http://localhost:3000.
   
## Tecnologías Utilizadas
- Frontend:

    - HTML: Lenguaje de marcado utilizado para estructurar el contenido de las páginas web.
    - CSS: Lenguaje de estilos utilizado para definir el diseño y la presentación de las páginas web.
    - JavaScript: Lenguaje de programación utilizado para agregar interactividad y funcionalidad a las páginas web.
    
- Backend:

    - Node.js: Entorno de tiempo de ejecución de JavaScript para el servidor.
    - Express.js: Framework de aplicaciones web de Node.js para facilitar el enrutamiento y la gestión de solicitudes HTTP.

- Base de Datos:

    - MySQL: Sistema de gestión de bases de datos relacional utilizado para almacenar y recuperar datos.

- Otras herramientas:

    - Sequelize: ORM (Object-Relational Mapping) de Node.js para interactuar con la base de datos SQL de manera sencilla.
    - Pug: El modelo de plantillas utilizado
    - Bootstrap: Framework CSS utilizado para facilitar el diseño y la creación de interfaces de usuario responsivas y atractivas.
    - bcryptjs: Librería para el hashing seguro de contraseñas.
    - cookie-parser: Middleware para analizar las cookies en las solicitudes HTTP.
    - dotenv: Módulo para cargar variables de entorno desde un archivo .env.
    - express-session: Middleware de Express para la gestión de sesiones de usuario.
    - jsonwebtoken: Implementación de JSON Web Tokens para la autenticación y autorización.
    - method-override: Middleware para admitir verbos HTTP como PUT o DELETE en formularios HTML.
    - nodemon: Utilidad que reinicia automáticamente la aplicación en desarrollo cuando detecta cambios en el código.

Asegúrate de tener Node.js y npm instalados en tu sistema para ejecutar el proyecto. Puedes encontrar las instrucciones de instalación para Node.js en el sitio web oficial: https://nodejs.org/

## Estructura del Proyecto

    /controllers: Contiene el código de los controladores de los modelos.
    /database: Contiene los scripts de inicialización de la abse de datos.
    /env: Contiene el archivo de configuracion de las variables de entorno
    /middlewares: Contiene middleware de autentificacion
    /models: Contiene los modelos de la base de datos
    /public: Contiene todos los archivos publicos de imagenes, estilo y scrips de front end
    /views: Contiene las vistas pug
## Uso

Una vez que la aplicación esté instalada y configurada, puedes acceder a ella desde tu navegador ingresando la URL correspondiente. 
Desde la interfaz de usuario, podrás realizar las diferentes acciones de gestión de las vacunas, administración de dosis, consultas y generación de reportes.

## Informe y Problemas Surgidos

Durante el desarrollo de la aplicación, se encontraron algunos desafíos que fueron abordados de la siguiente manera:

1. **Compras y Distribución de Vacunas**: El problema de la incertidumbre en los tiempos de envío de las compras y la llegada de vacunas a los centros de distribución se abordó con la creación de tres páginas de control para los niveles jerárquicos de Nación, Provincia y Centros. Cada página permite registrar la llegada de las vacunas y actualizar su estado, utilizando el atributo "estado" que tiene un Enum con opciones como "enViaje" y "enStock". De esta manera, se mantiene un registro actualizado de todas las transacciones y se asegura la disponibilidad de información en tiempo real.

2. **Organización de los Sublotes**: La gestión de lotes y sublotes de vacunas se resolvió mediante una estructura jerárquica. Los lotes de proveedor en la Nación actúan como el punto de origen, y a medida que las vacunas se distribuyen a provincias y centros, se crean sublotes, relacionándolos mediante claves foráneas. Esta organización jerárquica garantiza la trazabilidad y permite un seguimiento preciso de cada vacuna desde su origen hasta su destino final.

3. **Usuarios**: La incorporación de un sistema de usuarios proporciona una capa de seguridad y control de acceso a las distintas funcionalidades del sistema. Los usuarios pueden autenticarse para realizar acciones específicas, como registrar compras, aplicar vacunas, gestionar lotes y realizar consultas, lo que permite una gestión más eficiente y segura del sistema.

4. **Marcar Vacunas Vencidas**: Para evitar la administración de vacunas vencidas, se implementó un trigger que verifica automáticamente las fechas de vencimiento cuando se realizan inserciones o actualizaciones en la tabla de vacunas. Si una vacuna está vencida, el trigger la marca automáticamente como "vencida". Sin embargo, debido a que se requiere mostrar las vacunas vencidas en ciertos contextos, se decidió no descartarlas automáticamente, sino mostrarlas con un distintivo o etiqueta que indique su estado vencido.  Tambien, ya que esto solo ocurría al agregar nuevas vacunas, por lo que también creé un middleware que verificaba la fecha de vencimiento en rutas específicas.

5. **No Registrar Vacunas Vencidas**: En lugar de descartar automáticamente las vacunas vencidas, se optó por mostrarlas en una lista separada o con una etiqueta de "vencida" para que los usuarios estén informados y puedan tomar decisiones basadas en esa información. Además, se agregó un botón que permite a los usuarios descartar todas las vacunas vencidas de manera manual y controlada.
   
6. **Descarte de Vacunas**: La posibilidad de descartar lotes enteros o vacunas individuales ofrece flexibilidad en la gestión de inventario. Si un lote completo debe ser descartado debido a problemas de calidad, por ejemplo, se permite eliminar todos los sublotes relacionados. Por otro lado, si solo una parte de las vacunas debe ser descartada, el sistema permite eliminar solo las unidades específicas afectadas, manteniendo el resto del lote intacto.

7. **Filtrado y Búsqueda de Datos**: Se implementaron dos métodos de filtrado para obtener información sobre las vacunas compradas a cada laboratorio en un rango de fechas específico. En algunos casos, se realizó el filtrado en el frontend para mejorar la experiencia del usuario, mostrando solo opciones relevantes. En otros casos, se optó por un enfoque más directo en el backend, donde se generó un formulario para obtener datos precisos según los criterios ingresados por el usuario.
    
8. **Centros de Vacunación, Depósitos, Tipos de Vacuna, etc**: Para facilitar la administración del sistema, se creó una base de datos inicial con una amplia gama de Centros de Vacunación, Depósitos predefinidos, Tipos de Vacuna, etc. Sin embargo, también se permitió a los usuarios agregar nuevos elementos personalizados según sus necesidades, lo que brinda flexibilidad y adaptabilidad al sistema.
   
9. **Eliminación y Modificación**: La capacidad de modificar o eliminar lotes de vacunas planteó la cuestión de cómo manejar las relaciones entre lotes y sublotes. Se optó por dar a los usuarios la opción de elegir si las modificaciones afectan a los lotes relacionados o no, mediante un checkbox. Esto brinda un mayor control y permite realizar cambios de manera específica según las necesidades de cada situación.

