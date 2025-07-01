
-- Create analysis_results table for storing AI analysis results
CREATE TABLE public.analysis_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  sperm_count INTEGER NOT NULL,
  concentration FLOAT NOT NULL,
  speed_avg FLOAT NOT NULL,
  motility JSONB NOT NULL,
  morphology JSONB NOT NULL,
  vitality FLOAT NOT NULL,
  volume FLOAT NOT NULL,
  ph FLOAT NOT NULL,
  video_url TEXT NOT NULL,
  video_duration INTEGER NOT NULL,
  frames_analyzed INTEGER NOT NULL,
  processing_time FLOAT NOT NULL,
  koyeb_job_id TEXT,
  status TEXT DEFAULT 'completed' CHECK (status IN ('processing', 'completed', 'failed'))
);

-- Enable Row Level Security
ALTER TABLE public.analysis_results ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own analysis results" 
  ON public.analysis_results 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own analysis results" 
  ON public.analysis_results 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own analysis results" 
  ON public.analysis_results 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own analysis results" 
  ON public.analysis_results 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create storage bucket for sperm analysis videos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('sperm-videos', 'sperm-videos', false);

-- Create storage policies for the bucket
CREATE POLICY "Users can upload their own videos" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'sperm-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own videos" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'sperm-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own videos" 
  ON storage.objects 
  FOR DELETE 
  USING (bucket_id = 'sperm-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;   
END;
$$ language 'plpgsql';

-- Create trigger for updating updated_at
CREATE TRIGGER update_analysis_results_updated_at 
  BEFORE UPDATE ON public.analysis_results 
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
