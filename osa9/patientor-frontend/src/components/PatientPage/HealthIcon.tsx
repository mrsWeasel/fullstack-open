import { HealthCheckRating } from "../../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { assertNever } from "../../utils";

const HealthIcon: React.FC<{ rating: HealthCheckRating }> = ({
  rating,
}): React.ReactNode => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon style={{ color: "green" }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon style={{ color: "gold" }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon style={{ color: "orange" }} />;
    case HealthCheckRating.CriticalRisk:
      return <FavoriteIcon style={{ color: "red" }} />;
    default:
      assertNever(rating);
  }
};

export default HealthIcon;
