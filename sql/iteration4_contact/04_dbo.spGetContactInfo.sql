USE PortfolioDB
GO

/*
===================================================
 Autor: Luis Felipe García Gómez
 Fecha: 2025-08-06
 Descripción: Creación sp para obtener info de tbContact
===================================================
*/

CREATE OR ALTER PROCEDURE dbo.spGetContactInfo
AS
BEGIN
    SET NOCOUNT ON;

	BEGIN TRY

		SELECT 
			InfoLabel
			,InfoValue
			,Icon
			,OrderIndex
		FROM dbo.tbContactInfo
		ORDER BY OrderIndex;

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