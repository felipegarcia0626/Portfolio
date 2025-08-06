USE PortfolioDB
GO

CREATE TABLE tbContactInfo (
	Id INT IDENTITY(1,1) CONSTRAINT pkContactInfo PRIMARY KEY ,
	InfoLabel NVARCHAR(100) NOT NULL, -- Ej: "Email", "LinkedIn"
    InfoValue NVARCHAR(300) NOT NULL, -- Ej: "contacto@ejemplo.com"
    Icon NVARCHAR(100) NULL,          -- (opcional) nombre del ícono
    OrderIndex INT NOT NULL DEFAULT 0
);