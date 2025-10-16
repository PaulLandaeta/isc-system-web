import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
interface PropsCertification {
  certification: {
    title: string;
    description: string;
    image: string;
  };
}

const CertiCard: FC<PropsCertification> = ({ certification }) => {
  const { title, description, image } = certification;
  // destructuracion de arrays
  // vector = ['Paul', 22, 'UPB', 'Juancito]
  // vector[0] = > 'Paul' -> name1 = vector[0];
  // vector[3] => 'Juancito' -> name2 = vector[3];
  // const [name1,,,name2]
  // console.log(name1)-> Paul
  const [studentNumber, setStudentNumber] = useState(0);
  const [enroll, setEnroll] = useState(false);
  const registrarse = () => {
    if (!enroll) {
      setStudentNumber(studentNumber + 1);
    }
    setEnroll(true);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={image} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button onClick={registrarse} size="small">
          {enroll ? "Registrado" : "Registrarse"}
        </Button>
        <Typography>Estudiantes {studentNumber}</Typography>
      </CardActions>
    </Card>
  );
};
export default CertiCard;
