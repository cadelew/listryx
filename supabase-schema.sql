-- ============================================
-- Listryx - Supabase Database Schema
-- ============================================
-- This schema includes all tables, relationships, RLS policies,
-- indexes, and triggers for the Listryx real estate SaaS platform
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fuzzy text search

-- ============================================
-- PROFILES TABLE
-- ============================================
-- Extended user profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  company_name TEXT,
  license_number TEXT,
  bio TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'professional', 'enterprise')),
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'cancelled', 'past_due')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TEAMS TABLE
-- ============================================
-- Teams/brokerages for collaboration
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TEAM MEMBERS TABLE
-- ============================================
-- Team membership and permissions
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  permissions JSONB DEFAULT '{}'::jsonb,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- ============================================
-- LISTINGS TABLE
-- ============================================
-- Property listings
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  team_id UUID REFERENCES teams(id) ON DELETE SET NULL,
  
  -- Basic Information
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  property_type TEXT NOT NULL CHECK (property_type IN ('Single Family', 'Condo', 'Townhouse', 'Multi-Family', 'Commercial', 'Land', 'Other')),
  
  -- Property Details
  price DECIMAL(12, 2),
  bedrooms INTEGER,
  bathrooms DECIMAL(3, 1),
  sqft INTEGER,
  lot_size DECIMAL(10, 2), -- in acres
  year_built INTEGER,
  
  -- Content
  description TEXT,
  ai_description TEXT,
  slug TEXT UNIQUE,
  meta_title TEXT,
  meta_description TEXT,
  
  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'pending', 'sold', 'expired', 'withdrawn')),
  
  -- MLS Integration
  mls_number TEXT,
  mls_status TEXT,
  
  -- SEO
  amenities TEXT[], -- Array of amenities
  
  -- Timestamps
  listed_date DATE,
  sold_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Full text search
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(address, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(city, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(state, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'C')
  ) STORED
);

-- ============================================
-- LISTING PHOTOS TABLE
-- ============================================
-- Photos for listings
CREATE TABLE listing_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  url TEXT NOT NULL,
  caption TEXT,
  ai_caption TEXT,
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  file_size INTEGER, -- in bytes
  mime_type TEXT,
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CLIENTS TABLE
-- ============================================
-- Client management
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  team_id UUID REFERENCES teams(id) ON DELETE SET NULL,
  
  -- Contact Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  
  -- Client Details
  status TEXT DEFAULT 'lead' CHECK (status IN ('lead', 'active', 'pending', 'closed', 'inactive')),
  client_type TEXT DEFAULT 'buyer' CHECK (client_type IN ('buyer', 'seller', 'both')),
  
  -- Preferences
  preferred_property_types TEXT[],
  min_price DECIMAL(12, 2),
  max_price DECIMAL(12, 2),
  preferred_locations TEXT[],
  notes TEXT,
  
  -- Timestamps
  last_contact_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CLIENT INTERACTIONS TABLE
-- ============================================
-- Activity tracking (calls, meetings, notes, emails)
CREATE TABLE client_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
  
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('call', 'email', 'meeting', 'showing', 'note', 'message', 'other')),
  subject TEXT,
  description TEXT,
  interaction_date TIMESTAMPTZ DEFAULT NOW(),
  
  -- Meeting specific
  meeting_location TEXT,
  meeting_duration INTEGER, -- in minutes
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CLIENT LISTING MATCHES TABLE
-- ============================================
-- Link clients to listings they're interested in
CREATE TABLE client_listing_matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  match_score INTEGER, -- 0-100
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(client_id, listing_id)
);

-- ============================================
-- COMPLIANCE TEMPLATES TABLE
-- ============================================
-- State-specific compliance templates
CREATE TABLE compliance_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  state TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('disclosure', 'inspection', 'legal', 'safety', 'environmental', 'other')),
  is_required BOOLEAN DEFAULT FALSE,
  due_days INTEGER, -- Days from listing date
  instructions TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- COMPLIANCE TASKS TABLE
-- ============================================
-- Compliance tracking for listings
CREATE TABLE compliance_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  template_id UUID REFERENCES compliance_templates(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'complete', 'overdue', 'cancelled')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  
  due_date DATE,
  completed_date DATE,
  completed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  
  -- Document links
  document_id UUID, -- Reference to documents table
  
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- DOCUMENTS TABLE
-- ============================================
-- Document management
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  team_id UUID REFERENCES teams(id) ON DELETE SET NULL,
  
  -- Document Info
  name TEXT NOT NULL,
  file_name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  url TEXT NOT NULL,
  file_size INTEGER NOT NULL, -- in bytes
  mime_type TEXT NOT NULL,
  
  -- Categorization
  document_type TEXT CHECK (document_type IN ('contract', 'report', 'disclosure', 'title', 'appraisal', 'photo', 'other')),
  category TEXT,
  
  -- Relationships
  listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  compliance_task_id UUID REFERENCES compliance_tasks(id) ON DELETE SET NULL,
  
  -- Metadata
  description TEXT,
  tags TEXT[],
  version INTEGER DEFAULT 1,
  parent_document_id UUID REFERENCES documents(id) ON DELETE SET NULL, -- For versioning
  
  -- Sharing
  is_shared BOOLEAN DEFAULT FALSE,
  shared_with_clients BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TASKS TABLE
-- ============================================
-- General task management
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  team_id UUID REFERENCES teams(id) ON DELETE SET NULL,
  
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'complete', 'cancelled')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  
  -- Relationships
  listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  
  -- Scheduling
  due_date DATE,
  due_time TIME,
  completed_date TIMESTAMPTZ,
  completed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  
  -- Recurring
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_pattern TEXT, -- JSON string for recurrence rules
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MARKETING CONTENT TABLE
-- ============================================
-- AI-generated marketing content
CREATE TABLE marketing_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  
  content_type TEXT NOT NULL CHECK (content_type IN ('description', 'photo_caption', 'social_post', 'email', 'flyer', 'other')),
  platform TEXT, -- For social posts: 'facebook', 'instagram', 'twitter', 'linkedin', etc.
  
  -- Content
  title TEXT,
  content TEXT NOT NULL,
  tone TEXT CHECK (tone IN ('professional', 'luxury', 'casual', 'energetic', 'friendly')),
  length TEXT CHECK (length IN ('short', 'medium', 'long')),
  
  -- AI Metadata
  ai_model TEXT,
  ai_prompt TEXT,
  generation_settings JSONB,
  
  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'published', 'archived')),
  
  -- Usage
  is_applied_to_listing BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
-- Notifications and alerts
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  notification_type TEXT CHECK (notification_type IN ('compliance', 'document', 'ai', 'client', 'listing', 'calendar', 'task', 'system', 'other')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  
  -- Relationships
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  compliance_task_id UUID REFERENCES compliance_tasks(id) ON DELETE CASCADE,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  
  -- Status
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  
  -- Action
  action_url TEXT,
  action_label TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- USER SETTINGS TABLE
-- ============================================
-- User preferences and settings
CREATE TABLE user_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Notification Preferences
  email_notifications BOOLEAN DEFAULT TRUE,
  sms_notifications BOOLEAN DEFAULT FALSE,
  push_notifications BOOLEAN DEFAULT TRUE,
  notification_types JSONB DEFAULT '{}'::jsonb,
  
  -- Display Preferences
  theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'auto')),
  timezone TEXT DEFAULT 'UTC',
  date_format TEXT DEFAULT 'MM/DD/YYYY',
  
  -- AI Preferences
  default_ai_tone TEXT DEFAULT 'professional',
  default_ai_length TEXT DEFAULT 'medium',
  
  -- Other Settings
  settings JSONB DEFAULT '{}'::jsonb,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
-- Performance optimization indexes

-- Listings
CREATE INDEX idx_listings_user_id ON listings(user_id);
CREATE INDEX idx_listings_team_id ON listings(team_id);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_city_state ON listings(city, state);
CREATE INDEX idx_listings_price ON listings(price);
CREATE INDEX idx_listings_created_at ON listings(created_at DESC);
CREATE INDEX idx_listings_search_vector ON listings USING GIN(search_vector);
CREATE INDEX idx_listings_slug ON listings(slug);

-- Listing Photos
CREATE INDEX idx_listing_photos_listing_id ON listing_photos(listing_id);
CREATE INDEX idx_listing_photos_display_order ON listing_photos(listing_id, display_order);

-- Clients
CREATE INDEX idx_clients_user_id ON clients(user_id);
CREATE INDEX idx_clients_team_id ON clients(team_id);
CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_last_contact ON clients(last_contact_date DESC);

-- Client Interactions
CREATE INDEX idx_client_interactions_client_id ON client_interactions(client_id);
CREATE INDEX idx_client_interactions_user_id ON client_interactions(user_id);
CREATE INDEX idx_client_interactions_listing_id ON client_interactions(listing_id);
CREATE INDEX idx_client_interactions_date ON client_interactions(interaction_date DESC);

-- Client Listing Matches
CREATE INDEX idx_client_listing_matches_client_id ON client_listing_matches(client_id);
CREATE INDEX idx_client_listing_matches_listing_id ON client_listing_matches(listing_id);

-- Compliance Templates
CREATE INDEX idx_compliance_templates_state ON compliance_templates(state);
CREATE INDEX idx_compliance_templates_category ON compliance_templates(category);

-- Compliance Tasks
CREATE INDEX idx_compliance_tasks_listing_id ON compliance_tasks(listing_id);
CREATE INDEX idx_compliance_tasks_user_id ON compliance_tasks(user_id);
CREATE INDEX idx_compliance_tasks_status ON compliance_tasks(status);
CREATE INDEX idx_compliance_tasks_due_date ON compliance_tasks(due_date);
CREATE INDEX idx_compliance_tasks_priority ON compliance_tasks(priority);

-- Documents
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_team_id ON documents(team_id);
CREATE INDEX idx_documents_listing_id ON documents(listing_id);
CREATE INDEX idx_documents_client_id ON documents(client_id);
CREATE INDEX idx_documents_type ON documents(document_type);
CREATE INDEX idx_documents_created_at ON documents(created_at DESC);

-- Tasks
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_team_id ON tasks(team_id);
CREATE INDEX idx_tasks_listing_id ON tasks(listing_id);
CREATE INDEX idx_tasks_client_id ON tasks(client_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_priority ON tasks(priority);

-- Marketing Content
CREATE INDEX idx_marketing_content_user_id ON marketing_content(user_id);
CREATE INDEX idx_marketing_content_listing_id ON marketing_content(listing_id);
CREATE INDEX idx_marketing_content_type ON marketing_content(content_type);
CREATE INDEX idx_marketing_content_status ON marketing_content(status);

-- Notifications
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX idx_notifications_type ON notifications(notification_type);

-- Team Members
CREATE INDEX idx_team_members_team_id ON team_members(team_id);
CREATE INDEX idx_team_members_user_id ON team_members(user_id);

-- ============================================
-- TRIGGERS
-- ============================================
-- Auto-update updated_at timestamps

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_interactions_updated_at BEFORE UPDATE ON client_interactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_compliance_templates_updated_at BEFORE UPDATE ON compliance_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_compliance_tasks_updated_at BEFORE UPDATE ON compliance_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_marketing_content_updated_at BEFORE UPDATE ON marketing_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-generate slug for listings
CREATE OR REPLACE FUNCTION generate_listing_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := lower(
      regexp_replace(
        NEW.address || '-' || NEW.city || '-' || NEW.state || '-' || substring(NEW.id::text, 1, 8),
        '[^a-z0-9]+', '-', 'g'
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_listing_slug_trigger BEFORE INSERT OR UPDATE ON listings
  FOR EACH ROW EXECUTE FUNCTION generate_listing_slug();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  
  INSERT INTO user_settings (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_listing_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- TEAMS POLICIES
CREATE POLICY "Users can view teams they belong to"
  ON teams FOR SELECT
  USING (
    owner_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = teams.id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Team owners can manage teams"
  ON teams FOR ALL
  USING (owner_id = auth.uid());

-- TEAM MEMBERS POLICIES
CREATE POLICY "Users can view team members of their teams"
  ON team_members FOR SELECT
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM teams
      WHERE teams.id = team_members.team_id
      AND (teams.owner_id = auth.uid() OR EXISTS (
        SELECT 1 FROM team_members tm
        WHERE tm.team_id = teams.id
        AND tm.user_id = auth.uid()
        AND tm.role IN ('owner', 'admin')
      ))
    )
  );

-- LISTINGS POLICIES
CREATE POLICY "Users can view own listings"
  ON listings FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can view team listings"
  ON listings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = listings.team_id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own listings"
  ON listings FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own listings"
  ON listings FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own listings"
  ON listings FOR DELETE
  USING (user_id = auth.uid());

-- LISTING PHOTOS POLICIES
CREATE POLICY "Users can view photos of their listings"
  ON listing_photos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM listings
      WHERE listings.id = listing_photos.listing_id
      AND listings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage photos of their listings"
  ON listing_photos FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM listings
      WHERE listings.id = listing_photos.listing_id
      AND listings.user_id = auth.uid()
    )
  );

-- CLIENTS POLICIES
CREATE POLICY "Users can view own clients"
  ON clients FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can view team clients"
  ON clients FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = clients.team_id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own clients"
  ON clients FOR ALL
  USING (user_id = auth.uid());

-- CLIENT INTERACTIONS POLICIES
CREATE POLICY "Users can view interactions for their clients"
  ON client_interactions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = client_interactions.client_id
      AND clients.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage interactions for their clients"
  ON client_interactions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = client_interactions.client_id
      AND clients.user_id = auth.uid()
    )
  );

-- COMPLIANCE TEMPLATES POLICIES
CREATE POLICY "Everyone can view compliance templates"
  ON compliance_templates FOR SELECT
  USING (true);

-- COMPLIANCE TASKS POLICIES
CREATE POLICY "Users can view compliance tasks for their listings"
  ON compliance_tasks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM listings
      WHERE listings.id = compliance_tasks.listing_id
      AND listings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage compliance tasks for their listings"
  ON compliance_tasks FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM listings
      WHERE listings.id = compliance_tasks.listing_id
      AND listings.user_id = auth.uid()
    )
  );

-- DOCUMENTS POLICIES
CREATE POLICY "Users can view own documents"
  ON documents FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can view team documents"
  ON documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = documents.team_id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own documents"
  ON documents FOR ALL
  USING (user_id = auth.uid());

-- TASKS POLICIES
CREATE POLICY "Users can view own tasks"
  ON tasks FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can view team tasks"
  ON tasks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = tasks.team_id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own tasks"
  ON tasks FOR ALL
  USING (user_id = auth.uid());

-- MARKETING CONTENT POLICIES
CREATE POLICY "Users can view own marketing content"
  ON marketing_content FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own marketing content"
  ON marketing_content FOR ALL
  USING (user_id = auth.uid());

-- NOTIFICATIONS POLICIES
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own notifications"
  ON notifications FOR DELETE
  USING (user_id = auth.uid());

-- USER SETTINGS POLICIES
CREATE POLICY "Users can view own settings"
  ON user_settings FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own settings"
  ON user_settings FOR UPDATE
  USING (user_id = auth.uid());

-- ============================================
-- SEED DATA
-- ============================================
-- Compliance templates for common states

INSERT INTO compliance_templates (state, name, description, category, is_required, due_days, instructions) VALUES
('CA', 'Lead-Based Paint Disclosure', 'Required for homes built before 1978', 'disclosure', true, 0, 'Provide EPA-approved lead paint disclosure form to buyers'),
('CA', 'Seller Property Disclosure', 'Mandatory property condition statement', 'disclosure', true, 0, 'Complete comprehensive property disclosure form'),
('CA', 'Natural Hazard Disclosure', 'Disclosure of flood, fire, and earthquake zones', 'disclosure', true, 0, 'Obtain NHD report from certified provider'),
('CA', 'Smoke Detector Compliance', 'Verify smoke detector installation', 'safety', true, 0, 'Ensure smoke detectors are installed and functional'),
('CA', 'Carbon Monoxide Detector', 'Required CO detector installation', 'safety', true, 0, 'Install CO detectors in all sleeping areas'),
('CA', 'Water Heater Bracing', 'Seismic bracing for water heaters', 'safety', true, 0, 'Ensure water heater is properly braced'),
('CA', 'HOA Documentation', 'HOA rules, regulations, and financial statements', 'legal', false, 7, 'Request HOA documents from association'),
('CA', 'Termite Inspection', 'Wood-destroying pest inspection', 'inspection', false, 14, 'Schedule termite inspection with licensed inspector'),
('CA', 'Home Inspection', 'General property inspection', 'inspection', false, 17, 'Coordinate home inspection with buyer'),
('NY', 'Lead-Based Paint Disclosure', 'Required for homes built before 1978', 'disclosure', true, 0, 'Provide EPA-approved lead paint disclosure form'),
('NY', 'Property Condition Disclosure', 'Seller disclosure of property condition', 'disclosure', true, 0, 'Complete NY property condition disclosure form'),
('NY', 'Smoke Detector Compliance', 'Verify smoke detector installation', 'safety', true, 0, 'Ensure smoke detectors meet NY standards'),
('TX', 'Seller''s Disclosure Notice', 'Texas property disclosure requirements', 'disclosure', true, 0, 'Complete Texas seller''s disclosure notice'),
('TX', 'Lead-Based Paint Disclosure', 'Required for homes built before 1978', 'disclosure', true, 0, 'Provide EPA-approved lead paint disclosure form'),
('TX', 'Smoke Detector Compliance', 'Verify smoke detector installation', 'safety', true, 0, 'Ensure smoke detectors are installed');

-- ============================================
-- STORAGE BUCKETS SETUP
-- ============================================
-- Note: These need to be created via Supabase Dashboard or API
-- Buckets needed:
-- 1. listing-photos - Public bucket for listing images
-- 2. documents - Private bucket for documents
-- 3. avatars - Public bucket for user avatars

-- Storage policies (to be run after buckets are created)
-- Listing Photos Bucket
-- CREATE POLICY "Anyone can view listing photos"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'listing-photos');

-- CREATE POLICY "Users can upload listing photos"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'listing-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Documents Bucket
-- CREATE POLICY "Users can view own documents"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- CREATE POLICY "Users can upload own documents"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to get listing completion percentage
CREATE OR REPLACE FUNCTION get_listing_completion(listing_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  completion INTEGER;
BEGIN
  SELECT
    CASE
      WHEN COUNT(*) = 0 THEN 0
      ELSE ROUND(
        (COUNT(*) FILTER (WHERE 
          l.address IS NOT NULL AND l.address != '' AND
          l.city IS NOT NULL AND l.city != '' AND
          l.state IS NOT NULL AND l.state != '' AND
          l.property_type IS NOT NULL AND
          l.price IS NOT NULL AND
          l.description IS NOT NULL AND l.description != ''
        ))::NUMERIC / COUNT(*)::NUMERIC * 100
      )
    END
  INTO completion
  FROM listings l
  WHERE l.id = listing_uuid;
  
  RETURN COALESCE(completion, 0);
END;
$$ LANGUAGE plpgsql;

-- Function to get compliance completion percentage for a listing
CREATE OR REPLACE FUNCTION get_compliance_completion(listing_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  total_tasks INTEGER;
  completed_tasks INTEGER;
  completion INTEGER;
BEGIN
  SELECT COUNT(*), COUNT(*) FILTER (WHERE status = 'complete')
  INTO total_tasks, completed_tasks
  FROM compliance_tasks
  WHERE listing_id = listing_uuid;
  
  IF total_tasks = 0 THEN
    RETURN 0;
  END IF;
  
  completion := ROUND((completed_tasks::NUMERIC / total_tasks::NUMERIC) * 100);
  RETURN completion;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- END OF SCHEMA
-- ============================================

