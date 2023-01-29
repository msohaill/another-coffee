import { AddBoxRounded, QueryStats, Receipt } from "@mui/icons-material";
import { Button } from "@mui/material";
import "./style.scss";

const Switcher = () => {
  return (
    <div id="switcher">
      <Button className="switcher-button">
        <Receipt/>
        <p>Browse</p>
      </Button>
      <input
        id="receipt-upload"
        type="file"
        accept="image/*"
        multiple={false}
        hidden
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
