import { useAppSelector } from "@/app/hooks/redux";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type modalState = {
  isDeleteModalOpen: boolean;
  isTaskModalOpen: boolean;
};

const initialState: modalState = {
  isDeleteModalOpen: false,
  isTaskModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.isDeleteModalOpen = action.payload;
    },
    setOpenTaskModal: (state, action: PayloadAction<boolean>) => {
      state.isTaskModalOpen = action.payload;
    },
  },
});

export const useModal = () => useAppSelector((state) => state.modal);

export const { setOpenDeleteModal, setOpenTaskModal } = modalSlice.actions;
export default modalSlice.reducer;
