USE PortfolioDB;
GO

/*
===================================================
 Script: Creaci�n sp para obtener info del About
 Autor: Luis Felipe Garc�a G�mez
 Fecha: 2025-08-06
 Descripci�n: Creaci�n sp para obtener info de tbProjects
===================================================
*/

USE PortfolioDB;
GO

CREATE OR ALTER PROCEDURE spGetProjects
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        SELECT 
            Id,
            ProjectName,
            Description,
            Technologies,
            GitHubURL,
            LiveDemoURL,
            OrderIndex
        FROM tbProjects
        ORDER BY OrderIndex ASC;
    END TRY
    BEGIN CATCH
        INSERT INTO tbErrors (ProcedureName, ErrorMessage, ErrorNumber, ErrorSeverity, ErrorState, ErrorLine)
        VALUES (
            ERROR_PROCEDURE(),
            ERROR_MESSAGE(),
            ERROR_NUMBER(),
            ERROR_SEVERITY(),
            ERROR_STATE(),
            ERROR_LINE()
        );

        THROW; -- Re-lanza el error para que el backend lo capture
    END CATCH
END
GO

