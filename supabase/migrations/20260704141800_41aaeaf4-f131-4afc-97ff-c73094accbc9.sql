
-- Donors
CREATE TABLE public.donors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  password text NOT NULL,
  phone text NOT NULL,
  gender text NOT NULL,
  age int NOT NULL,
  blood_group text NOT NULL,
  area text NOT NULL,
  address text,
  donations int NOT NULL DEFAULT 0,
  available boolean NOT NULL DEFAULT true,
  last_donation date,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.donors TO anon, authenticated;
GRANT ALL ON public.donors TO service_role;
ALTER TABLE public.donors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read donors" ON public.donors FOR SELECT USING (true);
CREATE POLICY "Anyone can register" ON public.donors FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update donor" ON public.donors FOR UPDATE USING (true) WITH CHECK (true);

-- Recipients
CREATE TABLE public.recipients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  password text NOT NULL,
  phone text NOT NULL,
  blood_group text NOT NULL,
  area text NOT NULL,
  hospital text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.recipients TO anon, authenticated;
GRANT ALL ON public.recipients TO service_role;
ALTER TABLE public.recipients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read recipients" ON public.recipients FOR SELECT USING (true);
CREATE POLICY "Anyone can register recipient" ON public.recipients FOR INSERT WITH CHECK (true);

-- Hospitals
CREATE TABLE public.hospitals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  type text NOT NULL,
  address text NOT NULL,
  phone text NOT NULL,
  stock jsonb NOT NULL DEFAULT '{}'::jsonb
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hospitals TO anon, authenticated;
GRANT ALL ON public.hospitals TO service_role;
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read hospitals" ON public.hospitals FOR SELECT USING (true);
CREATE POLICY "Anyone can update hospital stock" ON public.hospitals FOR UPDATE USING (true) WITH CHECK (true);

-- Blood requests
CREATE TABLE public.blood_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  blood_group text NOT NULL,
  units int NOT NULL,
  hospital text NOT NULL,
  area text NOT NULL,
  urgency text NOT NULL,
  contact text NOT NULL,
  note text,
  status text NOT NULL DEFAULT 'OPEN',
  posted_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blood_requests TO anon, authenticated;
GRANT ALL ON public.blood_requests TO service_role;
ALTER TABLE public.blood_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read requests" ON public.blood_requests FOR SELECT USING (true);
CREATE POLICY "Anyone can post request" ON public.blood_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update request" ON public.blood_requests FOR UPDATE USING (true) WITH CHECK (true);

-- Seed hospitals
INSERT INTO public.hospitals (name, type, address, phone, stock) VALUES
('Government General Hospital, Kakinada','Government','Main Road, Jagannaickpur, Kakinada 533002','+91 884 236 5555','{"A+":22,"A-":6,"B+":18,"B-":4,"AB+":9,"AB-":3,"O+":30,"O-":8}'),
('Apollo Hospitals, Kakinada','Private','Main Road, Ramaraopeta, Kakinada 533004','+91 884 233 2020','{"A+":15,"A-":4,"B+":12,"B-":3,"AB+":6,"AB-":2,"O+":20,"O-":5}'),
('Medicover Hospitals, Kakinada','Private','Jagannaickpur, Kakinada 533002','+91 884 235 7777','{"A+":12,"A-":3,"B+":10,"B-":2,"AB+":5,"AB-":1,"O+":16,"O-":4}'),
('Rangaraya Medical College Hospital','Government','Rangaraya Medical College Rd, Kakinada 533003','+91 884 236 3111','{"A+":25,"A-":7,"B+":20,"B-":5,"AB+":10,"AB-":4,"O+":28,"O-":9}'),
('KIMS Hospital, Kakinada','Private','Bhanugudi Junction, Kakinada 533003','+91 884 234 5000','{"A+":10,"A-":2,"B+":8,"B-":2,"AB+":4,"AB-":1,"O+":14,"O-":3}');

-- Seed donors
INSERT INTO public.donors (name,email,password,phone,gender,age,blood_group,area,address,donations,available,last_donation) VALUES
('Ravi Teja Kolli','ravi.teja@example.in','donor123','+91 9848012301','Male',28,'O+','Jagannaickpur','5-12-3, Jagannaickpur, Kakinada',4,true,'2026-03-10'),
('Lakshmi Priya','lakshmi.priya@example.in','donor123','+91 9848012302','Female',26,'A+','Sarpavaram','12-4-8, Sarpavaram, Kakinada',3,true,'2026-02-14'),
('Naga Sai Kiran','naga.sai@example.in','donor123','+91 9848012303','Male',31,'B+','Rama Rao Peta','8-3-15, Ramaraopeta, Kakinada',6,true,'2026-01-22'),
('Sravani Devi','sravani.devi@example.in','donor123','+91 9848012304','Female',24,'O-','Bhanugudi Junction','2-1-9, Bhanugudi Junction, Kakinada',2,false,'2026-05-01'),
('Praveen Kumar','praveen.k@example.in','donor123','+91 9848012305','Male',35,'AB+','Gandhi Nagar','7-8-2, Gandhi Nagar, Kakinada',8,true,'2025-12-05'),
('Anitha Rani','anitha.r@example.in','donor123','+91 9848012306','Female',29,'A-','Suryaraopeta','4-6-11, Suryaraopeta, Kakinada',3,true,'2026-04-18'),
('Harish Chandra','harish.c@example.in','donor123','+91 9848012307','Male',33,'B-','Vakalapudi','9-2-4, Vakalapudi, Kakinada',5,true,'2026-03-30'),
('Divya Sree','divya.s@example.in','donor123','+91 9848012308','Female',27,'O+','Turangi','1-5-6, Turangi, Kakinada',4,true,'2026-02-27'),
('Vamsi Krishna','vamsi.k@example.in','donor123','+91 9848012309','Male',30,'AB-','Indrapalem','3-9-14, Indrapalem, Kakinada',2,true,'2026-01-08'),
('Meghana Reddy','meghana.r@example.in','donor123','+91 9848012310','Female',25,'A+','Sambamurthy Nagar','6-7-3, Sambamurthy Nagar, Kakinada',3,true,'2026-04-02'),
('Srinivas Rao','srinivas.rao@example.in','donor123','+91 9848012311','Male',40,'B+','Ashok Nagar','2-4-10, Ashok Nagar, Kakinada',9,true,'2026-03-15'),
('Bhavana Sastry','bhavana.s@example.in','donor123','+91 9848012312','Female',22,'O+','Ramanayyapeta','8-1-2, Ramanayyapeta, Kakinada',1,true,'2026-04-25'),
('Karthik Naidu','karthik.n@example.in','donor123','+91 9848012313','Male',29,'A+','Jagannaickpur','11-2-6, Jagannaickpur, Kakinada',5,true,'2026-02-08'),
('Padmavathi Devi','padma.devi@example.in','donor123','+91 9848012314','Female',34,'B-','Sarpavaram','3-3-1, Sarpavaram, Kakinada',7,false,'2026-05-10'),
('Chaitanya Varma','chaitanya.v@example.in','donor123','+91 9848012315','Male',26,'O-','Vakalapudi','5-9-8, Vakalapudi, Kakinada',3,true,'2026-01-30');

-- Seed requests
INSERT INTO public.blood_requests (patient_name,blood_group,units,hospital,area,urgency,contact,note,status) VALUES
('Rajesh Varma','O-',2,'Government General Hospital, Kakinada','Jagannaickpur','Critical','+91 98480 99101','Surgery scheduled tonight','OPEN'),
('Sunitha Devi','A+',1,'Apollo Hospitals, Kakinada','Rama Rao Peta','High','+91 98480 99102','Maternity case','OPEN'),
('Kiran Kumar','B+',3,'Rangaraya Medical College Hospital','Sambamurthy Nagar','Moderate','+91 98480 99103','Thalassemia patient','OPEN');
