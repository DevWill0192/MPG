export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  role?: string;
  createdAt?: Date;
  lastLogin?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  expiresAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface MyTemplateContext {
  $implicit: number;
  index: number;
  setActiveTab: (index: number) => void;
  tabs: string[];
}


export interface EntryData {
  data?: {
    volumen_meta_mes_cartones?: number;
    volumen_meta_mes_hectolitros?: number;
    volumen_avance_actual_cartones?: number;
    volumen_avance_actual_hectolitros?: number;
    volumen_retornable_meta_mes_cartones?: number;
    volumen_retornable_meta_mes_hectolitros?: number;
    volumen_retornable_avance_actual_cartones?: number;
    volumen_retornable_avance_actual_hectolitros?: number;
    above_core_avance_actual_cartones?: number;
    above_core_avance_actual_hectolitros?: number;
    beyond_beer_avance_actual_cartones?: number;
    beyond_beer_avance_actual_hectolitros?: number;
    beyond_beer_meta_mes_cartones?: number;
    beyond_beer_meta_mes_hectolitros?: number;
    marketplace_meta?: number;
    marketplace_avance?: number;
  };
}
