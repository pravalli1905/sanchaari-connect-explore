-- Fix critical security vulnerability in admin_profiles table
-- Replace overly permissive RLS policy with secure ones

-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Admins can view all admin profiles" ON public.admin_profiles;

-- Create secure policies that only allow admins to view their own profile
-- except for super admins who can view all profiles for management purposes
CREATE POLICY "Admins can view their own profile" 
ON public.admin_profiles 
FOR SELECT 
USING (
  -- User can view their own profile
  user_id = auth.uid() 
  OR 
  -- Super admins can view all profiles
  EXISTS (
    SELECT 1 
    FROM public.admin_profiles ap 
    WHERE ap.user_id = auth.uid() 
    AND ap.role = 'super_admin' 
    AND ap.is_active = true
  )
);

-- Keep existing super admin management policy but make it more explicit
DROP POLICY IF EXISTS "Super admins can manage admin profiles" ON public.admin_profiles;

CREATE POLICY "Super admins can manage all admin profiles" 
ON public.admin_profiles 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 
    FROM public.admin_profiles ap 
    WHERE ap.user_id = auth.uid() 
    AND ap.role = 'super_admin' 
    AND ap.is_active = true
  )
);

-- Allow admins to update their own profile (but not sensitive fields like role/permissions)
CREATE POLICY "Admins can update their own non-sensitive profile data" 
ON public.admin_profiles 
FOR UPDATE 
USING (user_id = auth.uid())
WITH CHECK (
  user_id = auth.uid() 
  AND 
  -- Prevent admins from modifying their own role, permissions, or is_active status
  -- These can only be changed by super admins
  (
    role = (SELECT role FROM public.admin_profiles WHERE user_id = auth.uid()) 
    AND 
    permissions = (SELECT permissions FROM public.admin_profiles WHERE user_id = auth.uid())
    AND 
    is_active = (SELECT is_active FROM public.admin_profiles WHERE user_id = auth.uid())
  )
);