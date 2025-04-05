
-- Enable realtime for the notifications table
-- Run this SQL in your Supabase SQL editor

-- Set the table to allow full replica identity
ALTER TABLE notifications REPLICA IDENTITY FULL;

-- Add the table to the realtime publication
BEGIN;
  -- Check if the publication already exists
  DO $$
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime'
    ) THEN
      CREATE PUBLICATION supabase_realtime;
    END IF;
  END
  $$;
  
  -- Add table to the publication if not already added
  ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
COMMIT;
