import { profile_av } from '@/assets/images';
import { createSlice } from '@reduxjs/toolkit';

const defaultSettings = {
  schoolLogo: profile_av,
  schoolName: "School Portal",
  heading: "Effortless Control, Powerful Management.",
  motto: "All-in-One Tool",
  quote: "Welcome to the central hub for managing your Campus & School Management ERP solution. Streamline administration, improve efficiency, and stay organized — all from one place.",
  motto2: "Log in to take full control of your ERP ecosystem.",
  quote2: "Built on a robust AWS microservices architecture, this portal empowers SSAS administrators with seamless access to configure, monitor, and support tenant environments in real time.",
  theme: "cyan",
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
};

const initialState = {
  customizationData: defaultSettings,
  customizationPostData: false,
  customizationResetData: false,
  loading: false,
  error: null
};

export const customizationSlice = createSlice({
  name: 'customization',
  initialState,
  reducers: {
    fetchCustomizationRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCustomizationSuccess: (state, action) => {
      const customData = action.payload;
      // console.log(customData, "customdata")
      state.customizationData = customData
        ? customData
        : defaultSettings;
      state.loading = false;
      state.error = null;
    },
    fetchCustomizationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    postCustomizationRequest: (state) => {
      state.customizationPostData = false;
      state.loading = true;
      state.error = null;
    },
    postCustomizationSuccess: (state, action) => {
      state.customizationPostData = true;
      state.loading = false;
      state.error = null;
    },
    postCustomizationFailure: (state, action) => {
      state.customizationPostData = false;
      state.loading = false;
      state.error = action.payload;
    },
    resetCustomization: (state) => {
      state.customizationData = defaultSettings;
      state.customizationResetData = true;
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
} = customizationSlice.actions;

export default customizationSlice.reducer;