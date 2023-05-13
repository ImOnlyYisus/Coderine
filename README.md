[![Deploy frontend to server](https://github.com/politecnicoDAW-2022/2022-2023---proyecto-integrado-ImOnlyYisus/actions/workflows/deploy-front.yaml/badge.svg)](https://github.com/politecnicoDAW-2022/2022-2023---proyecto-integrado-ImOnlyYisus/actions/workflows/deploy-front.yaml)

---

![Logo](./docs/img/logo-white.png)

## Indice

- [Indice](#indice)
- [Idea principal](#idea-principal)
- [Explicación del proyecto](#explicación-del-proyecto)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Como ejecutar el proyecto](#como-ejecutar-el-proyecto)
    - [🚫🐋Sin docker](#sin-docker)
    - [🐋Con docker](#con-docker)
    - [📝 Notas](#-notas)

## Idea principal

La idea principal es hacer una aplicación parecida a [Codepen](https://codepen.io/), obviamente no tan completa como esta, pero si con las funcionalidades básicas.

En el caso de que no conozcas Codepen, es una aplicación web donde puedes crear pequeños proyectos web, con HTML, CSS y JavaScript, y puedes ver el resultado en tiempo real, también puedes compartir tus proyectos con otros usuarios, guardarlos, etc.

Mi idea es hacer una aplicación parecida, y poco a poco ir añadiendo funcionalidades, como son el poder incluir dependecias, diferentes frameworks, etc.

## Explicación del proyecto

### Frontend

📋[Documentación de la parte de frontend](./coderine-frontend/README.md)

### Backend

📋[Documentación de la parte de backend](./coderine-backend/README.md)

## Como ejecutar el proyecto

Hay varias formas de utilizar el proyecto, la primera es ejecutarlo de **forma local**, y la segunda es ejecutarlo con **Docker**.

> **Nota:** Con docker la aplicación no va lo más fluida que debería, ya que no he tenido tiempo de optimizarla, pero si que funciona.
> **REQUSITOS**: Tener instalado docker y docker-compose

#### 🚫🐋Sin docker

Para ejecutar la aplicación de forma local, tendremos que tener unos requisitos previos, que son los siguientes:

- ✅ Tener instalado [Node.js](https://nodejs.org/es/)
- ✅ Tener instalado [MySQL](https://www.mysql.com/)
- ✅ Tener PHP 8.1 o superior
- ✅ Tener instalado [Composer](https://getcomposer.org/)

Una vez tengamos todos los requisitos, tendremos que seguir los siguientes pasos:

1. **Clonar el repositorio**
   ```bash
    #Clonar el repositorio con la rama main
    git clone --branch main [URL]
    ```
2. **Instalar las dependencias**
    ```bash
     #Instalar las dependencias del backend
     cd coderine-backend
     composer install
     ```
    ```bash
     #Instalar las dependencias del frontend
     cd coderine-frontend
     npm install
     ```
3. **Configurar el archivo .env**
   - **En 📁 ./coderine-backend**
        ```bash
        #Copiar el archivo .env.example y renombrarlo a .env
        cp .env.example .env
        ```
        ```ENV
        #Configurar el archivo .env
        #Cambiar variables de entorno
        ...
        DB_HOST= [Tu ip de MySQL] si estas en local puedes dejarlo como localhost
        DB_PORT=3306
        DB_DATABASE=coderine #Tendrás que crear la base de datos en MySQL vacía con ese nombre
        DB_USERNAME= [Tu usuario de MySQL]
        DB_PASSWORD= [Tu contraseña de MySQL]
        ...
        ```
    - **En 📁 ./coderine-frontend**
        ```bash
        #Copiar el archivo .env.example y renombrarlo a .env
        cp .env.example .env
        ```
        ```ENV
        #Configurar el archivo .env
        #Cambiar variables de entorno
        #Tu ip puede ser localhost si estas en local, y el puerto es el que tengas configurado en el backend por defecto laravel utiliza el 8000

        VITE_BACKEND_CSRF= [IP:PORT]/sanctum/csrf-cookie/ 
        VITE_BACKEND_URL= [IP:PORT]

        #Sustituir IP por tu ip y PORT por el puerto que tengas configurado en el backend
        ```
4. **Migraciones de laravel**
    Dentro de la carpeta 📁 ./coderine-backend ejecutar el siguiente comando:
    ```bash
    php artisan migrate
    ```
    ```bash	
    php artisan db:seed
    ```
    > El ultimo comando es para crear un usuario de prueba, con el que poder acceder a la aplicación, los datos de este usuario son:
    > - Email: demo@demo.com
    > - Contraseña: demo12345_

5. **Ejecutar el proyecto**
    - **En 📁 ./coderine-backend**
        ```bash
        php artisan serve
        ```
    - **En 📁 ./coderine-frontend**
        ```bash
        npm run dev
        ```
    > **Nota:** Si quieres ejecutar el proyecto en modo producción, tendrás que ejecutar el comando `npm run build` y luego `npm run serve`


    **_OPCIONAL_** en caso de **error** al ejecutar el proyecto de laravel ejecuta este comando para regenerar las keys ````php artisan key:generate````

#### 🐋Con docker

Para ejecutar la aplicación con docker, tendremos que tener unos requisitos previos, que son los siguientes:

- ✅ Tener instalado [Docker](https://www.docker.com/)
- ✅ Tener instalado [Docker-compose](https://docs.docker.com/compose/)

Una vez tengamos todos los requisitos, tendremos que seguir los siguientes pasos:

1. **Clonar el repositorio**
   ```bash
    #Clonar el repositorio con la rama main
    git clone --branch main [URL]
    ```
2. **Configurar el archivo .env**
   - **En 📁 ./coderine-backend**
        ```bash
        cp .env.example .env
        ```
    - **En 📁 ./coderine-frontend**
        ```bash
        cp .env.example .env
        ```
3. **Levantar los contenedores**
    ```bash
    docker-compose up -d
    ```
    > **Nota:** Este comando puede tardar un poco, ya que tiene que descargar las imágenes de docker, y luego instalar las dependencias de laravel y de node.js

#### 📝 Notas

Para acceder a la aplicación, tendremos que acceder a la siguiente url: 
- **Sin docker:** http://localhost:5173
- **Con docker:** http://localhost:80







