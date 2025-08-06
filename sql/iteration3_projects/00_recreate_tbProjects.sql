USE PortfolioDB
GO

/*========================================================
Recreamos la tbProject para agregar la columna OrderIndex
manteniendo un orden que ayude a una lectura más amigable
========================================================*/

DROP TABLE IF EXISTS tbProjects

CREATE TABLE tbProjects (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ProjectName NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX),
    Technologies NVARCHAR(500),
    GitHubURL NVARCHAR(300),
    LiveDemoURL NVARCHAR(300),
    OrderIndex INT,
    CreateDate DATETIME DEFAULT GETDATE()
);
