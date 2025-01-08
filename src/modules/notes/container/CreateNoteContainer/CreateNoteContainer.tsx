import { queryClient } from "../../../../common/config/queryClient/queryClient";
import { useToast } from "../../../../common/hooks/useToast/useToast";
import { CreateNoteForm } from "../../forms/CreateNoteForm/CreateNoteForm";
import { useCreateNote } from "../../hooks/mutations/useCreateNote/useCreateNote";
import { CreateNoteDTO } from "../../models/CreateNoteDTO/CreateNoteDTO";

export const CreateNoteContainer = () => {
  const { mutate: createNote } = useCreateNote();
  const { openToast } = useToast();
  const handleSubmit = (data: CreateNoteDTO) => {
    createNote(data, {
      onSuccess: () => {
        queryClient.invalidateQueries();
        openToast({
          variant: "success",
          message: "Note created",
        });
      },
      onError: (error) => {
        openToast({
          variant: "danger",
          message: error.message,
        });
      },
    });
  };
  return <CreateNoteForm onSubmit={handleSubmit} />;
};
