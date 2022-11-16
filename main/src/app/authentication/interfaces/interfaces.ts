export interface AuthResponse{
    message: string;
    status: boolean;
    token?: string;
    usuario?: string;
    correo?: string;
    id?: string;
}

export interface Usuario{
    usuario: string;
    
}