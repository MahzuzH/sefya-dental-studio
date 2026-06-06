DROP TABLE IF EXISTS `qr_tokens`;
DROP TABLE IF EXISTS `odontogram_entries`;
DROP TABLE IF EXISTS `checkup_images`;
DROP TABLE IF EXISTS `checkups`;
DROP TABLE IF EXISTS `image_types`;
DROP TABLE IF EXISTS `patients`;
DROP TABLE IF EXISTS `partner_institutions`;
DROP TABLE IF EXISTS `dental_conditions`;
DROP TABLE IF EXISTS `dentists`;
DROP TABLE IF EXISTS `clinics`;

CREATE TABLE `clinics` (
  `id` char(36) NOT NULL,
  `name` varchar(150) NOT NULL,
  `address` text,
  `phone` varchar(30) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `logo_url` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `dentists` (
  `id` char(36) NOT NULL,
  `clinic_id` char(36) NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `license_number` varchar(80) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `password_hash` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_dentist_email` (`email`),
  KEY `idx_dentist_clinic` (`clinic_id`),
  CONSTRAINT `fk_dentist_clinic` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `dental_conditions` (
  `id` char(36) NOT NULL,
  `name` varchar(150) NOT NULL,
  `color_code` varchar(10) DEFAULT NULL,
  `symptoms` text,
  `treatment_recommendation` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_condition_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `partner_institutions` (
  `id` char(36) NOT NULL,
  `clinic_id` char(36) NOT NULL,
  `name` varchar(200) NOT NULL,
  `type` varchar(80) DEFAULT NULL,
  `address` text,
  `contact_email` varchar(150) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_pi_clinic` (`clinic_id`),
  CONSTRAINT `fk_pi_clinic` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `patients` (
  `id` char(36) NOT NULL,
  `institution_id` char(36) NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `student_id` varchar(50) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `age` smallint DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `address` text,
  `phone` varchar(30) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_patient_nis` (`institution_id`,`student_id`),
  KEY `idx_patient_institution` (`institution_id`),
  KEY `idx_patient_student_id` (`student_id`),
  CONSTRAINT `fk_patient_institution` FOREIGN KEY (`institution_id`) REFERENCES `partner_institutions` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `image_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `checkups` (
  `id` char(36) NOT NULL,
  `patient_id` char(36) NOT NULL,
  `dentist_id` char(36) NOT NULL,
  `checkup_date` date NOT NULL,
  `general_notes` text,
  `status` varchar(30) NOT NULL DEFAULT 'completed',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_checkup_patient` (`patient_id`),
  KEY `idx_checkup_dentist` (`dentist_id`),
  KEY `idx_checkup_date` (`checkup_date`),
  CONSTRAINT `fk_checkup_dentist` FOREIGN KEY (`dentist_id`) REFERENCES `dentists` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_checkup_patient` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `checkup_images` (
  `id` char(36) NOT NULL,
  `checkup_id` char(36) NOT NULL,
  `image_type_id` int NOT NULL,
  `image_path` varchar(500) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_checkup_image_type` (`checkup_id`,`image_type_id`),
  KEY `fk_image_type` (`image_type_id`),
  CONSTRAINT `fk_checkup` FOREIGN KEY (`checkup_id`) REFERENCES `checkups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_image_type` FOREIGN KEY (`image_type_id`) REFERENCES `image_types` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `odontogram_entries` (
  `id` char(36) NOT NULL,
  `checkup_id` char(36) NOT NULL,
  `tooth_number` smallint NOT NULL,
  `tooth_surface` varchar(20) DEFAULT NULL,
  `condition_id` char(36) NOT NULL,
  `notes` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_tooth_entry` (`checkup_id`,`tooth_number`,`tooth_surface`,`condition_id`),
  KEY `idx_oe_checkup` (`checkup_id`),
  KEY `idx_oe_tooth` (`tooth_number`),
  KEY `fk_oe_condition` (`condition_id`),
  CONSTRAINT `fk_oe_checkup` FOREIGN KEY (`checkup_id`) REFERENCES `checkups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_oe_condition` FOREIGN KEY (`condition_id`) REFERENCES `dental_conditions` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `qr_tokens` (
  `id` char(36) NOT NULL,
  `checkup_id` char(36) NOT NULL,
  `token` varchar(64) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_token` (`token`),
  KEY `idx_qt_checkup` (`checkup_id`),
  CONSTRAINT `fk_qt_checkup` FOREIGN KEY (`checkup_id`) REFERENCES `checkups` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `dental_conditions` (`id`, `name`, `color_code`, `symptoms`, `treatment_recommendation`, `created_at`) VALUES
('1fe47b17-a270-4c64-aef0-f7d414615f1c','Sisa Akar Gigi','#BA7517','Sisa akar gigi adalah bagian akar yang tertinggal di gusi akibat patah, karies parah, atau pencabutan tidak sempurna. ','Rekomendasi perawatan untuk gigi sisa akar adalah pencabutan karena berisiko memicu infeksi, abses, nyeri, hingga kista yang merusak tulang rahang. ','2026-03-24 17:40:24'),
('4256ecea-e782-4b2e-93eb-5ab7d26781d6','Restorasi Gigi','#1D9E75','Restorasi gigi adalah prosedur medis untuk mengembalikan fungsi, integritas, dan estetika gigi yang rusak akibat karies (lubang), patah, atau aus.','Rekomendasi perwatan bagi gigi yag sudah di restorasi adalah obervasi secara berkala. ','2026-03-24 17:40:24'),
('75a5e3d1-1411-4a60-957f-37369d56f286','Karies Gigi','#E24B4A','Gigi berlubang terjadi karena demineralisasi email gigi oleh asam hasil metabolisme bakteri plak terhadap sisa makanan manis/karbohidrat. Bila karies mencapai email terlihat bercak putih (tanda demineralisasi) atau noda cokelat ringan pada permukaan gigi, seringkali belum terasa sakit. Saat mencapai dentin seringkali gigi mulai terasa sensitif saat makan/minum panas, dingin, atau manis. Namun bila gigi berlubang hingga pulpa sering muncul gejala sakit gigi intens, berdenyut spontan, bahkan memicu abses (nanah) atau gigi patah.','Penanganan dibagi berdasarakan kedalaman lubang. Bila karies mencapai email perlunya fluoride treatment atau penambalan gigi untuk menghindari lubang membesar , Karies yang mencapai dentin tindakan yang utamanya adalah penambalan gigi. Bagi karies yang mencapai pulpa peawatannya meliputi perawatan saluran akar, hingga cabut gigi.\r\n','2026-03-24 17:40:24'),
('909753f2-bb77-4b93-a932-090c603b1eca','Gigi Hilang','#5F5E5A','Gigi hilang atau copot umumnya disebabkan oleh infeksi gusi parah (periodontitis), gigi berlubang parah yang merusak akar, trauma/kecelakaan, dan kebiasaan menggertakkan gigi (bruxism). ','Perawatan gigi hilang bertujuan mengembalikan fungsi kunyah dan estetika dengan beberapa opsi perawatan seperti implan gigi (permanen, menanam akar buatan), bridge/jembatan gigi (permanen, menyangga gigi tetangga), atau gigi tiruan lepasan (ekonomis, bisa dilepas pasang). ','2026-03-24 17:40:24'),
('9e97f1bd-721e-4ec5-bdf6-bec3a80b579e','Impaksi Gigi','#F0997B','Kondisi di mana gigi gagal tumbuh sempurna karena terjebak di dalam gusi atau tulang rahang, paling sering terjadi pada gigi bungsu. Kondisi ini menyebabkan nyeri, bengkak, dan risiko infeksi.','Penanganan utama adalah operasi pengambilan gigi (odontektomi) jika menimbulkan gejala dan merusak struktur gigi di sekitarnya. Namun bila gigi impaksinya tidak ada gejala perlunya observasi secara berkala.','2026-03-24 17:40:24'),
('9edf4ef5-f1f6-4a35-b2d9-843a7da983c0','Gigi Supernumerary','#7F77DD','Kondisi adanya satu atau lebih gigi tambahan melebihi jumlah normal (32 gigi permanen, 20 gigi susu), yang seringkali tumbuh di antara gigi seri (mesiodens) atau molar.','Pilihan penanganan berupa observasi yang dilakukan jika gigi tidak menyebabkan masalah fungsional atau estetika. Pencabutan gigi bila gigi tambahan mengganggu posisi gigi lain, menyebabkan infeksi, atau impaksi. Kemudian perawatan orthodonti sering diperlukan setelah pencabutan untuk merapikan susunan gigi.','2026-03-24 17:40:24'),
('b2a249d9-bda0-4b9b-ad07-5d127b92e259','Restorasi Indirect Gigi','#0F6E56','Restorasi indirect adalah prosedur perbaikan gigi yang dibuat di luar mulut (biasanya di laboratorium teknis) berdasarkan cetakan gigi pasien, lalu disemenkan pada gigi penyangga. Metode ini digunakan untuk kerusakan gigi yang luas atau membutuhkan estetika tinggi (inlay, onlay, mahkota/crown, veneer).','Rekomendasi perawatan bagi gigi yag sudah di pakaikan restorasi indirect adalah observasi secara berkala','2026-03-24 17:40:24'),
('bd03e97c-d8e7-47ae-8c8b-3d22d51f6131','Karang Gigi','#888780','Plak lengket hasil sisa makanan dan bakteri yang mengeras di permukaan gigi karena tidak dibersihkan dengan benar. Karang gigi, yang memicu bau mulut, gusi meradang/berdarah, dan warna kekuningan/hitam.','Kasus karang gigi yang meumpuk harus dibersihkan oleh dokter gigi melalui prosedur scalling atau pembersihan karang gigi menggunakan alat ultrasonik. Tindakan ini penting untuk mencegah penyakit gusi, radang, periodontitis, dan gigi goyang, serta memperbaiki kebersihan mulut.','2026-03-24 17:40:24'),
('c73263db-db2a-4e7d-b159-f304f8ec677b','Maloklusi','#D4537E','Susunan gigi tidak sesuai atau berantakan (maloklusi) adalah kondisi di mana gigi dan rahang tidak sejajar/rata, yang dapat memengaruhi fungsi kunyah, berbicara, dan estetika wajah. Penyebab utamanya meliputi faktor genetik, kebiasaan buruk, atau rahang sempit.','Rekomendasi perawatan untuk gigi yang maloklusi adalah konsultasikan ke dokter gigi spesialis ortodonti (Sp.Ort) untuk mendapatkan diagnosis dan perawatan yang tepat. Perawatan seperti kawat gigi (braces) atau aligner dapat memperbaiki kondisi ini.','2026-03-24 17:40:24');

INSERT INTO `image_types` (`id`, `name`, `created_at`) VALUES
(1,'extraoral_frontal_rest','2026-03-29 06:25:01'),
(2,'extraoral_frontal_smile','2026-03-29 06:25:01'),
(3,'extraoral_profile','2026-03-29 06:25:01'),
(4,'intraoral_right_buccal','2026-03-29 06:25:01'),
(5,'intraoral_frontal','2026-03-29 06:25:01'),
(6,'intraoral_left_buccal','2026-03-29 06:25:01'),
(7,'intraoral_maxillary_occlusal','2026-03-29 06:25:01'),
(8,'intraoral_mandibular_occlusal','2026-03-29 06:25:01');
