import { Search } from "@mui/icons-material";
import { Card, InputAdornment, Paper, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Receipt } from "../../types/Receipt";
import Nav from "../Nav";
import "./style.scss";

const Browse = ({
  setPage,
}: {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/receipts")
      .then((res) => setReceipts(res.data.receipts))
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Nav title="Browse" goHome setPage={setPage} />
      <Paper className="tab" sx={{ boxShadow: "none" }}>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search sx={{ cursor: "pointer" }} />
              </InputAdornment>
            ),
          }}
        />
        {receipts.map((r) => (
          <Card key={r.id} className="receipt">
            <p>
              Well {`${r.total}`} and {`${r.date}`} and {`${r.category}`} and {`${r.vendor}`}.
            </p>
          </Card>
        ))}
      </Paper>
    </>
  );
};

export default Browse;
