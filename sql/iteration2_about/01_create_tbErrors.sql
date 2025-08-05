USE PortfolioDB;
GO

--Tabla para capturar errores en la ejecución de SPs por medio de bloques try/catch

CREATE TABLE tbErrors (
    IdError INT IDENTITY(1,1) PRIMARY KEY,
    ProcedureName NVARCHAR(200) NOT NULL,
    ErrorMessage NVARCHAR(MAX) NOT NULL,
    ErrorNumber INT NULL,
    ErrorSeverity INT NULL,
    ErrorState INT NULL,
    ErrorLine INT NULL,
    ErrorDate DATETIME DEFAULT GETDATE()
);
GO
