# Supabase Integration Examples for Listryx

This document provides code examples for common operations with the Listryx Supabase database.

## Table of Contents

- [Authentication](#authentication)
- [Listings](#listings)
- [Clients](#clients)
- [Documents](#documents)
- [Compliance](#compliance)
- [Tasks](#tasks)
- [Marketing Content](#marketing-content)
- [Notifications](#notifications)
- [Storage](#storage)
- [Real-time Subscriptions](#real-time-subscriptions)

## Authentication

### Sign Up

```typescript
import { supabase } from './lib/supabase'

const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName
      }
    }
  })
  
  if (error) throw error
  return data
}
```

### Sign In

```typescript
const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) throw error
  return data
}
```

### Sign Out

```typescript
const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
```

### Get Current User

```typescript
const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
```

### Get User Profile

```typescript
const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) throw error
  return data
}
```

## Listings

### Create Listing

```typescript
const createListing = async (listingData: {
  address: string
  city: string
  state: string
  zip: string
  property_type: string
  price: number
  bedrooms?: number
  bathrooms?: number
  sqft?: number
  // ... other fields
}) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  
  const { data, error } = await supabase
    .from('listings')
    .insert({
      ...listingData,
      user_id: user.id,
      status: 'draft'
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

### Get All Listings

```typescript
const getListings = async (status?: string) => {
  let query = supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (status) {
    query = query.eq('status', status)
  }
  
  const { data, error } = await query
  if (error) throw error
  return data
}
```

### Get Single Listing

```typescript
const getListing = async (listingId: string) => {
  const { data, error } = await supabase
    .from('listings')
    .select(`
      *,
      listing_photos (*),
      compliance_tasks (*)
    `)
    .eq('id', listingId)
    .single()
  
  if (error) throw error
  return data
}
```

### Update Listing

```typescript
const updateListing = async (listingId: string, updates: Partial<Listing>) => {
  const { data, error } = await supabase
    .from('listings')
    .update(updates)
    .eq('id', listingId)
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

### Search Listings

```typescript
const searchListings = async (searchTerm: string) => {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .textSearch('search_vector', searchTerm)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}
```

### Upload Listing Photo

```typescript
const uploadListingPhoto = async (
  listingId: string,
  file: File,
  isPrimary: boolean = false
) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  
  // Upload to storage
  const fileExt = file.name.split('.').pop()
  const fileName = `${user.id}/${listingId}/${Date.now()}.${fileExt}`
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('listing-photos')
    .upload(fileName, file)
  
  if (uploadError) throw uploadError
  
  // Get signed URL (private bucket - expires in 1 year for marketing materials)
  const { data: { signedUrl } } = await supabase.storage
    .from('listing-photos')
    .createSignedUrl(fileName, 31536000) // 1 year expiry
  
  // Save to database (store storage_path, generate signed URLs on-demand)
  const { data, error } = await supabase
    .from('listing_photos')
    .insert({
      listing_id: listingId,
      storage_path: fileName,
      url: signedUrl, // Store initial signed URL, but regenerate as needed
      is_primary: isPrimary,
      file_size: file.size,
      mime_type: file.type
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

### Get Listing Photo URL (Generate Signed URL)

```typescript
// Generate a fresh signed URL for a listing photo
// Use this when displaying photos in your app or sharing for marketing
const getListingPhotoUrl = async (
  storagePath: string,
  expiresIn: number = 3600 // Default 1 hour, use longer for marketing materials
) => {
  const { data, error } = await supabase.storage
    .from('listing-photos')
    .createSignedUrl(storagePath, expiresIn)
  
  if (error) throw error
  return data.signedUrl
}

// Get all photos for a listing with fresh signed URLs
const getListingPhotosWithUrls = async (listingId: string) => {
  // Get photos from database
  const { data: photos, error } = await supabase
    .from('listing_photos')
    .select('*')
    .eq('listing_id', listingId)
    .order('display_order', { ascending: true })
  
  if (error) throw error
  
  // Generate fresh signed URLs for each photo
  const photosWithUrls = await Promise.all(
    photos.map(async (photo) => {
      const { data: { signedUrl } } = await supabase.storage
        .from('listing-photos')
        .createSignedUrl(photo.storage_path, 3600) // 1 hour expiry
      
      return {
        ...photo,
        url: signedUrl
      }
    })
  )
  
  return photosWithUrls
}
```

## Clients

### Create Client

```typescript
const createClient = async (clientData: {
  first_name: string
  last_name: string
  email?: string
  phone?: string
  status?: string
  client_type?: 'buyer' | 'seller' | 'both'
}) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  
  const { data, error } = await supabase
    .from('clients')
    .insert({
      ...clientData,
      user_id: user.id
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

### Get All Clients

```typescript
const getClients = async (status?: string) => {
  let query = supabase
    .from('clients')
    .select('*')
    .order('last_contact_date', { ascending: false, nullsFirst: false })
  
  if (status) {
    query = query.eq('status', status)
  }
  
  const { data, error } = await query
  if (error) throw error
  return data
}
```

### Add Client Interaction

```typescript
const addClientInteraction = async (
  clientId: string,
  interaction: {
    interaction_type: 'call' | 'email' | 'meeting' | 'showing' | 'note'
    subject?: string
    description: string
    listing_id?: string
  }
) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  
  const { data, error } = await supabase
    .from('client_interactions')
    .insert({
      ...interaction,
      client_id: clientId,
      user_id: user.id
    })
    .select()
    .single()
  
  if (error) throw error
  
  // Update client's last contact date
  await supabase
    .from('clients')
    .update({ last_contact_date: new Date().toISOString().split('T')[0] })
    .eq('id', clientId)
  
  return data
}
```

### Match Client to Listing

```typescript
const matchClientToListing = async (
  clientId: string,
  listingId: string,
  matchScore: number,
  notes?: string
) => {
  const { data, error } = await supabase
    .from('client_listing_matches')
    .upsert({
      client_id: clientId,
      listing_id: listingId,
      match_score: matchScore,
      notes
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

## Documents

### Upload Document

```typescript
const uploadDocument = async (
  file: File,
  metadata: {
    name: string
    document_type: string
    listing_id?: string
    client_id?: string
    description?: string
  }
) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  
  // Upload to storage
  const fileExt = file.name.split('.').pop()
  const fileName = `${user.id}/${Date.now()}.${fileExt}`
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('documents')
    .upload(fileName, file)
  
  if (uploadError) throw uploadError
  
  // Get signed URL (for private documents)
  const { data: { signedUrl } } = await supabase.storage
    .from('documents')
    .createSignedUrl(fileName, 3600) // 1 hour expiry
  
  // Save to database
  const { data, error } = await supabase
    .from('documents')
    .insert({
      ...metadata,
      user_id: user.id,
      file_name: file.name,
      storage_path: fileName,
      url: signedUrl,
      file_size: file.size,
      mime_type: file.type
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

### Get Documents

```typescript
const getDocuments = async (filters?: {
  listing_id?: string
  client_id?: string
  document_type?: string
}) => {
  let query = supabase
    .from('documents')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (filters?.listing_id) {
    query = query.eq('listing_id', filters.listing_id)
  }
  if (filters?.client_id) {
    query = query.eq('client_id', filters.client_id)
  }
  if (filters?.document_type) {
    query = query.eq('document_type', filters.document_type)
  }
  
  const { data, error } = await query
  if (error) throw error
  return data
}
```

## Compliance

### Get Compliance Tasks for Listing

```typescript
const getComplianceTasks = async (listingId: string) => {
  const { data, error } = await supabase
    .from('compliance_tasks')
    .select(`
      *,
      compliance_templates (*)
    `)
    .eq('listing_id', listingId)
    .order('due_date', { ascending: true })
  
  if (error) throw error
  return data
}
```

### Create Compliance Task

```typescript
const createComplianceTask = async (
  listingId: string,
  taskData: {
    title: string
    description?: string
    template_id?: string
    due_date?: string
    priority?: 'low' | 'medium' | 'high' | 'urgent'
  }
) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  
  const { data, error } = await supabase
    .from('compliance_tasks')
    .insert({
      ...taskData,
      listing_id: listingId,
      user_id: user.id,
      status: 'pending'
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

### Complete Compliance Task

```typescript
const completeComplianceTask = async (taskId: string) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  
  const { data, error } = await supabase
    .from('compliance_tasks')
    .update({
      status: 'complete',
      completed_date: new Date().toISOString().split('T')[0],
      completed_by: user.id
    })
    .eq('id', taskId)
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

### Get Compliance Templates by State

```typescript
const getComplianceTemplates = async (state: string) => {
  const { data, error } = await supabase
    .from('compliance_templates')
    .select('*')
    .eq('state', state)
    .order('category', { ascending: true })
  
  if (error) throw error
  return data
}
```

## Tasks

### Create Task

```typescript
const createTask = async (taskData: {
  title: string
  description?: string
  listing_id?: string
  client_id?: string
  due_date?: string
  priority?: 'low' | 'medium' | 'high' | 'urgent'
}) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  
  const { data, error } = await supabase
    .from('tasks')
    .insert({
      ...taskData,
      user_id: user.id,
      status: 'pending'
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

### Get Tasks

```typescript
const getTasks = async (filters?: {
  status?: string
  priority?: string
  listing_id?: string
  client_id?: string
}) => {
  let query = supabase
    .from('tasks')
    .select('*')
    .order('due_date', { ascending: true, nullsLast: true })
  
  if (filters?.status) {
    query = query.eq('status', filters.status)
  }
  if (filters?.priority) {
    query = query.eq('priority', filters.priority)
  }
  if (filters?.listing_id) {
    query = query.eq('listing_id', filters.listing_id)
  }
  if (filters?.client_id) {
    query = query.eq('client_id', filters.client_id)
  }
  
  const { data, error } = await query
  if (error) throw error
  return data
}
```

## Marketing Content

### Generate and Save AI Content

```typescript
const saveMarketingContent = async (
  listingId: string,
  contentData: {
    content_type: 'description' | 'photo_caption' | 'social_post' | 'email'
    content: string
    platform?: string
    tone?: string
    length?: string
  }
) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  
  const { data, error } = await supabase
    .from('marketing_content')
    .insert({
      ...contentData,
      listing_id: listingId,
      user_id: user.id,
      status: 'draft'
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

### Apply Description to Listing

```typescript
const applyDescriptionToListing = async (
  listingId: string,
  contentId: string
) => {
  // Get the content
  const { data: content, error: contentError } = await supabase
    .from('marketing_content')
    .select('content')
    .eq('id', contentId)
    .single()
  
  if (contentError) throw contentError
  
  // Update listing
  const { data, error } = await supabase
    .from('listings')
    .update({
      description: content.content,
      ai_description: content.content
    })
    .eq('id', listingId)
    .select()
    .single()
  
  if (error) throw error
  
  // Mark content as applied
  await supabase
    .from('marketing_content')
    .update({
      is_applied_to_listing: true,
      status: 'approved'
    })
    .eq('id', contentId)
  
  return data
}
```

## Notifications

### Get Notifications

```typescript
const getNotifications = async (unreadOnly: boolean = false) => {
  let query = supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)
  
  if (unreadOnly) {
    query = query.eq('is_read', false)
  }
  
  const { data, error } = await query
  if (error) throw error
  return data
}
```

### Mark Notification as Read

```typescript
const markNotificationAsRead = async (notificationId: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .update({
      is_read: true,
      read_at: new Date().toISOString()
    })
    .eq('id', notificationId)
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

### Mark All Notifications as Read

```typescript
const markAllNotificationsAsRead = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  
  const { data, error } = await supabase
    .from('notifications')
    .update({
      is_read: true,
      read_at: new Date().toISOString()
    })
    .eq('user_id', user.id)
    .eq('is_read', false)
    .select()
  
  if (error) throw error
  return data
}
```

## Storage

### Generate Marketing Material URLs

```typescript
// Generate long-lived signed URLs for marketing materials (flyers, social posts, etc.)
// These URLs can be embedded in marketing materials that need to stay accessible
const getMarketingPhotoUrl = async (
  storagePath: string,
  expiresIn: number = 31536000 // 1 year for marketing materials
) => {
  const { data, error } = await supabase.storage
    .from('listing-photos')
    .createSignedUrl(storagePath, expiresIn)
  
  if (error) throw error
  return data.signedUrl
}

// Get primary photo for a listing (for marketing use)
const getListingPrimaryPhotoForMarketing = async (listingId: string) => {
  // Get primary photo
  const { data: photo, error } = await supabase
    .from('listing_photos')
    .select('storage_path')
    .eq('listing_id', listingId)
    .eq('is_primary', true)
    .single()
  
  if (error) throw error
  
  // Generate long-lived signed URL for marketing
  const { data: { signedUrl } } = await supabase.storage
    .from('listing-photos')
    .createSignedUrl(photo.storage_path, 31536000) // 1 year
  
  return signedUrl
}
```

### Delete File from Storage

```typescript
const deleteFile = async (bucket: string, path: string) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .remove([path])
  
  if (error) throw error
  return data
}
```

### Get Signed URL (for private files)

```typescript
const getSignedUrl = async (bucket: string, path: string, expiresIn: number = 3600) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn)
  
  if (error) throw error
  return data.signedUrl
}
```

## Real-time Subscriptions

### Subscribe to Notifications

```typescript
const subscribeToNotifications = (callback: (notification: any) => void) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  
  const subscription = supabase
    .channel('notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${user.id}`
      },
      (payload) => {
        callback(payload.new)
      }
    )
    .subscribe()
  
  return subscription
}
```

### Subscribe to Listing Updates

```typescript
const subscribeToListing = (
  listingId: string,
  callback: (listing: any) => void
) => {
  const subscription = supabase
    .channel(`listing:${listingId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'listings',
        filter: `id=eq.${listingId}`
      },
      (payload) => {
        callback(payload.new)
      }
    )
    .subscribe()
  
  return subscription
}
```

## Helper Functions

### Get Listing Completion Percentage

```typescript
const getListingCompletion = async (listingId: string) => {
  const { data, error } = await supabase.rpc('get_listing_completion', {
    listing_uuid: listingId
  })
  
  if (error) throw error
  return data
}
```

### Get Compliance Completion Percentage

```typescript
const getComplianceCompletion = async (listingId: string) => {
  const { data, error } = await supabase.rpc('get_compliance_completion', {
    listing_uuid: listingId
  })
  
  if (error) throw error
  return data
}
```

## Error Handling

### Example with Error Handling

```typescript
const safeQuery = async <T>(
  queryFn: () => Promise<{ data: T | null; error: any }>
): Promise<T> => {
  try {
    const { data, error } = await queryFn()
    
    if (error) {
      console.error('Supabase error:', error)
      throw new Error(error.message || 'An error occurred')
    }
    
    if (!data) {
      throw new Error('No data returned')
    }
    
    return data
  } catch (error) {
    console.error('Query error:', error)
    throw error
  }
}

// Usage
const listing = await safeQuery(() =>
  supabase
    .from('listings')
    .select('*')
    .eq('id', listingId)
    .single()
)
```

---

**Note**: Remember to handle authentication state and errors appropriately in your application. These examples assume you're using the Supabase client configured with your project credentials.

