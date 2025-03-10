export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      candidates: {
        Row: {
          id: number
          name: string
          email: string
          phone: string
          skills: string[]
          experience: number
          created_at: string
          user_id: string | null
        }
        Insert: {
          id?: number
          name: string
          email: string
          phone: string
          skills: string[]
          experience: number
          created_at?: string
          user_id?: string | null
        }
        Update: {
          id?: number
          name?: string
          email?: string
          phone?: string
          skills?: string[]
          experience?: number
          created_at?: string
          user_id?: string | null
        }
      }
    }
  }
}