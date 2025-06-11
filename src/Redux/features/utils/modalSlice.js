import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modals: {
      createAcademicYear: { isOpen: false },
      editAcademicYear: { isOpen: false },
      createCourse: { isOpen: false },
      editCourse: { isOpen: false },
      createBatch: { isOpen: false },
      editBatch: { isOpen: false },
      selectApplicationFormTemplate: { isOpen: false },
      // registrationCourse: { isOpen: false },
    },
  },
  reducers: {
    openModal: (state, action) => {
      const { modalType, payload } = action.payload;
      state.modals[modalType].isOpen = true;
      if (payload) {
        // Optional: Pass additional data to the modal (e.g., campusId for edit modal)
        state.modals[modalType] = { ...state.modals[modalType], ...payload };
      }
    },
    closeModal: (state, action) => {
      const { modalType } = action.payload;
      state.modals[modalType].isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
