# Supabase Setup Guide for Listryx

This guide will walk you through setting up your Supabase database for the Listryx platform.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- A new Supabase project created
- Access to your project's SQL Editor

## Step 1: Create Your Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in your project details:
   - **Name**: Listryx (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for it to initialize (2-3 minutes)

## Step 2: Run the Schema SQL

1. In your Supabase dashboard, navigate to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Open the `supabase-schema.sql` file from this project
4. Copy the entire contents of the file
5. Paste it into the SQL Editor
6. Click **Run** (or press `Ctrl+Enter` / `Cmd+Enter`)

The schema will create:
- ✅ 17 database tables
- ✅ All necessary indexes for performance
- ✅ Row Level Security (RLS) policies
- ✅ Automatic triggers for timestamps
- ✅ Helper functions
- ✅ Seed data for compliance templates

## Step 3: Set Up Storage Buckets

You need to create three storage buckets for file uploads:

### Option A: Via Supabase Dashboard

1. Navigate to **Storage** in the left sidebar
2. Click **New bucket** for each:

#### Bucket 1: `listing-photos`
- **Name**: `listing-photos`
- **Public bucket**: ❌ No (keep private - use signed URLs for sharing)
  - **Why private?** Listing photos are user assets that should be protected. Use signed URLs when you need to share them for marketing materials, client sharing, or public listings. This gives you control over who can access the photos and when.
- **File size limit**: 10 MB (or your preference)
- **Allowed MIME types**: `image/jpeg, image/png, image/webp`

#### Bucket 2: `documents`
- **Name**: `documents`
- **Public bucket**: ❌ No (keep private)
- **File size limit**: 50 MB (or your preference)
- **Allowed MIME types**: `application/pdf, image/*, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document`

#### Bucket 3: `avatars`
- **Name**: `avatars`
- **Public bucket**: ✅ Yes (check this)
- **File size limit**: 2 MB
- **Allowed MIME types**: `image/jpeg, image/png, image/webp`

### Option B: Via SQL (Alternative)

You can also create buckets using SQL in the SQL Editor:

```sql
-- Create listing-photos bucket (private - use signed URLs for sharing)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'listing-photos',
  'listing-photos',
  false, -- Private bucket for security
  10485760, -- 10 MB in bytes
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Create documents bucket (private)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documents',
  'documents',
  false,
  52428800, -- 50 MB in bytes
  ARRAY['application/pdf', 'image/*', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

-- Create avatars bucket (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  2097152, -- 2 MB in bytes
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);
```

## Step 4: Set Up Storage Policies

After creating the buckets, set up Row Level Security policies for storage:

1. Go to **Storage** → **Policies**
2. For each bucket, add the following policies
3. **Important**: In the Supabase dashboard, make sure to:
   - Check the appropriate **Allowed operation** checkbox (SELECT, INSERT, UPDATE, or DELETE)
   - Select the correct **Target roles** (authenticated for private buckets, or leave blank for public read access)

### Quick Reference: Allowed Operations by Policy

| Policy | Allowed Operation | Target Roles | Bucket |
|--------|-----------------|--------------|---------|
| View listing photos | ✅ SELECT | authenticated | listing-photos |
| Upload listing photos | ✅ INSERT | authenticated | listing-photos |
| Update listing photos | ✅ UPDATE | authenticated | listing-photos |
| Delete listing photos | ✅ DELETE | authenticated | listing-photos |
| View documents | ✅ SELECT | authenticated | documents |
| Upload documents | ✅ INSERT | authenticated | documents |
| Update documents | ✅ UPDATE | authenticated | documents |
| Delete documents | ✅ DELETE | authenticated | documents |
| View avatars | ✅ SELECT | (blank/public) | avatars |
| Upload avatars | ✅ INSERT | authenticated | avatars |
| Update avatars | ✅ UPDATE | authenticated | avatars |

### Listing Photos Bucket Policies

> **⚠️ Important: Target Roles**
> 
> When creating these policies in the Supabase dashboard, make sure to:
> 1. Select **"authenticated"** in the **Target roles** field
> 2. Do NOT leave it blank (blank defaults to "public" which allows unauthenticated access)
> 
> This ensures only logged-in users can access the bucket.

**Policy 1: Users Can View Own Listing Photos**
- **Target roles**: `authenticated` (select from dropdown)
- **Allowed operation**: ✅ `SELECT` (check this checkbox in dashboard)
```sql
CREATE POLICY "Users can view own listing photos"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'listing-photos'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

> **💡 Note**: The SQL formatting (one line vs multiple lines) doesn't matter. Both formats work:
> - Multi-line (shown above) - easier to read
> - Single line: `bucket_id = 'listing-photos' AND auth.uid()::text = (storage.foldername(name))[1]`

**Policy 2: Users Can Upload to Own Folder**
- **Target roles**: `authenticated` (select from dropdown)
- **Allowed operation**: ✅ `INSERT` (check this checkbox in dashboard)
```sql
CREATE POLICY "Users can upload listing photos to own folder"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'listing-photos'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

**Policy 3: Users Can Update Own Photos**
- **Target roles**: `authenticated` (select from dropdown)
- **Allowed operation**: ✅ `UPDATE` (check this checkbox in dashboard)
```sql
CREATE POLICY "Users can update own listing photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'listing-photos'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

**Policy 4: Users Can Delete Own Photos**
- **Target roles**: `authenticated` (select from dropdown)
- **Allowed operation**: ✅ `DELETE` (check this checkbox in dashboard)
```sql
CREATE POLICY "Users can delete own listing photos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'listing-photos'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

> **💡 Using Signed URLs for Marketing Materials**
> 
> Since listing photos are stored in a private bucket, you'll need to generate signed URLs when you want to:
> - Display photos in your app (generate short-lived URLs, e.g., 1 hour)
> - Share photos in marketing materials like flyers or social media posts (generate long-lived URLs, e.g., 1 year)
> - Embed photos in emails or client communications
> 
> See the `SUPABASE-INTEGRATION-EXAMPLES.md` file for code examples on generating signed URLs.

### Documents Bucket Policies

> **⚠️ Target Roles**: Select **"authenticated"** for all document policies

**Policy 1: Users Can View Own Documents**
- **Target roles**: `authenticated` (select from dropdown)
- **Allowed operation**: ✅ `SELECT` (check this checkbox in dashboard)
```sql
CREATE POLICY "Users can view own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'documents'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

**Policy 2: Users Can Upload Own Documents**
- **Target roles**: `authenticated` (select from dropdown)
- **Allowed operation**: ✅ `INSERT` (check this checkbox in dashboard)
```sql
CREATE POLICY "Users can upload own documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

**Policy 3: Users Can Update Own Documents**
- **Target roles**: `authenticated` (select from dropdown)
- **Allowed operation**: ✅ `UPDATE` (check this checkbox in dashboard)
```sql
CREATE POLICY "Users can update own documents"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'documents'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

**Policy 4: Users Can Delete Own Documents**
- **Target roles**: `authenticated` (select from dropdown)
- **Allowed operation**: ✅ `DELETE` (check this checkbox in dashboard)
```sql
CREATE POLICY "Users can delete own documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'documents'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

### Avatars Bucket Policies

> **💡 Note**: Avatars bucket is public, so SELECT can be public (leave target roles blank), but upload/update/delete should be authenticated.

**Policy 1: Public Read Access**
- **Target roles**: Leave blank (defaults to public) OR select `public` from dropdown
- **Allowed operation**: ✅ `SELECT` (check this checkbox in dashboard)
```sql
CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');
```

**Policy 2: Users Can Upload Own Avatar**
- **Target roles**: `authenticated` (select from dropdown)
- **Allowed operation**: ✅ `INSERT` (check this checkbox in dashboard)
```sql
CREATE POLICY "Users can upload own avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

**Policy 3: Users Can Update Own Avatar**
- **Target roles**: `authenticated` (select from dropdown)
- **Allowed operation**: ✅ `UPDATE` (check this checkbox in dashboard)
```sql
CREATE POLICY "Users can update own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

**Policy 4: Users Can Delete Own Avatar**
- **Target roles**: `authenticated` (select from dropdown)
- **Allowed operation**: ✅ `DELETE` (check this checkbox in dashboard)
```sql
CREATE POLICY "Users can delete own avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

## Step 5: Get Your API Keys

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy the following values (you'll need these for your `.env` file):
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon/public key**: The `anon` key under "Project API keys"
   - **service_role key**: The `service_role` key (keep this secret!)

## Step 6: Configure Your Frontend

Create a `.env` file in your `Frontend` directory:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: Never commit your `.env` file to version control. Add it to `.gitignore`.

## Step 7: Install Supabase Client (if not already installed)

In your `Frontend` directory:

```bash
npm install @supabase/supabase-js
```

## Step 8: Create Supabase Client File

Create `Frontend/src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## Step 9: Test Your Connection

Create a test file or add to your app initialization:

```typescript
import { supabase } from './lib/supabase'

// Test connection
const testConnection = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('count')
  
  if (error) {
    console.error('Supabase connection error:', error)
  } else {
    console.log('✅ Supabase connected successfully!')
  }
}

testConnection()
```

## Step 10: Verify Setup

Run these queries in the SQL Editor to verify everything is set up correctly:

```sql
-- Check tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND rowsecurity = true;

-- Check indexes
SELECT tablename, indexname 
FROM pg_indexes 
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- Check compliance templates were seeded
SELECT state, name, is_required 
FROM compliance_templates 
ORDER BY state, name;
```

## Troubleshooting

### Issue: "relation does not exist"
- **Solution**: Make sure you ran the entire `supabase-schema.sql` file. Check for any errors in the SQL Editor.

### Issue: "permission denied"
- **Solution**: Verify RLS policies are set up correctly. Check that you're authenticated when making requests.

### Issue: Storage upload fails
- **Solution**: 
  1. Verify buckets are created
  2. Check storage policies are set up
  3. Ensure file size is within limits
  4. Verify MIME type is allowed

### Issue: Trigger not working
- **Solution**: Triggers are created automatically in the schema. If they're not working, check the trigger function exists:
  ```sql
  SELECT * FROM pg_trigger WHERE tgname LIKE '%updated_at%';
  ```

## Next Steps

1. **Set up authentication** in your frontend
2. **Implement file uploads** using Supabase Storage
3. **Connect your components** to Supabase queries
4. **Set up real-time subscriptions** for notifications (optional)
5. **Configure email templates** in Supabase Auth settings

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)

## Support

If you encounter issues:
1. Check the Supabase dashboard logs
2. Review the SQL Editor for error messages
3. Consult the Supabase documentation
4. Check the Supabase Discord community

---

**Schema Version**: 1.0.0  
**Last Updated**: 2025-11-26

