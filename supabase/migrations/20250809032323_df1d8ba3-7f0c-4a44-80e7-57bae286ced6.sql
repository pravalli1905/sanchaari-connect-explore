-- Create admin_profiles table for admin users
CREATE TABLE public.admin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  permissions TEXT[] NOT NULL DEFAULT '{}',
  department TEXT DEFAULT 'Operations',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can view all admin profiles" 
ON public.admin_profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Super admins can manage admin profiles" 
ON public.admin_profiles 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles ap 
    WHERE ap.user_id = auth.uid() AND ap.role = 'super_admin'
  )
);

-- Insert demo admin account
INSERT INTO public.admin_profiles (
  user_id, 
  email, 
  password_hash, 
  role, 
  permissions,
  department
) VALUES (
  gen_random_uuid(),
  'joshtadi3@gmail.com',
  crypt('adminpassword123', gen_salt('bf')),
  'super_admin',
  ARRAY['users.read', 'users.write', 'groups.read', 'groups.write', 'bookings.read', 'bookings.write', 'partners.read', 'partners.write', 'admin.manage'],
  'Administration'
);

-- Create function to authenticate admin
CREATE OR REPLACE FUNCTION public.authenticate_admin(email_input TEXT, password_input TEXT)
RETURNS TABLE(admin_data JSON)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  admin_record public.admin_profiles;
BEGIN
  SELECT * INTO admin_record
  FROM public.admin_profiles
  WHERE email = email_input 
    AND password_hash = crypt(password_input, password_hash)
    AND is_active = true;
    
  IF admin_record.id IS NOT NULL THEN
    RETURN QUERY SELECT json_build_object(
      'id', admin_record.id,
      'user_id', admin_record.user_id,
      'email', admin_record.email,
      'role', admin_record.role,
      'permissions', admin_record.permissions,
      'department', admin_record.department,
      'created_at', admin_record.created_at,
      'updated_at', admin_record.updated_at
    );
  ELSE
    RETURN QUERY SELECT NULL::JSON;
  END IF;
END;
$$;

-- Create trigger for updated_at
CREATE TRIGGER update_admin_profiles_updated_at
BEFORE UPDATE ON public.admin_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();