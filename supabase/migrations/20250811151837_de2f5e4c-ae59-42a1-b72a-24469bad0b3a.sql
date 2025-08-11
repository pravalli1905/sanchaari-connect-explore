-- Create real services data to replace mock partner services
INSERT INTO services (partner_id, name, service_type, description, pricing, availability, status) VALUES
(gen_random_uuid(), 'Goa Beach Resort', 'accommodation', 'Luxurious beachfront resort with panoramic ocean views', '{"base_price": 8500, "currency": "INR", "per": "night"}', '{"seasons": ["winter", "summer"], "capacity": 4}', 'active'),
(gen_random_uuid(), 'Kerala Backwater Cruise', 'transport', 'Traditional houseboat experience through serene backwaters', '{"base_price": 12000, "currency": "INR", "per": "day"}', '{"seasons": ["all"], "capacity": 8}', 'active'),
(gen_random_uuid(), 'Rajasthan Desert Safari', 'activity', 'Camel safari with cultural performances and desert camping', '{"base_price": 5500, "currency": "INR", "per": "person"}', '{"seasons": ["winter"], "capacity": 20}', 'active'),
(gen_random_uuid(), 'Mumbai Food Tour', 'activity', 'Guided street food tour covering iconic Mumbai delicacies', '{"base_price": 2500, "currency": "INR", "per": "person"}', '{"seasons": ["all"], "capacity": 15}', 'active'),
(gen_random_uuid(), 'Manali Adventure Package', 'accommodation', 'Mountain resort with trekking and adventure activities', '{"base_price": 6500, "currency": "INR", "per": "night"}', '{"seasons": ["summer"], "capacity": 6}', 'active'),
(gen_random_uuid(), 'Delhi Cultural Walk', 'activity', 'Historical monuments and cultural heritage tour', '{"base_price": 1800, "currency": "INR", "per": "person"}', '{"seasons": ["all"], "capacity": 25}', 'active');

-- Create sample flight data
CREATE TABLE IF NOT EXISTS flights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  airline TEXT NOT NULL,
  flight_number TEXT NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  departure_time TIME NOT NULL,
  arrival_time TIME NOT NULL,
  duration TEXT NOT NULL,
  stops INTEGER DEFAULT 0,
  price NUMERIC NOT NULL,
  available_seats INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE flights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view flights" 
ON flights 
FOR SELECT 
USING (true);

INSERT INTO flights (airline, flight_number, origin, destination, departure_time, arrival_time, duration, stops, price, available_seats) VALUES
('Air India', 'AI-101', 'Delhi', 'Goa', '06:30', '08:45', '2h 15m', 0, 8500, 45),
('IndiGo', '6E-234', 'Mumbai', 'Bangalore', '14:20', '16:05', '1h 45m', 0, 6200, 78),
('SpiceJet', 'SG-567', 'Delhi', 'Kerala', '09:15', '12:30', '3h 15m', 1, 7800, 32),
('Vistara', 'UK-890', 'Chennai', 'Kolkata', '18:45', '21:10', '2h 25m', 0, 9200, 56),
('Air India', 'AI-432', 'Mumbai', 'Goa', '11:30', '12:45', '1h 15m', 0, 5500, 89),
('IndiGo', '6E-789', 'Bangalore', 'Delhi', '16:00', '19:15', '3h 15m', 0, 8900, 23);

-- Create sample hotel data
CREATE TABLE IF NOT EXISTS hotels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 4.0,
  amenities TEXT[] DEFAULT '{}',
  price_per_night NUMERIC NOT NULL,
  available_rooms INTEGER DEFAULT 10,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view hotels" 
ON hotels 
FOR SELECT 
USING (true);

INSERT INTO hotels (name, location, rating, amenities, price_per_night, available_rooms, image_url) VALUES
('Ocean Paradise Resort', 'Goa', 4.5, '{"Beach Access", "Pool", "Spa", "Restaurant"}', 8500, 12, 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop'),
('Mountain View Lodge', 'Manali', 4.2, '{"Mountain View", "Fireplace", "Garden", "Restaurant"}', 6500, 8, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'),
('Backwater Bliss Resort', 'Kerala', 4.7, '{"Backwater View", "Ayurveda Spa", "Pool", "Boat Rides"}', 9200, 6, 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=300&fit=crop'),
('Heritage Palace Hotel', 'Rajasthan', 4.8, '{"Heritage Architecture", "Cultural Shows", "Rooftop Restaurant", "Garden"}', 12000, 4, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop'),
('Business Suites Mumbai', 'Mumbai', 4.1, '{"Business Center", "Gym", "Restaurant", "Airport Shuttle"}', 7800, 15, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop');

-- Create sample activities data
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  duration TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 4.0,
  price NUMERIC NOT NULL,
  capacity INTEGER DEFAULT 20,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view activities" 
ON activities 
FOR SELECT 
USING (true);

INSERT INTO activities (name, location, duration, rating, price, capacity, description, image_url) VALUES
('Scuba Diving Experience', 'Goa', '4 hours', 4.6, 3500, 8, 'Explore the underwater world with certified instructors', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop'),
('Trekking to Rohtang Pass', 'Manali', '8 hours', 4.4, 2500, 15, 'Adventure trek through scenic mountain paths', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'),
('Houseboat Cruise', 'Kerala', '6 hours', 4.8, 4200, 12, 'Peaceful cruise through pristine backwaters', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop'),
('Camel Safari', 'Rajasthan', '5 hours', 4.3, 2800, 20, 'Desert adventure with cultural performances', 'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=400&h=300&fit=crop'),
('Street Food Tour', 'Mumbai', '3 hours', 4.7, 1500, 25, 'Taste authentic Mumbai street food delicacies', 'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?w=400&h=300&fit=crop'),
('Yoga & Meditation Retreat', 'Kerala', '2 hours', 4.5, 1200, 15, 'Rejuvenating yoga session in serene surroundings', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop');