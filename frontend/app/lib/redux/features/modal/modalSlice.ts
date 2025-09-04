import { useAppSelector } from "@/app/hooks/redux";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type modalState = {
  isDeleteModalOpen: boolean;
  isAddTaskModalOpen: boolean;
};

const initialState: modalState = {
  isDeleteModalOpen: false,
  isAddTaskModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.isDeleteModalOpen = action.payload;
    },
    setOpenAddTaskModal: (state, action: PayloadAction<boolean>) => {
      state.isAddTaskModalOpen = action.payload;
    },
  },
});

export const useModal = () => useAppSelector((state) => state.modal);

export const { setOpenDeleteModal, setOpenAddTaskModal } = modalSlice.actions;
export default modalSlice.reducer;
