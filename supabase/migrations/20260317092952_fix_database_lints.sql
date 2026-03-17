-- Fix function search path mutable warning
ALTER FUNCTION public.handle_new_user() SET search_path = '';

-- Fix extension in public warning
CREATE SCHEMA IF NOT EXISTS extensions;
ALTER EXTENSION vector SET SCHEMA extensions;
