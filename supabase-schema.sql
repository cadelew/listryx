-- ============================================
-- Listryx Full Database Schema - Clean Install
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  company_name TEXT,
  license_number TEXT,
  bio TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free','professional','enterprise')),
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active','cancelled','past_due')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TEAMS TABLE
-- ============================================
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TEAM MEMBERS TABLE
-- ============================================
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('owner','admin','member','viewer')),
  permissions JSONB DEFAULT '{}'::jsonb,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- ============================================
-- LISTINGS TABLE
-- ============================================
CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  property_type TEXT NOT NULL CHECK (property_type IN ('Single Family','Condo','Townhouse','Multi-Family','Commercial','Land','Other')),
  price DECIMAL(12,2),
  bedrooms INTEGER,
  bathrooms DECIMAL(3,1),
  sqft INTEGER,
  lot_size DECIMAL(10,2),
  year_built INTEGER,
  description TEXT,
  ai_description TEXT,
  slug TEXT UNIQUE,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','active','pending','sold','expired','withdrawn')),
  mls_number TEXT,
  mls_status TEXT,
  amenities TEXT[],
  listed_date DATE,
  sold_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
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
CREATE TABLE public.listing_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  url TEXT NOT NULL,
  caption TEXT,
  ai_caption TEXT,
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  file_size INTEGER,
  mime_type TEXT,
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CLIENTS TABLE
-- ============================================
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  status TEXT DEFAULT 'lead' CHECK (status IN ('lead','active','pending','closed','inactive')),
  client_type TEXT DEFAULT 'buyer' CHECK (client_type IN ('buyer','seller','both')),
  preferred_property_types TEXT[],
  min_price DECIMAL(12,2),
  max_price DECIMAL(12,2),
  preferred_locations TEXT[],
  notes TEXT,
  last_contact_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CLIENT INTERACTIONS TABLE
-- ============================================
CREATE TABLE public.client_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES public.listings(id) ON DELETE SET NULL,
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('call','email','meeting','showing','note','message','other')),
  subject TEXT,
  description TEXT,
  interaction_date TIMESTAMPTZ DEFAULT NOW(),
  meeting_location TEXT,
  meeting_duration INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CLIENT LISTING MATCHES TABLE
-- ============================================
CREATE TABLE public.client_listing_matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  match_score INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(client_id, listing_id)
);

-- ============================================
-- COMPLIANCE TEMPLATES TABLE
-- ============================================
CREATE TABLE public.compliance_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  state TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('disclosure','inspection','legal','safety','environmental','other')),
  is_required BOOLEAN DEFAULT FALSE,
  due_days INTEGER,
  instructions TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- COMPLIANCE TASKS TABLE
-- ============================================
CREATE TABLE public.compliance_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  template_id UUID REFERENCES public.compliance_templates(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','in_progress','complete','overdue','cancelled')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low','medium','high','urgent')),
  due_date DATE,
  completed_date DATE,
  completed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  document_id UUID,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- DOCUMENTS TABLE
-- ============================================
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  file_name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  url TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  document_type TEXT CHECK (document_type IN ('contract','report','disclosure','title','appraisal','photo','other')),
  category TEXT,
  listing_id UUID REFERENCES public.listings(id) ON DELETE SET NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  compliance_task_id UUID REFERENCES public.compliance_tasks(id) ON DELETE SET NULL,
  description TEXT,
  tags TEXT[],
  version INTEGER DEFAULT 1,
  parent_document_id UUID REFERENCES public.documents(id) ON DELETE SET NULL,
  is_shared BOOLEAN DEFAULT FALSE,
  shared_with_clients BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TASKS TABLE
-- ============================================
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','in_progress','complete','cancelled')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low','medium','high','urgent')),
  listing_id UUID REFERENCES public.listings(id) ON DELETE SET NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  due_date DATE,
  due_time TIME,
  completed_date TIMESTAMPTZ,
  completed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_pattern TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MARKETING CONTENT TABLE
-- ============================================
CREATE TABLE public.marketing_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL CHECK (content_type IN ('description','photo_caption','social_post','email','flyer','other')),
  platform TEXT,
  title TEXT,
  content TEXT NOT NULL,
  tone TEXT CHECK (tone IN ('professional','luxury','casual','energetic','friendly')),
  length TEXT CHECK (length IN ('short','medium','long')),
  ai_model TEXT,
  ai_prompt TEXT,
  generation_settings JSONB,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','approved','published','archived')),
  is_applied_to_listing BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  notification_type TEXT CHECK (notification_type IN ('compliance','document','ai','client','listing','calendar','task','system','other')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low','normal','high','urgent')),
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
  compliance_task_id UUID REFERENCES public.compliance_tasks(id) ON DELETE CASCADE,
  document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  action_url TEXT,
  action_label TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- USER SETTINGS TABLE
-- ============================================
CREATE TABLE public.user_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  email_notifications BOOLEAN DEFAULT TRUE,
  sms_notifications BOOLEAN DEFAULT FALSE,
  push_notifications BOOLEAN DEFAULT TRUE,
  notification_types JSONB DEFAULT '{}'::jsonb,
  theme TEXT DEFAULT 'light' CHECK (theme IN ('light','dark','auto')),
  timezone TEXT DEFAULT 'UTC',
  date_format TEXT DEFAULT 'MM/DD/YYYY',
  default_ai_tone TEXT DEFAULT 'professional',
  default_ai_length TEXT DEFAULT 'medium',
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TRIGGERS
-- ============================================

-- updated_at auto-update trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach to all tables with updated_at
DO $$
DECLARE t RECORD;
BEGIN
  FOR t IN SELECT table_name FROM information_schema.tables
           WHERE table_schema = 'public'
  LOOP
    EXECUTE format('CREATE TRIGGER update_%I_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();', t.table_name, t.table_name);
  END LOOP;
END $$;

-- Auto-generate listing slug
CREATE OR REPLACE FUNCTION public.generate_listing_slug()
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

CREATE TRIGGER generate_listing_slug_trigger BEFORE INSERT OR UPDATE ON public.listings
FOR EACH ROW EXECUTE FUNCTION public.generate_listing_slug();

-- Auto-create profile on user signup (Supabase Auth)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name',''));

  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listing_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_listing_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Allow inserts from auth trigger"
  ON public.profiles FOR INSERT
  WITH CHECK (true);

-- TEAMS POLICIES
CREATE POLICY "Users can view teams they belong to"
  ON public.teams FOR SELECT
  USING (
    owner_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_members.team_id = teams.id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Team owners can manage teams"
  ON public.teams FOR ALL
  USING (owner_id = auth.uid());

-- TEAM MEMBERS POLICIES
CREATE POLICY "Users can view team members of their teams"
  ON public.team_members FOR SELECT
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.teams
      WHERE teams.id = team_members.team_id
      AND (teams.owner_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.team_members tm
        WHERE tm.team_id = teams.id
        AND tm.user_id = auth.uid()
        AND tm.role IN ('owner', 'admin')
      ))
    )
  );

-- LISTINGS POLICIES
CREATE POLICY "Users can view own listings"
  ON public.listings FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can view team listings"
  ON public.listings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_members.team_id = listings.team_id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own listings"
  ON public.listings FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own listings"
  ON public.listings FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own listings"
  ON public.listings FOR DELETE
  USING (user_id = auth.uid());

-- LISTING PHOTOS POLICIES
CREATE POLICY "Users can view photos of their listings"
  ON public.listing_photos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.listings
      WHERE listings.id = listing_photos.listing_id
      AND listings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage photos of their listings"
  ON public.listing_photos FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.listings
      WHERE listings.id = listing_photos.listing_id
      AND listings.user_id = auth.uid()
    )
  );

-- CLIENTS POLICIES
CREATE POLICY "Users can view own clients"
  ON public.clients FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can view team clients"
  ON public.clients FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_members.team_id = clients.team_id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own clients"
  ON public.clients FOR ALL
  USING (user_id = auth.uid());

-- CLIENT INTERACTIONS POLICIES
CREATE POLICY "Users can view interactions for their clients"
  ON public.client_interactions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.clients
      WHERE clients.id = client_interactions.client_id
      AND clients.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage interactions for their clients"
  ON public.client_interactions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.clients
      WHERE clients.id = client_interactions.client_id
      AND clients.user_id = auth.uid()
    )
  );

-- COMPLIANCE TEMPLATES POLICIES (public read access)
CREATE POLICY "Everyone can view compliance templates"
  ON public.compliance_templates FOR SELECT
  USING (true);

-- COMPLIANCE TASKS POLICIES
CREATE POLICY "Users can view compliance tasks for their listings"
  ON public.compliance_tasks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.listings
      WHERE listings.id = compliance_tasks.listing_id
      AND listings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage compliance tasks for their listings"
  ON public.compliance_tasks FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.listings
      WHERE listings.id = compliance_tasks.listing_id
      AND listings.user_id = auth.uid()
    )
  );

-- DOCUMENTS POLICIES
CREATE POLICY "Users can view own documents"
  ON public.documents FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can view team documents"
  ON public.documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_members.team_id = documents.team_id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own documents"
  ON public.documents FOR ALL
  USING (user_id = auth.uid());

-- TASKS POLICIES
CREATE POLICY "Users can view own tasks"
  ON public.tasks FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can view team tasks"
  ON public.tasks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_members.team_id = tasks.team_id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own tasks"
  ON public.tasks FOR ALL
  USING (user_id = auth.uid());

-- MARKETING CONTENT POLICIES
CREATE POLICY "Users can view own marketing content"
  ON public.marketing_content FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own marketing content"
  ON public.marketing_content FOR ALL
  USING (user_id = auth.uid());

-- NOTIFICATIONS POLICIES
CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own notifications"
  ON public.notifications FOR DELETE
  USING (user_id = auth.uid());

-- USER SETTINGS POLICIES
CREATE POLICY "Users can view own settings"
  ON public.user_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
  ON public.user_settings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Allow inserts from auth trigger"
  ON public.user_settings FOR INSERT
  WITH CHECK (true);

-- ============================================
-- INDEXES
-- ============================================

-- Listings indexes
CREATE INDEX idx_listings_user_id ON public.listings(user_id);
CREATE INDEX idx_listings_team_id ON public.listings(team_id);
CREATE INDEX idx_listings_status ON public.listings(status);
CREATE INDEX idx_listings_city_state ON public.listings(city, state);
CREATE INDEX idx_listings_price ON public.listings(price);
CREATE INDEX idx_listings_created_at ON public.listings(created_at DESC);
CREATE INDEX idx_listings_search_vector ON public.listings USING GIN(search_vector);
CREATE INDEX idx_listings_slug ON public.listings(slug);

-- Listing Photos indexes
CREATE INDEX idx_listing_photos_listing_id ON public.listing_photos(listing_id);
CREATE INDEX idx_listing_photos_display_order ON public.listing_photos(listing_id, display_order);

-- Clients indexes
CREATE INDEX idx_clients_user_id ON public.clients(user_id);
CREATE INDEX idx_clients_team_id ON public.clients(team_id);
CREATE INDEX idx_clients_status ON public.clients(status);
CREATE INDEX idx_clients_email ON public.clients(email);
CREATE INDEX idx_clients_last_contact ON public.clients(last_contact_date DESC);

-- Client Interactions indexes
CREATE INDEX idx_client_interactions_client_id ON public.client_interactions(client_id);
CREATE INDEX idx_client_interactions_user_id ON public.client_interactions(user_id);
CREATE INDEX idx_client_interactions_listing_id ON public.client_interactions(listing_id);
CREATE INDEX idx_client_interactions_date ON public.client_interactions(interaction_date DESC);

-- Compliance Templates indexes
CREATE INDEX idx_compliance_templates_state ON public.compliance_templates(state);
CREATE INDEX idx_compliance_templates_category ON public.compliance_templates(category);

-- Compliance Tasks indexes
CREATE INDEX idx_compliance_tasks_listing_id ON public.compliance_tasks(listing_id);
CREATE INDEX idx_compliance_tasks_user_id ON public.compliance_tasks(user_id);
CREATE INDEX idx_compliance_tasks_status ON public.compliance_tasks(status);
CREATE INDEX idx_compliance_tasks_due_date ON public.compliance_tasks(due_date);
CREATE INDEX idx_compliance_tasks_priority ON public.compliance_tasks(priority);

-- Documents indexes
CREATE INDEX idx_documents_user_id ON public.documents(user_id);
CREATE INDEX idx_documents_team_id ON public.documents(team_id);
CREATE INDEX idx_documents_listing_id ON public.documents(listing_id);
CREATE INDEX idx_documents_client_id ON public.documents(client_id);
CREATE INDEX idx_documents_type ON public.documents(document_type);
CREATE INDEX idx_documents_created_at ON public.documents(created_at DESC);

-- Tasks indexes
CREATE INDEX idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX idx_tasks_team_id ON public.tasks(team_id);
CREATE INDEX idx_tasks_listing_id ON public.tasks(listing_id);
CREATE INDEX idx_tasks_client_id ON public.tasks(client_id);
CREATE INDEX idx_tasks_status ON public.tasks(status);
CREATE INDEX idx_tasks_due_date ON public.tasks(due_date);
CREATE INDEX idx_tasks_priority ON public.tasks(priority);

-- Marketing Content indexes
CREATE INDEX idx_marketing_content_user_id ON public.marketing_content(user_id);
CREATE INDEX idx_marketing_content_listing_id ON public.marketing_content(listing_id);
CREATE INDEX idx_marketing_content_type ON public.marketing_content(content_type);
CREATE INDEX idx_marketing_content_status ON public.marketing_content(status);

-- Notifications indexes
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(user_id, is_read);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at DESC);
CREATE INDEX idx_notifications_type ON public.notifications(notification_type);

-- Team Members indexes
CREATE INDEX idx_team_members_team_id ON public.team_members(team_id);
CREATE INDEX idx_team_members_user_id ON public.team_members(user_id);
