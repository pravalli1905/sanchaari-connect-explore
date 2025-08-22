-- Fix critical security vulnerability in partner_profiles table
-- Replace overly permissive RLS policy with secure partner-only access

-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Partners can manage their own profile" ON public.partner_profiles;

-- Create secure policy that only allows partners to access their own profile data
CREATE POLICY "Partners can manage their own profile only" 
ON public.partner_profiles 
FOR ALL 
USING (auth.uid() = partner_id)
WITH CHECK (auth.uid() = partner_id);

-- Additional policy for viewing own profile (more explicit)
CREATE POLICY "Partners can view their own profile" 
ON public.partner_profiles 
FOR SELECT 
USING (auth.uid() = partner_id);

-- Policy for updating own profile
CREATE POLICY "Partners can update their own profile" 
ON public.partner_profiles 
FOR UPDATE 
USING (auth.uid() = partner_id)
WITH CHECK (auth.uid() = partner_id);

-- Policy for inserting own profile
CREATE POLICY "Partners can insert their own profile" 
ON public.partner_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = partner_id);