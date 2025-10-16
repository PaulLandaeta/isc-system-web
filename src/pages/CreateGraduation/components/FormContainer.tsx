import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
interface FormContainerProps {
  children: React.ReactNode;
}

export const FormContainer: React.FC<FormContainerProps> = ({ children }) => (
  <Container fixed>
    <Card sx={{ maxWidth: 800 }}>
      <CardContent>{children}</CardContent>
    </Card>
  </Container>
);
