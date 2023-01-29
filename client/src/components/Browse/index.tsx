import { ExpandMore, Search } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Category } from "../../types/enums/Category";
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
      .get("http://192.168.0.18:8000/receipts")
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
          <Accordion key={r.id} className="receipt">
            <AccordionSummary expandIcon={<ExpandMore />}>
              {r.vendor} {new Date(r.date).toLocaleDateString()}. Total:{" "}
              {r.total}
            </AccordionSummary>
            <AccordionDetails>
              <Chip label={Category[r.category]} color='primary' />
              {r.items.map(i =>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
                  <p>{i.name}</p>
                  <p>${i.price.toFixed(2)}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <p style={{ fontSize: 8 }}>Tags:</p>
                  <Chip label={i.tag} sx={{ fontSize: 8 } } variant="outlined"/>
                </div>
              </div>)}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', borderTop: '1px dashed black', marginTop: 20 }}>
                  <p>Subtotal</p>
                  <p>${ r.items.reduce((prev, r) => prev + r.price, 0).toFixed(2) }</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
                  <p>Tax</p>
                  <p>${ r.tax.toFixed(2) }</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
                  <p>Total</p>
                  <p>${ r.total.toFixed(2) }</p>
              </div>
              </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </>
  );
};

export default Browse;
