USE PortfolioDB;
GO

/*
===================================================
 Tabla: tbAbout
 Descripción: Información personal/profesional
===================================================
*/
CREATE TABLE dbo.tbAbout (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    PortfolioName NVARCHAR(200) NOT NULL,
    PortfolioTitle NVARCHAR(200) NOT NULL,
    PortfolioDescription NVARCHAR(MAX) NOT NULL,
    CreateDate DATETIME DEFAULT GETDATE()
);
GO

/*
===================================================
 Tabla: tbProjects
 Descripción: Proyectos del portafolio
===================================================
*/
CREATE TABLE dbo.tbProjects (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ProjectName NVARCHAR(200) NOT NULL,
    ProjectDescription NVARCHAR(MAX) NOT NULL,
    Technologies NVARCHAR(500) NULL,
    GitHubURL NVARCHAR(500) NULL,
    DemoURL NVARCHAR(500) NULL,
    CreateDate DATETIME DEFAULT GETDATE()
);
GO

/*
===================================================
 Tabla: tbContact
 Descripción: Mensajes de contacto desde el portafolio
===================================================
*/
CREATE TABLE dbo.tbContact (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ContactName NVARCHAR(200) NOT NULL,
    ContactEmail NVARCHAR(200) NOT NULL,
    ContactMessage NVARCHAR(MAX) NOT NULL,
    CreateDate DATETIME DEFAULT GETDATE()
);
GO
