
-- MyCVTop SQL schema + seed (MySQL 8+)
-- DB: digicard_mct3

CREATE TABLE IF NOT EXISTS `User` (
  `id` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `passwordHash` varchar(191) NOT NULL,
  `rolesJson` JSON NOT NULL DEFAULT (JSON_ARRAY()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `Cv` (
  `id` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `userId` varchar(191) NOT NULL,
  `personal` JSON,
  `skills` JSON,
  `languages` JSON,
  `experiences` JSON,
  `education` JSON,
  `projects` JSON,
  `template` varchar(50) NOT NULL DEFAULT 'modern',
  `themeColor` varchar(20) NOT NULL DEFAULT '#2563eb',
  PRIMARY KEY (`id`),
  KEY `Cv_userId_idx` (`userId`),
  CONSTRAINT `Cv_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed users
INSERT INTO `User` (`id`,`name`,`email`,`passwordHash`,`rolesJson`)
VALUES
  ('usr_admin_1','Admin Tester','admin@mycvtop.com','$2b$10$KHC4cOPw4N47eQtYG4.U/e2YXktOK9Ny5nTWhe1Y2xSDoiX/65bRC',JSON_ARRAY('user','admin')),
  ('usr_demo_1','Demo User','demo@mycvtop.com','$2b$10$IsB0LWpCVnReboCb0CUp7O5C4asKst87KQTDQrkft7EqBkLPKKlmS',JSON_ARRAY('user'))
ON DUPLICATE KEY UPDATE email=VALUES(email);

-- Seed one demo CV
INSERT INTO `Cv` (`id`,`userId`,`personal`,`skills`,`languages`,`experiences`,`education`,`projects`,`template`,`themeColor`)
VALUES
  ('cv_demo_1','usr_demo_1',
   JSON_OBJECT('fullName','Yassin Brahim','title','Contrôleur de gestion','email','yassin@example.com','phone','+212 6 12 34 56 78','location','Oujda, Maroc','summary','Contrôleur de gestion orienté résultats, passionné par la digitalisation (PHP/React) et l’optimisation des process.'),
   JSON_ARRAY('Gestion budgétaire','SQL','PHP','React','Excel avancé'),
   JSON_ARRAY('Arabe','Français','Anglais'),
   JSON_ARRAY(JSON_OBJECT('title','Contrôleur de gestion','company','Enabel','startDate','2023','endDate','Présent','description','Suivi des dépenses, tableaux de bord, automatisation.')),
   JSON_ARRAY(JSON_OBJECT('degree','Master Finance','school','Université Mohammed I','startDate','2019','endDate','2021','description','Contrôle de gestion et audit.')),
   JSON_ARRAY(JSON_OBJECT('name','DigiCard+','link','https://digicardplus.com','description','Cartes de visite numériques & CRM partenaires.')),
   'modern','#2563eb')
ON DUPLICATE KEY UPDATE template='modern';
