// authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Reemplaza esta función por tu llamada real para obtener el token desde la API.
// Debe devolver { token: string, expiresInSeconds?: number } o lanzar un error.
async function fetchTokenFromApi(): Promise<{ token: string; expiresInSeconds?: number }> {
  const url = 'https://enviomensajes.coovitel.coop/recaudos-tunja/authenticateRecaudos/';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authentication': 'Token a149d94898679b9fb72e0928a92270ba084142fe'
      },
    });

    // Si se logró contactar al servidor pero no está OK
    if (!res.ok) {
      throw new Error(`Error HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    return { token: data.access_token, expiresInSeconds: data.expires_in ?? 20 * 60 };

  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('Error de red o CORS:', error);
    } else {
      console.error('Error al obtener token:', error);
    }
    throw { token: "", expiresInSeconds: 0}; // lo re-lanzas si quieres que se maneje en otro lado
  }
}

type AuthState = {
  token: string | null;
  expiresAt: number; // timestamp ms
  _fetchPromise: Promise<string > | null;

  // actions
  setToken: ( token: string, ttlSeconds?: number) => void;
  clearToken: () => void;
  fetchNewToken: () => Promise<string>;
  ensureToken: (opts?: { refreshLeewaySeconds?: number }) => Promise<string>; // devuelve token válido
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      expiresAt: 0,
      _fetchPromise: null,

      setToken: (token, ttlSeconds = 20 * 60) => {
        const expiresAt = Date.now() + ttlSeconds * 1000;
        set({ token, expiresAt });
      },

      clearToken: () => {
        set({ token: null, expiresAt: 0 });
      },

      fetchNewToken: async (): Promise<string> => {
        // Si ya hay una petición en curso, devolverla (ya debe ser Promise<string>)
        const ongoing = get()._fetchPromise;
        if (ongoing) return ongoing;

        // Creamos la promesa y forzamos su tipo a Promise<string>
        const p: Promise<string> = (async (): Promise<string> => {
          try {
            const { token, expiresInSeconds } = await fetchTokenFromApi();
            console.log(token, expiresInSeconds)

            // Validación estricta: si no viene token, lanzamos error
            if (!token || typeof token !== 'string') {
              throw new Error('Token inválido recibido de la API');
            }

            // Guardamos token en el store (ttl en segundos)
            get().setToken(token, expiresInSeconds ?? 20 * 60);

            return token;
          } finally {
            // Limpiamos el marcador de petición en curso siempre
            set({ _fetchPromise: null });
          }
        })();

        // Guardamos la promesa en el store mientras esté en curso
        set({ _fetchPromise: p });

        return p;
      },

      /**
       * Garantiza un token válido:
       * - Si el token existe y no está cerca a expirar lo devuelve.
       * - Si no existe o está por expirar, llama a fetchNewToken.
       * refreshLeewaySeconds: margen antes de expiración para renovar (p.ej. 30s)
       */
    ensureToken: async ({ refreshLeewaySeconds = 28 }: { refreshLeewaySeconds?: number } = {}) => {
      const token = get().token;
      const expiresAt = get().expiresAt;

      // Si tenemos token y no está en el margen de renovación
      if (token && Date.now() < expiresAt - refreshLeewaySeconds * 60) {
        return token;
      }

      // Si no, pedir nuevo
      return await get().fetchNewToken();
    },
    }),
    {
      name: 'auth-storage', // key en localStorage
      // opcional: puedes añadir `serialize`/`deserialize` o `partialize` si quieres guardar menos campos
    }
  )
);
