import { createSlice } from '@reduxjs/toolkit';

const defaultSettings = {
  schoolLogo: "/Techvein_logo.png",
  schoolName: "Admin Portal",
  heading: "Effortless Control, Powerful Management.",
  motto: "All-in-One Tool",
  quote: "Welcome to the central hub for managing your Campus & School Management ERP solution. Streamline administration, improve efficiency, and stay organized — all from one place.",
  motto2: "Log in to take full control of your ERP ecosystem.",
  quote2: "Built on a robust AWS microservices architecture, this portal empowers SSAS administrators with seamless access to configure, monitor, and support tenant environments in real time.",
  theme: "indigo",
  darkMode: false,
  rtlMode: false,
  fontFamily: "Mulish, sans-serif",
  dynamicFont: {
    fontUrl: "",
    fontLink: ""
  },
  showRadius: true,
  showShadow: false,
  dynamicColors: {
    primary: { r: 99, g: 102, b: 241, a: 1 },
    secondary: { r: 128, g: 129, b: 145, a: 1 },
    bodyColor: { r: 22, g: 22, b: 30, a: 1 },
    cardColor: { r: 28, g: 28, b: 39, a: 1 },
    borderColor: { r: 45, g: 45, b: 60, a: 1 },
    chartColor1: { r: 99, g: 102, b: 241, a: 1 },
    chartColor2: { r: 14, g: 165, b: 233, a: 1 },
    chartColor3: { r: 22, g: 163, b: 74, a: 1 },
    chartColor4: { r: 234, g: 88, b: 12, a: 1 },
    chartColor5: { r: 244, g: 63, b: 94, a: 1 }
  },
  loading: false,
  error: null
};

export const customizationSlice = createSlice({
  name: 'customization',
  initialState: defaultSettings,
  reducers: {
    fetchCustomizationRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCustomizationSuccess: (state, action) => {
      return { ...state, ...action.payload, loading: false, error: null };
    },
    fetchCustomizationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    postCustomizationRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    postCustomizationSuccess: (state, action) => {
      return { ...state, ...action.payload, loading: false, error: null };
    },
    postCustomizationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetCustomization: () => {
      return defaultSettings;
    },
    // Other specific actions remain the same
    setSchoolLogo: (state, action) => {
      state.schoolLogo = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleRtlMode: (state) => {
      state.rtlMode = !state.rtlMode;
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    },
    setDynamicFont: (state, action) => {
      state.dynamicFont = action.payload;
    },
    toggleRadius: (state) => {
      state.showRadius = !state.showRadius;
    },
    toggleShadow: (state) => {
      state.showShadow = !state.showShadow;
    },
    setDynamicColors: (state, action) => {
      state.dynamicColors = action.payload;
    },
  },
});

export const {
  fetchCustomizationRequest,
  fetchCustomizationSuccess,
  fetchCustomizationFailure,
  postCustomizationRequest,
  postCustomizationSuccess,
  postCustomizationFailure,
  resetCustomization,
  setSchoolLogo,
  setTheme,
  toggleDarkMode,
  toggleRtlMode,
  setFontFamily,
  setDynamicFont,
  toggleRadius,
  toggleShadow,
  setDynamicColors
} = customizationSlice.actions;

export default customizationSlice.reducer;


// curl --location 'https://api.testmazing.com/utils/realmSettings/download' \
// --header 'Content-Type: application/json' \
// --data '{
//     "realmName": "master"
// }'

// curl --location 'https://api.testmazing.com/utils/realmSettings/upload' \
// --header 'Content-Type: application/json' \
// --header 'Authorization: Bearer <token>’ \
// --data '{
//     "username": "erp-admin",
//     "clientId": "admin-cli",
//     "realmName": "master"
// }'

