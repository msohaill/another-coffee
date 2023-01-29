import { AddBoxRounded, QueryStats, ReceiptLong } from "@mui/icons-material";
import { Button } from "@mui/material";
import "./style.scss";

const Switcher = ({ submission, setFile }: { submission: React.Dispatch<React.SetStateAction<boolean>>, setFile: React.Dispatch<React.SetStateAction<File>> }) => {
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    setFile(e.target.files[0]);
    e.target.value = '';
    submission(true);
  };

  return (
    <div id="switcher">
      <Button className="switcher-button">
        <ReceiptLong/>
        <p>Browse</p>
      </Button>
      <input
        id="receipt-upload"
        type="file"
        accept="image/*"
        multiple={false}
        hidden
        onChange={uploadImage}
      />
      <Button>
        <label id="receipt-upload-label" htmlFor="receipt-upload">
          <AddBoxRounded
            color="primary"
            style={{ fontSize: 50, cursor: "pointer" }}
          />
        </label>
      </Button>
      <Button className="switcher-button">
        <QueryStats />
        <p>Insights</p>
      </Button>
    </div>
  );
};

export default Switcher;
