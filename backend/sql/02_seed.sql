USE kakinada_bloodlink;

-- Admin (password: admin123, bcrypt)
INSERT INTO admins (email, password, name) VALUES
('admin@kakinadabloodlink.in','$2a$10$Dow1B0DkA5Zc0LrH2pM3P.Uc9WgQoLQjXH2b8h8mQ3g0jI0Yy6uCa','KBL Admin');

-- Hospitals in Kakinada
INSERT INTO hospitals (name, type, address, phone,
  stock_a_pos, stock_a_neg, stock_b_pos, stock_b_neg,
  stock_ab_pos, stock_ab_neg, stock_o_pos, stock_o_neg) VALUES
('Government General Hospital (GGH) Kakinada','Government','Main Road, Jagannaickpur, Kakinada, 533002','+91 884 236 5555', 22, 6, 18, 4, 9, 3, 30, 8),
('Apollo Hospitals Kakinada','Private','Main Road, Ramaraopeta, Kakinada, 533004','+91 884 233 2020', 15, 4, 12, 3, 6, 2, 20, 5),
('Medicover Hospitals Kakinada','Private','Jagannaickpur, Kakinada, 533002','+91 884 235 7777', 12, 3, 10, 2, 5, 1, 16, 4),
('Rangaraya Medical College Hospital','Government','Rangaraya Medical College Rd, Kakinada, 533003','+91 884 236 3111', 25, 7, 20, 5, 10, 4, 28, 9),
('KIMS Hospital Kakinada','Private','Bhanugudi Junction, Kakinada, 533003','+91 884 234 5000', 10, 2, 8, 2, 4, 1, 14, 3);

-- Sample donors (password for all: donor123, bcrypt)
INSERT INTO donors (name,email,password,phone,gender,age,blood_group,area,address,donations,available,last_donation) VALUES
('Ravi Teja Kolli','ravi.teja@example.in','$2a$10$V8k2z1WQm9J4b7f5X0k8ROq7QeI0mHqE1qm8Q1s4Yb1uJ6a2Kf1zK','+91 9848012301','Male',28,'O+','Jagannaickpur','5-12-3, Jagannaickpur, Kakinada',4,TRUE,'2026-03-10'),
('Lakshmi Priya','lakshmi.priya@example.in','$2a$10$V8k2z1WQm9J4b7f5X0k8ROq7QeI0mHqE1qm8Q1s4Yb1uJ6a2Kf1zK','+91 9848012302','Female',26,'A+','Sarpavaram','12-4-8, Sarpavaram, Kakinada',3,TRUE,'2026-02-14'),
('Naga Sai Kiran','naga.sai@example.in','$2a$10$V8k2z1WQm9J4b7f5X0k8ROq7QeI0mHqE1qm8Q1s4Yb1uJ6a2Kf1zK','+91 9848012303','Male',31,'B+','Ramaraopeta','8-3-15, Ramaraopeta, Kakinada',6,TRUE,'2026-01-22'),
('Sravani Devi','sravani.devi@example.in','$2a$10$V8k2z1WQm9J4b7f5X0k8ROq7QeI0mHqE1qm8Q1s4Yb1uJ6a2Kf1zK','+91 9848012304','Female',24,'O-','Bhanugudi','2-1-9, Bhanugudi Junction, Kakinada',2,FALSE,'2026-05-01'),
('Praveen Kumar','praveen.k@example.in','$2a$10$V8k2z1WQm9J4b7f5X0k8ROq7QeI0mHqE1qm8Q1s4Yb1uJ6a2Kf1zK','+91 9848012305','Male',35,'AB+','Gandhi Nagar','7-8-2, Gandhi Nagar, Kakinada',8,TRUE,'2025-12-05'),
('Anitha Rani','anitha.r@example.in','$2a$10$V8k2z1WQm9J4b7f5X0k8ROq7QeI0mHqE1qm8Q1s4Yb1uJ6a2Kf1zK','+91 9848012306','Female',29,'A-','Suryaraopeta','4-6-11, Suryaraopeta, Kakinada',3,TRUE,'2026-04-18'),
('Harish Chandra','harish.c@example.in','$2a$10$V8k2z1WQm9J4b7f5X0k8ROq7QeI0mHqE1qm8Q1s4Yb1uJ6a2Kf1zK','+91 9848012307','Male',33,'B-','Vakalapudi','9-2-4, Vakalapudi, Kakinada',5,TRUE,'2026-03-30'),
('Divya Sree','divya.s@example.in','$2a$10$V8k2z1WQm9J4b7f5X0k8ROq7QeI0mHqE1qm8Q1s4Yb1uJ6a2Kf1zK','+91 9848012308','Female',27,'O+','Turangi','1-5-6, Turangi, Kakinada',4,TRUE,'2026-02-27'),
('Vamsi Krishna','vamsi.k@example.in','$2a$10$V8k2z1WQm9J4b7f5X0k8ROq7QeI0mHqE1qm8Q1s4Yb1uJ6a2Kf1zK','+91 9848012309','Male',30,'AB-','Indrapalem','3-9-14, Indrapalem, Kakinada',2,TRUE,'2026-01-08'),
('Meghana Reddy','meghana.r@example.in','$2a$10$V8k2z1WQm9J4b7f5X0k8ROq7QeI0mHqE1qm8Q1s4Yb1uJ6a2Kf1zK','+91 9848012310','Female',25,'A+','Kakinada Port Area','6-7-3, Port Area, Kakinada',3,TRUE,'2026-04-02');

-- Sample recipients (password: user123, bcrypt)
INSERT INTO recipients (name,email,password,phone,blood_group,area,hospital) VALUES
('Suresh Babu','suresh.b@example.in','$2a$10$C3z1JmYQ6d8b1H2t3l4Z9uJ8xR9tYqR9M3W5f0G8kQ2eG2S5s.mCe','+91 9440011122','B+','Ramaraopeta','Apollo Hospitals Kakinada'),
('Padma Latha','padma.l@example.in','$2a$10$C3z1JmYQ6d8b1H2t3l4Z9uJ8xR9tYqR9M3W5f0G8kQ2eG2S5s.mCe','+91 9440011133','O-','Jagannaickpur','Government General Hospital (GGH) Kakinada');

-- Sample blood requests
INSERT INTO blood_requests (patient_name,blood_group,units,hospital,area,urgency,contact,note,status) VALUES
('Rajesh Varma','O-',2,'Government General Hospital (GGH) Kakinada','Jagannaickpur','Critical','+91 9848099101','Surgery scheduled tonight','OPEN'),
('Sunitha Devi','A+',1,'Apollo Hospitals Kakinada','Ramaraopeta','High','+91 9848099102','Maternity case','OPEN'),
('Kiran Kumar','B+',3,'Rangaraya Medical College Hospital','Kakinada','Moderate','+91 9848099103','Thalassemia patient','OPEN');

-- Donation logs
INSERT INTO donations_log (donor_id, hospital, units, donated_on) VALUES
(1,'Government General Hospital (GGH) Kakinada',1,'2026-03-10'),
(2,'Apollo Hospitals Kakinada',1,'2026-02-14'),
(3,'Medicover Hospitals Kakinada',1,'2026-01-22'),
(5,'Rangaraya Medical College Hospital',1,'2025-12-05');
