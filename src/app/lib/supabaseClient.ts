import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xeqayalsoomdtjbzvjwv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcWF5YWxzb29tZHRqYnp2and2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3NDcyODAsImV4cCI6MjA5OTMyMzI4MH0.rT7uJag9RO_Czn_HNjGICBJApnjA5cG0T4wWqnTt_0I";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);