import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Running in Phase 1 (read-only) mode.');
}

// Create Supabase client (only if credentials available)
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
      db: {
        schema: 'public',
      },
      realtime: {
        enabled: true,
      },
    })
  : null;

/**
 * Check if Supabase is configured
 * @returns {boolean}
 */
export function isSupabaseConfigured() {
  return supabase !== null;
}

// ============================================================================
// Authentication API
// ============================================================================

export const auth = {
  /**
   * Sign up new user
   * @param {string} email
   * @param {string} password
   * @param {object} metadata - Additional user metadata
   */
  async signUp(email, password, metadata = {}) {
    if (!supabase) throw new Error('Supabase not configured');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });

    if (error) throw error;
    return data;
  },

  /**
   * Sign in existing user
   * @param {string} email
   * @param {string} password
   */
  async signIn(email, password) {
    if (!supabase) throw new Error('Supabase not configured');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  /**
   * Sign out current user
   */
  async signOut() {
    if (!supabase) throw new Error('Supabase not configured');

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Get current session
   */
  async getSession() {
    if (!supabase) return null;

    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  /**
   * Get current user
   */
  async getUser() {
    if (!supabase) return null;

    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },

  /**
   * Listen to auth state changes
   * @param {function} callback
   */
  onAuthStateChange(callback) {
    if (!supabase) return () => {};

    const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
    return () => subscription.unsubscribe();
  },

  /**
   * Reset password
   * @param {string} email
   */
  async resetPassword(email) {
    if (!supabase) throw new Error('Supabase not configured');

    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  },

  /**
   * Update password
   * @param {string} newPassword
   */
  async updatePassword(newPassword) {
    if (!supabase) throw new Error('Supabase not configured');

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
  },
};

// ============================================================================
// Database API
// ============================================================================

export const db = {
  /**
   * Registrations table operations
   */
  registrations: {
    /**
     * Get all registrations
     * @param {object} filters - Optional filters
     */
    async getAll(filters = {}) {
      if (!supabase) throw new Error('Supabase not configured');

      let query = supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.sheetName) {
        query = query.eq('sheet_name', filters.sheetName);
      }

      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      if (filters.department) {
        query = query.eq('department', filters.department);
      }

      if (filters.search) {
        query = query.or(`trade_name.ilike.%${filters.search}%,registration_number.ilike.%${filters.search}%,chemical_name.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },

    /**
     * Get registration by ID
     * @param {string} id
     */
    async getById(id) {
      if (!supabase) throw new Error('Supabase not configured');

      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },

    /**
     * Create new registration
     * @param {object} registration
     */
    async create(registration) {
      if (!supabase) throw new Error('Supabase not configured');

      const { data, error } = await supabase
        .from('registrations')
        .insert([registration])
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    /**
     * Update registration
     * @param {string} id
     * @param {object} updates
     */
    async update(id, updates) {
      if (!supabase) throw new Error('Supabase not configured');

      const { data, error } = await supabase
        .from('registrations')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    /**
     * Delete registration
     * @param {string} id
     */
    async delete(id) {
      if (!supabase) throw new Error('Supabase not configured');

      const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },

    /**
     * Bulk create registrations
     * @param {array} registrations
     */
    async bulkCreate(registrations) {
      if (!supabase) throw new Error('Supabase not configured');

      const { data, error } = await supabase
        .from('registrations')
        .insert(registrations)
        .select();

      if (error) throw error;
      return data;
    },

    /**
     * Subscribe to changes
     * @param {function} callback
     */
    subscribe(callback) {
      if (!supabase) return () => {};

      const subscription = supabase
        .channel('registrations-changes')
        .on('postgres_changes',
          { event: '*', schema: 'public', table: 'registrations' },
          callback
        )
        .subscribe();

      return () => subscription.unsubscribe();
    },
  },

  /**
   * Sheets metadata operations
   */
  sheetsMetadata: {
    async getAll() {
      if (!supabase) throw new Error('Supabase not configured');

      const { data, error } = await supabase
        .from('sheets_metadata')
        .select('*')
        .eq('is_enabled', true);

      if (error) throw error;
      return data;
    },

    async updateRowCount(name, count) {
      if (!supabase) throw new Error('Supabase not configured');

      const { error } = await supabase
        .from('sheets_metadata')
        .upsert({
          name,
          row_count: count,
          last_synced: new Date().toISOString(),
        });

      if (error) throw error;
    },
  },

  /**
   * Sync queue operations
   */
  syncQueue: {
    async add(action, tableName, recordId, data) {
      if (!supabase) throw new Error('Supabase not configured');

      const { data: result, error } = await supabase
        .from('sync_queue')
        .insert([{
          action,
          table_name: tableName,
          record_id: recordId,
          data,
        }])
        .select()
        .single();

      if (error) throw error;
      return result;
    },

    async getPending() {
      if (!supabase) throw new Error('Supabase not configured');

      const { data, error } = await supabase
        .from('sync_queue')
        .select('*')
        .eq('synced', false)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    },

    async markSynced(id) {
      if (!supabase) throw new Error('Supabase not configured');

      const { error } = await supabase
        .from('sync_queue')
        .update({ synced: true, synced_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
    },
  },

  /**
   * User preferences operations
   */
  userPreferences: {
    async get() {
      if (!supabase) throw new Error('Supabase not configured');

      const user = await auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
      return data;
    },

    async update(preferences) {
      if (!supabase) throw new Error('Supabase not configured');

      const user = await auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          ...preferences,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },

  /**
   * Audit log operations
   */
  auditLog: {
    async log(tableName, recordId, action, oldData, newData) {
      if (!supabase) throw new Error('Supabase not configured');

      const { error } = await supabase
        .from('audit_log')
        .insert([{
          table_name: tableName,
          record_id: recordId,
          action,
          old_data: oldData,
          new_data: newData,
        }]);

      if (error) console.error('Audit log error:', error);
    },

    async getForRecord(tableName, recordId) {
      if (!supabase) throw new Error('Supabase not configured');

      const { data, error } = await supabase
        .from('audit_log')
        .select('*')
        .eq('table_name', tableName)
        .eq('record_id', recordId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  },
};

// Export default
export default supabase;
