export interface IPaletteColors {
  primary: string;
  secondary: string;
  disabled: string;
}

export interface IThemePalette extends IPaletteColors {
  text: IPaletteColors,
}

export interface IThemeShape {
  borderRadius: string;
  borderWidth: string;
}

export interface ITheme {
  palette: IThemePalette;
  shape: IThemeShape;
}

const DefaultTheme = <ITheme>{
  palette: {
    primary: '#070707',
    secondary: '#d3d3d3',
    disabled: 'grey',
    text: {
      primary: '#070707',
      secondary: '#d3d3d3',
      disabled: 'grey',
    },
  },
  shape: {
    borderRadius: '0.3rem',
    borderWidth: '0.12rem',
  },
};

export default DefaultTheme;
