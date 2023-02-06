import Paper from "@mui/material/Paper";
import { FormAddPost } from "../components/Forms/AddPost";

const AddPost = () => {
  return (
    <Paper
      sx={{
        mb: "20px",
        padding: {
          sm: "30px",
          xs: "15px",
        },
      }}
    >
      <FormAddPost />
    </Paper>
  );
};
export default AddPost;
