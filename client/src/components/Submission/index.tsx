import Compressor from "compressorjs";
import { Box, Button, MenuItem, Modal, Select } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { Category } from "../../types/enums/Category";

const Submission = ({
  open,
  setOpen,
  file,
  setFile
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  file: File;
  setFile: React.Dispatch<React.SetStateAction<File>>
}) => {
  const [category, setCategory] = useState(Category[Category.Grocery]);

  const upload = () => {
    setOpen(false);

    new Compressor(file, {
      quality: 0.2,
      success: (res) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          axios.post(
            "http://localhost:8000/upload",
            { receipt: reader.result, category: Category[category as keyof typeof Category] },
            { headers: { "Content-Type": "application/json" } }
          ).then(res => res.status === 200 && setFile(new File([], 'X')) );
        };

        reader.readAsDataURL(res);
      },
    });
  };

  return (
    <Modal open={open}>
      <Box className="submission">
      <Select
          value={category as any}
          label="Age"
          onChange={(e) => setCategory(e.target.value)}
        >
          { Object.keys(Category).filter(item => isNaN(Number(item))).map(c => <MenuItem key={c} value={c}>{c}</MenuItem> ) }
        </Select>
        <Button onClick={upload}>Submit</Button>
      </Box>
    </Modal>
  );
};

export default Submission;
