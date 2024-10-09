// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Remplace par tes propres informations de projet
const supabaseUrl = 'https://gnbdewfilzmdbwztqhzh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduYmRld2ZpbHptZGJ3enRxaHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1MDMwMjMsImV4cCI6MjA0NDA3OTAyM30.f1LwDW2FAsSlpzkGlu1Ni0h0QkyQOvmww787yLV138k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
