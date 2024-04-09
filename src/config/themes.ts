import { StatusBarStyle } from "expo-status-bar";

export interface Theme {
    background: string;
    foreground: string;
    text: string;
    placeholder: string;
    icon: string;
    statusBar: StatusBarStyle;
};
  
export const lightTheme: Theme = {
  background: '#DDDDDD',
  foreground: '#FFFFFF',
  text: '#000000',
  placeholder: '#999999',
  icon: '#888888',
  statusBar: "dark"
};

export const darkTheme: Theme = {
  background: '#000000',
  foreground: '#252525',
  text: '#FFFFFF',
  placeholder: '#999999',
  icon: '#888888',
  statusBar: "light"
};