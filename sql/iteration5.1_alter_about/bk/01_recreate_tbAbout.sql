USE PortfolioDB
GO


DROP TABLE IF EXISTS dbo.tbContactInfo;

CREATE TABLE dbo.tbContactInfo (
    Id         INT IDENTITY(1,1) PRIMARY KEY,
    InfoLabel  NVARCHAR(50) NOT NULL,      -- 'Email', 'LinkedIn', 'GitHub', etc.
    InfoValue  NVARCHAR(200) NOT NULL,
    Icon       NVARCHAR(50)  NULL,         -- 'mail', 'linkedin', 'github', etc.
    OrderIndex INT NOT NULL
);

INSERT INTO dbo.tbContactInfo (InfoLabel, InfoValue, Icon, OrderIndex) VALUES
('Email',    'felipegarcia0626@gmail.com', 'mail',     1),
('Phone', '+57 3117045507', 'phone', 2),
('LinkedIn', 'https://www.linkedin.com/in/luis-felipe-garcia-sql-excel-powerbi-data/', 'linkedin', 3),
('GitHub',   'https://github.com/felipegarcia0626', 'github', 4);

DROP TABLE IF EXISTS dbo.tbAbout;

CREATE TABLE dbo.tbAbout (
    Id               INT IDENTITY(1,1) CONSTRAINT pkAbout PRIMARY KEY,
    PortfolioName    NVARCHAR(150) NOT NULL,
    City             NVARCHAR(100) NULL,
    IdContactInfo INT,			 
    ProfileDescription NVARCHAR(MAX) NULL,
    HardSkills       NVARCHAR(MAX) NULL,
    SoftSkills       NVARCHAR(MAX) NULL,
    Achievements     NVARCHAR(MAX) NULL,
    CvUrl            NVARCHAR(250) NULL,
    CreateDate       DATETIME DEFAULT GETDATE()
);

ALTER TABLE dbo.tbAbout ADD CONSTRAINT fkAboutContactInfo FOREIGN KEY (IdContactInfo)
REFERENCES dbo.tbContactInfo (Id)