USE [PortfolioDB]
GO
/****** Object:  StoredProcedure [dbo].[spGetAbout]    Script Date: 6/08/2025 4:47:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
===================================================
 Autor: Luis Felipe García Gómez
 Fecha: 2025-08-06
 Descripción: Creación sp para guardar datos de contacto de los usuarios
===================================================
*/

CREATE OR ALTER PROCEDURE dbo.spInsertContact
    @ContactName NVARCHAR(100),
    @ContactEmail NVARCHAR(100),
    @ContactMessage NVARCHAR(1000)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        INSERT INTO dbo.tbContact (ContactName, ContactEmail, ContactMessage)
        VALUES (@ContactName, @ContactEmail, @ContactMessage);
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
END;
