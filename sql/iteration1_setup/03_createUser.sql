/*
===================================================
 Script: Creación de usuario de servicio para PortfolioDB
 Autor: Luis Felipe García Gómez
 Fecha: 2025-08-04
 Descripción: Usuario de servicio para la API Node,
              con permisos mínimos (lectura y ejecución de SP)
===================================================
*/

USE master;
GO

DECLARE @userName VARCHAR(50) = 'usrPortfolioDB'

---------------------------------------------------
-- 1. Crear login a nivel servidor
---------------------------------------------------
IF NOT EXISTS (SELECT name FROM sys.server_principals WHERE name = @userName)
BEGIN
    CREATE LOGIN usrPortfolioDB 
    WITH PASSWORD = 'TestPassword', 
         CHECK_POLICY = ON, 
         CHECK_EXPIRATION = OFF;  -- ON si se quiere forzar expiración
    PRINT '✅ Login usrPortfolioDB creado correctamente';
END
ELSE
    PRINT 'ℹ️ Login usrPortfolioDB ya existe';
GO

---------------------------------------------------
-- 2. Crear usuario a nivel base de datos
---------------------------------------------------
USE PortfolioDB;
GO

DECLARE @userName VARCHAR(50) = 'usrPortfolioDB'

IF NOT EXISTS (SELECT name FROM sys.database_principals WHERE name = @userName)
BEGIN
    CREATE USER usrPortfolioDB FOR LOGIN usrPortfolioDB;
    PRINT '✅ Usuario usrPortfolioDB creado en PortfolioDB';
END
ELSE
    PRINT 'ℹ️ Usuario usrPortfolioDB ya existe en PortfolioDB';
GO

---------------------------------------------------
-- 3. Asignar permisos mínimos
---------------------------------------------------
-- Solo lectura general
ALTER ROLE db_datareader ADD MEMBER usrPortfolioDB;

-- Ejecución de procedimientos almacenados
GRANT EXECUTE TO usrPortfolioDB;
GO

PRINT '✅ Permisos asignados a usrPortfolioDB';
