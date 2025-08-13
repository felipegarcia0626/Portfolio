USE PortfolioDB
GO

-- DROP TABLES
--DROP TABLE IF EXISTS dbo.tbContactMessage;
--DROP TABLE IF EXISTS dbo.tbProject;
--DROP TABLE IF EXISTS dbo.tbAboutContactInfo;
--DROP TABLE IF EXISTS dbo.tbAboutAchievement;
--DROP TABLE IF EXISTS dbo.tbAboutSkill;
--DROP TABLE IF EXISTS dbo.tbAbout;
--DROP TABLE IF EXISTS dbo.tbAchievement;
--DROP TABLE IF EXISTS dbo.tbSkill;
--DROP TABLE IF EXISTS dbo.tbSkillType;
--DROP TABLE IF EXISTS dbo.tbContactInfo;

/*=====================================
Crear y poblar tbSkillType
=======================================*/

DROP TABLE IF EXISTS dbo.tbSkillType;
CREATE TABLE dbo.tbSkillType (
    Id INT IDENTITY(1,1) CONSTRAINT pkSkillType PRIMARY KEY,
    SkillType NVARCHAR(50) NOT NULL UNIQUE,
    CreateDate DATETIME NOT NULL DEFAULT GETDATE()
);
INSERT INTO dbo.tbSkillType (SkillType) VALUES ('Hard'), ('Soft');
GO

/*=====================================
Crear y poblar tbSkill
=======================================*/

DROP TABLE IF EXISTS dbo.tbSkill;
CREATE TABLE dbo.tbSkill (
    Id INT IDENTITY(1,1) CONSTRAINT pkSkill PRIMARY KEY,
    IdSkillType INT NOT NULL FOREIGN KEY REFERENCES dbo.tbSkillType(Id),
    SkillName NVARCHAR(100) NOT NULL,
    OrderIndex INT NOT NULL,
    CreateDate DATETIME NOT NULL DEFAULT GETDATE()
);

DECLARE @HardId INT = (SELECT Id FROM dbo.tbSkillType WHERE SkillType = 'Hard');
DECLARE @SoftId INT = (SELECT Id FROM dbo.tbSkillType WHERE SkillType = 'Soft');
INSERT INTO dbo.tbSkill (IdSkillType, SkillName, OrderIndex) VALUES
(@HardId,'SQL',1),(@HardId,'ETL',2),(@HardId,'Bases de datos',3),(@HardId,'Microsoft Excel',4),(@HardId,'Python',5),
(@HardId,'R',6),(@HardId,'Análisis de datos',7),(@HardId,'Power BI',8),(@HardId,'Autocad',9),(@HardId,'ERP Microsoft Dynamics',10),
(@HardId,'Implementación de KPI',11),(@HardId,'Mejora continua',12),(@HardId,'Visualización de datos',13),(@HardId,'Dashboard',14),
(@SoftId,'Comunicación',1),(@SoftId,'Liderazgo',2),(@SoftId,'Proactividad',3),(@SoftId,'Organización',4),(@SoftId,'Análisis',5),
(@SoftId,'Planificación',6),(@SoftId,'Gestión',7);
GO

/*=====================================
Crear y poblar tbAchievement
=======================================*/

DROP TABLE IF EXISTS dbo.tbAchievement;
CREATE TABLE dbo.tbAchievement (
    Id INT IDENTITY(1,1) CONSTRAINT pkAchievement PRIMARY KEY,
    Description NVARCHAR(300) NOT NULL,
    OrderIndex INT NOT NULL
);
INSERT INTO dbo.tbAchievement (Description, OrderIndex) VALUES
(N'Exención de pago de matrícula a los 5 mejores puntajes de admisión para la carrera de ingeniería industrial para el semestre 2015-2. Universidad Nacional de Colombia sede Manizales.', 1),
(N'Exención de pago de matrícula como estímulo a los 15 mejores promedios de la carrera ingeniería industrial para los semestres 2017-2, 2018-1, 2018-2, 2019-1, 2019-2, 2020-1. Universidad Nacional de Colombia sede Manizales.', 2),
(N'Mejor ICFES Saber Pro 2019.', 3);
GO

/*=====================================
Crear y poblar tbAbout
=======================================*/

DROP TABLE IF EXISTS dbo.tbAbout;
CREATE TABLE dbo.tbAbout (
    Id INT IDENTITY(1,1) CONSTRAINT pkAbout PRIMARY KEY,
    PortfolioName NVARCHAR(150) NOT NULL,
    City NVARCHAR(100) NULL,
    ProfileDescription NVARCHAR(MAX) NULL,
    CvUrl NVARCHAR(250) NULL,
    AvatarUrl NVARCHAR(250) NULL,
    CreateDate DATETIME DEFAULT GETDATE()
);
INSERT INTO dbo.tbAbout (PortfolioName, City, ProfileDescription, CvUrl, AvatarUrl)
VALUES (
N'Luis Felipe García Gómez',
N'Manizales, Colombia',
N'Ingeniero industrial con máster en Big Data y Business Intelligence, bilingüe (inglés B2+), con experiencia en desarrollo y optimización de bases de datos, manejo y análisis de información, funciones administrativas y comerciales. Cuento con habilidades como la resolución de problemas, el pensamiento crítico, la toma de decisiones basadas en información y la capacidad de entablar relaciones que me facilitan el trabajo en equipo y el buen servicio al cliente tanto interno como externo. Me apasiona enfrentarme a nuevos retos que me contribuyan a crecer tanto profesional como personalmente, manteniéndome siempre con la disposición de estar en constante aprendizaje, buscando siempre el máximo beneficio del lugar en el que me esté desempeñando.',
N'/assets/LuisFelipeGarciaGomezCV.pdf',
N'/assets/avatar.jpg'
);
GO

/*=====================================
Crear y poblar tbAboutSkill - Asociación About/Skills
=======================================*/

DROP TABLE IF EXISTS dbo.tbAboutSkill;
CREATE TABLE dbo.tbAboutSkill (
    Id INT IDENTITY(1,1) CONSTRAINT pkAboutSkill PRIMARY KEY,
    IdAbout INT NOT NULL FOREIGN KEY REFERENCES dbo.tbAbout(Id),
    IdSkill INT NOT NULL FOREIGN KEY REFERENCES dbo.tbSkill(Id)
);
INSERT INTO dbo.tbAboutSkill (IdAbout, IdSkill)
SELECT 1, Id FROM dbo.tbSkill;
GO

/*=====================================
Crear y poblar tbAboutAchievement - Asociación About/Achievements
=======================================*/

DROP TABLE IF EXISTS dbo.tbAboutAchievement;
CREATE TABLE dbo.tbAboutAchievement (
    Id INT IDENTITY(1,1) CONSTRAINT pkAboutAchievement PRIMARY KEY,
    IdAbout INT NOT NULL FOREIGN KEY REFERENCES dbo.tbAbout(Id),
    IdAchievement INT NOT NULL FOREIGN KEY REFERENCES dbo.tbAchievement(Id)
);
INSERT INTO dbo.tbAboutAchievement (IdAbout, IdAchievement)
SELECT 1, Id FROM dbo.tbAchievement;
GO

/*=====================================
Crear y poblar tbContactInfo
=======================================*/

DROP TABLE IF EXISTS dbo.tbContactInfo;
CREATE TABLE dbo.tbContactInfo (
    Id INT IDENTITY(1,1) CONSTRAINT pkContactInfo PRIMARY KEY,
    InfoLabel NVARCHAR(50) NOT NULL,
    InfoValue NVARCHAR(200) NOT NULL,
    Icon NVARCHAR(50)  NULL,
    OrderIndex INT NOT NULL
);
INSERT INTO dbo.tbContactInfo (InfoLabel, InfoValue, Icon, OrderIndex) VALUES
('Email',    'felipegarcia0626@gmail.com', 'mail',     1),
('Phone',    '+57 3117045507',             'phone',    2),
('LinkedIn', 'https://www.linkedin.com/in/luis-felipe-garcia-sql-excel-powerbi-data/', 'linkedin', 3),
('GitHub',   'https://github.com/felipegarcia0626',    'github',   4);

/*=====================================
Crear y poblar tbAboutContactInfo - Asociación tbContactInfo/tbAboutContactInfo
=======================================*/

DROP TABLE IF EXISTS dbo.tbAboutContactInfo;
CREATE TABLE dbo.tbAboutContactInfo (
    Id INT IDENTITY(1,1) CONSTRAINT pkAboutContactInfo PRIMARY KEY,
    IdAbout INT NOT NULL FOREIGN KEY REFERENCES dbo.tbAbout(Id),
    IdContactInfo INT NOT NULL FOREIGN KEY REFERENCES dbo.tbContactInfo(Id)
);
INSERT INTO dbo.tbAboutContactInfo (IdAbout, IdContactInfo)
SELECT 1, Id FROM dbo.tbContactInfo;
GO

/*=====================================
Crear y poblar tbProject
=======================================*/

DROP TABLE IF EXISTS dbo.tbProject;
CREATE TABLE dbo.tbProject (
    Id INT IDENTITY(1,1) CONSTRAINT pkProject PRIMARY KEY,
    ProjectName NVARCHAR(200) NOT NULL,
    ProjectDescription NVARCHAR(MAX) NULL,
    Technologies NVARCHAR(300) NULL,
    GitHubUrl NVARCHAR(250) NULL,
    DemoUrl NVARCHAR(250) NULL,
    IdAbout INT NOT NULL FOREIGN KEY REFERENCES dbo.tbAbout(Id),
    OrderIndex INT NOT NULL,
    CreateDate DATETIME DEFAULT GETDATE()
);

GO

/*=====================================
Crear y poblar tbContactMessage
=======================================*/

DROP TABLE IF EXISTS dbo.tbContactMessage;
CREATE TABLE dbo.tbContactMessage (
    Id INT IDENTITY(1,1) CONSTRAINT pkContactMessage PRIMARY KEY,
    ContactName NVARCHAR(150) NOT NULL,
    ContactEmail NVARCHAR(150) NOT NULL,
    ContactMessage NVARCHAR(MAX) NOT NULL,
    CreateDate DATETIME DEFAULT GETDATE()
);
GO

/*=====================================
Crear y poblar tbExperience
=======================================*/

DROP TABLE IF EXISTS dbo.tbExperience;
CREATE TABLE dbo.tbExperience (
    Id INT IDENTITY(1,1) CONSTRAINT pkExperience PRIMARY KEY,
    IdAbout INT NOT NULL FOREIGN KEY REFERENCES dbo.tbAbout(Id),
    Position NVARCHAR(150) NOT NULL,
    Company NVARCHAR(150) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NULL, -- NULL si es actual
    Responsibilities NVARCHAR(MAX) NULL,
    Achievements NVARCHAR(MAX) NULL,
    OrderIndex INT NOT NULL,
    CreateDate DATETIME DEFAULT GETDATE()
);

-- Insertar datos reales de tu hoja de vida
INSERT INTO dbo.tbExperience (IdAbout, Position, Company, StartDate, EndDate, Responsibilities, Achievements, OrderIndex)
VALUES
(1, 'Development Application Analyst', 'Teleperformance', '2022-10-01', NULL,
N'Desarrollo y mantenimiento de tablas, vistas, procedimientos almacenados y funciones en SQL Server para aplicaciones internas.',
N'Participé en proyectos de contratación, nómina, indicadores, formularios y gestión de usuarios. Rediseñé la base de datos de contratación, mejorando tiempos y reduciendo inconsistencias.',
1),
(1, 'Gestor Administrativo de Ventas', 'INDUMA SAS', '2020-09-01', '2022-10-01',
N'Elaboración y análisis de informes, mejora de procesos, apoyo al equipo comercial y gestión de calidad.',
N'Automatización de informes con Power Query y Power Pivot, implementación de Power BI, definición de métricas y auditorías ISO.',
2),
(1, 'Practicante gestión organizacional', 'CONFA', '2019-12-01', '2020-08-01',
N'Análisis de cargas laborales y desarrollo de propuesta de modelo de selección para automatizar etapas del proceso.',
N'Optimización de asignación de recursos y automatización de contratación.',
3);


/*=====================================
Crear y poblar tbEducation
=======================================*/

DROP TABLE IF EXISTS dbo.tbEducation;
CREATE TABLE dbo.tbEducation (
    Id INT IDENTITY(1,1) CONSTRAINT pkEducation PRIMARY KEY,
    IdAbout INT NOT NULL FOREIGN KEY REFERENCES dbo.tbAbout(Id),
    Institution NVARCHAR(200) NOT NULL,
    Degree NVARCHAR(200) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    Description NVARCHAR(MAX) NULL,
    OrderIndex INT NOT NULL,
    CreateDate DATETIME DEFAULT GETDATE()
);

INSERT INTO dbo.tbEducation (IdAbout, Institution, Degree, StartDate, EndDate, Description, OrderIndex)
VALUES
(1, 'Structuralia - Universidad Isabel I', 'Máster en Business Intelligence y Big Data', '2022-07-01', '2023-08-01', NULL, 1),
(1, 'Universidad Nacional de Colombia', 'Ingeniería Industrial', '2015-08-01', '2020-08-01', N'Becado por alto rendimiento académico.', 2);

/*=====================================
Crear y poblar tbComplementaryEducation
=======================================*/

DROP TABLE IF EXISTS dbo.tbComplementaryEducation;
CREATE TABLE dbo.tbComplementaryEducation (
    Id INT IDENTITY(1,1) CONSTRAINT pkComplementaryEducation PRIMARY KEY,
    IdAbout INT NOT NULL FOREIGN KEY REFERENCES dbo.tbAbout(Id),
    CourseName NVARCHAR(200) NOT NULL,
    Institution NVARCHAR(200) NOT NULL,
    IssueDate DATE NOT NULL,
    CredentialUrl NVARCHAR(300) NULL,
    OrderIndex INT NOT NULL,
    CreateDate DATETIME DEFAULT GETDATE()
);

DECLARE @AboutId INT = 1;

INSERT INTO dbo.tbComplementaryEducation
(IdAbout, CourseName, Institution, IssueDate, CredentialUrl, OrderIndex)
VALUES
-- 1
(@AboutId,
 N'Programa Especializado: Web Applications for Everybody',
 N'Coursera | University of Michigan',
 '2023-10-01',
 'https://coursera.org/share/065acd6f38f635dadd3431e427dfa736',
 1),

-- 2
(@AboutId,
 N'Auditor interno en sistemas integrados de gestión ISO 9001:2015 - ISO 14001:2015 - OHSAS 18001 / ISO 45001:2018',
 N'Colmena Seguros',
 '2022-06-01',
 NULL,
 2),

-- 3
(@AboutId,
 N'Programa Especializado: Excel Skills for Data Analytics and Visualization',
 N'Coursera | Macquarie University',
 '2022-05-01',
 'https://coursera.org/share/fcdb2be11a182f5e1555d1ca785d43a4',
 3),

-- 4
(@AboutId,
 N'Formación de auditores en ISO 9001-2015 e ISO 19011-2018',
 N'GlobalCyO Consultoría y Outsourcing',
 '2021-05-01',
 NULL,
 4),

-- 5
(@AboutId,
 N'Programa Especializado: Python for Everybody',
 N'Coursera | University of Michigan',
 '2020-08-01',
 'https://coursera.org/share/8cf0dfeb1f50afb2ea3c7a323c7c4aa4',
 5),

-- 6
(@AboutId,
 N'Programa Especializado: Full-Stack Web Development with React',
 N'Coursera | The Hong Kong University of Science and Technology',
 '2020-08-01',
 'https://coursera.org/share/87920b066ef15faafbfd66d2c56f20f4',
 6),

-- 7
(@AboutId,
 N'Excel aplicado a los negocios (Nivel Avanzado)',
 N'Coursera | Universidad Austral',
 '2020-07-01',
 'https://coursera.org/share/80d23e9131fa2f9ece406e1aed3c01c7',
 7),

-- 8
(@AboutId,
 N'R Programming',
 N'Coursera | The Johns Hopkins University',
 '2020-06-01',
 'https://coursera.org/share/fad64a2bc618d16a60677be04386a6f8',
 8),

-- 9
(@AboutId,
 N'Interactivity with JavaScript',
 N'Coursera | University of Michigan',
 '2020-05-01',
 'https://coursera.org/share/baf89e373ed032b0ead6aa436fc6b6ad',
 9),

-- 10
(@AboutId,
 N'Introducción al Desarrollo Web I y II',
 N'Google Actívate',
 '2020-04-01',
 NULL,
 10),

-- 11
(@AboutId,
 N'Microsoft Office Specialist for Microsoft Office Excel® 2016 - Código identificación: "wLeUu - Hahh"',
 N'Microsoft',
 '2019-12-01',
 'https://www.certiport.com/portal/pages/credentialverification.aspx',
 11);
