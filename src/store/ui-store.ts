import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStore {
    soundEnabled: boolean;
    reducedMotion: boolean;
    cursorVariant: 'default' | 'hover' | 'click';

    toggleSound: () => void;
    setReducedMotion: (enabled: boolean) => void;
    setCursorVariant: (variant: UIStore['cursorVariant']) => void;
}

export const useUIStore = create<UIStore>()(
    persist(
        (set) => ({
            soundEnabled: false,
            reducedMotion: false,
            cursorVariant: 'default',

            toggleSound: () => set((state) => ({
                soundEnabled: !state.soundEnabled
            })),
            setReducedMotion: (reducedMotion) => set({ reducedMotion }),
            setCursorVariant: (cursorVariant) => set({ cursorVariant })
        }),
        { name: 'ui-preferences' }
    )
);
