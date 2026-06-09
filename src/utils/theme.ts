export type ThemeState = {
    backgroundColor: string
    accentColor: string
    primaryTextColor: string
    secondaryTextColor: string
    grainOpacity: number
    sparkleOpacity: number
    textTextureOpacity: number
}

export const lightTheme: ThemeState = {
    backgroundColor: '#f5f5f5',
    accentColor: '#a2ff00',
    primaryTextColor: '#000000',
    secondaryTextColor: '#000000',
    grainOpacity: 0.9,
    sparkleOpacity: 0.08,
    textTextureOpacity: 0.71,
}

export const darkTheme: ThemeState = {
    backgroundColor: '#343434',
    accentColor: '#a2ff00',
    primaryTextColor: '#ffffff',
    secondaryTextColor: '#aaaaaa',
    grainOpacity: 0.9,
    sparkleOpacity: 0.08,
    textTextureOpacity: 0.71,
}
