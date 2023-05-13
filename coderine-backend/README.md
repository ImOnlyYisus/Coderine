![Logo](../docs/img/logo-white.png)

---

- [Idea](#idea)
  - [📋Feautures del proyecto](#feautures-del-proyecto)
- [🗃️Preparación del entorno y ejecución del proyecto](#️preparación-del-entorno-y-ejecución-del-proyecto)
  - [⚙️Configuración del proyecto](#️configuración-del-proyecto)
  - [▶️Ejecutar el proyecto](#️ejecutar-el-proyecto)
- [📚 Dependencias](#-dependencias)
  - [📒 Dependencias de desarrollo](#-dependencias-de-desarrollo)
  - [📕 Dependencias de producción](#-dependencias-de-producción)


# Idea

La idea principal es hacer una aplicación parecida a [Codepen](https://codepen.io/), obviamente no tan completa como esta, pero si con las funcionalidades básicas.

Desde la parte del backend se proporcionan los datos necesarios para poder obtener los **usuarios** y los **componentes** que estos han creado.

En un principio gestioné un diagrama de casos de usos para ver que podíamos llegar a hacer.

![Diagrama de casos de uso](../docs/uml/uses-cases.png)

## 📋Feautures del proyecto

> **Nota:** Estas son las funcionalidades que tiene el proyecto en la versión 0.0.1, pero se irán cumpliendo y añadiendo más funcionalidades.

- [x] **Login tradicional**: El usuario se puede loguear con su email y contraseña.
- [x] **Registro tradicional**: El usuario se puede registrar con su email, contraseña y nombre de usuario.
- [x] **Logout**: El usuario se puede desloguear de la aplicación.
- [x] **API REST**: La aplicación tiene una API REST para poder obtener los datos de los usuarios y los componentes.
- [x] **Protección de rutas**: Las rutas de la aplicación están protegidas, es decir, si el usuario no está logueado no podrá acceder a ellas.
- [x] **Validación de datos**: Los datos que se envían al backend están validados.
- [x] **Gestión de errores**: La aplicación gestiona los errores que se puedan producir.
- [ ] **OAuth2**: La aplicación permite loguearse con Google.
- [ ] **OAuth2**: La aplicación permite loguearse con Github.
- [ ] **Optimizar la aplicación**
- [ ] **Backups de la base de datos**: La aplicación hace backups de la base de datos.
- [ ] **Sistema de recomendación**: Implementar a la aplicación un sistema de recomendación de componentes.

# 🗃️Preparación del entorno y ejecución del proyecto

Para poder ejecutar el proyecto, necesitaremos tener instalado [Php](https://www.php.net/) y [Composer](https://getcomposer.org/).

> **Nota:** Al trabajar con un proyecto de **Laravel 10** necesitaremos tener instaldo **PHP 8.1+**, al igual que una versión de **MySQL 5.7+**.

Una vez lo tengamos instalado, tendremos que instalar las dependencias del proyecto, para ello ejecutaremos el siguiente comando:

```bash
composer install
```

## ⚙️Configuración del proyecto

Para poder configurar el proyecto, tendremos que crear un archivo `.env` en la raíz del proyecto, para ello podemos copiar el archivo `.env.example` y renombrarlo a `.env`.

Una vez tengamos el archivo `.env` creado, tendremos que configurar las siguientes variables de entorno:

```env
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

También tendremos que generar una clave para la aplicación, para ello ejecutaremos el siguiente comando:

```bash
php artisan key:generate
```

## ▶️Ejecutar el proyecto

Para ejecutar el proyecto, tendremos que ejecutar el siguiente comando:

```bash
php artisan serve
```

> **Nota:** El proyecto se ejecutará en el puerto 8000, si quieres cambiarlo, tendrás que ejecutar el siguiente comando:
> ```bash
> php artisan serve --port=PUERTO
> ```
> Sustituyendo **PUERTO** por el puerto que quieras.

# 📚 Dependencias

## 📒 Dependencias de desarrollo

- [fakerphp/faker](https://packagist.org/packages/fakerphp/faker): Faker es un paquete de PHP que permite generar datos falsos aleatorios para pruebas.
- [laravel/pint](https://packagist.org/packages/laravel/pint): Pint es un paquete de Laravel que permite interactuar con la base de datos mediante la consola de comandos.
- [laravel/sail](https://packagist.org/packages/laravel/sail): Sail es un paquete de Laravel que permite utilizar Docker para desarrollar aplicaciones web.
- [mockery/mockery](https://packagist.org/packages/mockery/mockery): Mockery es un paquete de PHP que permite crear objetos de prueba simulados para pruebas unitarias.
- [nunomaduro/collision](https://packagist.org/packages/nunomaduro/collision): Collision es un paquete de PHP que mejora la experiencia de la consola de comandos de Laravel.
- [phpunit/phpunit](https://packagist.org/packages/phpunit/phpunit): PHPUnit es un paquete de PHP que permite realizar pruebas unitarias y de integración en Laravel.
- [spatie/laravel-ignition](https://packagist.org/packages/spatie/laravel-ignition): Ignition es un paquete de Laravel que facilita el proceso de depuración y resolución de errores en las aplicaciones web.

## 📕 Dependencias de producción

- [php](https://www.php.net/): PHP es un lenguaje de programación de propósito general de código abierto, muy utilizado en el desarrollo web.
- [guzzlehttp/guzzle](https://packagist.org/packages/guzzlehttp/guzzle): Guzzle es un cliente HTTP de PHP moderno, que permite enviar peticiones HTTP/1.1 y HTTP/2 de manera sencilla.
- [laravel/framework](https://packagist.org/packages/laravel/framework): Laravel es un popular framework de PHP que facilita el desarrollo de aplicaciones web elegantes y eficientes.
- [laravel/sanctum](https://packagist.org/packages/laravel/sanctum): Sanctum es un paquete de Laravel que permite autenticar usuarios mediante tokens de API.
- [laravel/tinker](https://packagist.org/packages/laravel/tinker): Tinker es una herramienta CLI de Laravel que permite interactuar con la aplicación en tiempo real, mediante la consola de comandos.