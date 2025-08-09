-- Fix function search path security issue for authenticate_admin
CREATE OR REPLACE FUNCTION public.authenticate_admin(email_input TEXT, password_input TEXT)
RETURNS TABLE(admin_data JSON)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- Fix function search path security issue for handle_new_user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, first_name, last_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'first_name', NEW.raw_user_meta_data->>'last_name');
  RETURN NEW;
END;
$$;

-- Fix function search path security issue for update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;