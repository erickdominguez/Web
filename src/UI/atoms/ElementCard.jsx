import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { styled } from '@mui/material/styles';

const CardContentNoPadding = styled(CardContent)(`
  padding: 8px;
  &:last-child {
    padding-bottom: 8px;
  }
`);

export default function PlaylistCard(props) {
  return (
    <Card sx={{ Width: 100 }}>
      <CardMedia component='img' image={props.img} alt='Album cover' />
      <CardContentNoPadding>
        <Typography sx={{ fontSize: 14 }} color='text.primary' gutterBottom>
          {props.title}
        </Typography>
        <Typography variant='h5' component='div'></Typography>
        <Typography sx={{ mb: 1 }} color='text.secondary'>
          {props.subtitle}
        </Typography>
        <CardActions sx={{ padding: 0 }}>
          <IconButton aria-label='play'>
            <PlayCircleIcon />
          </IconButton>
        </CardActions>
      </CardContentNoPadding>
    </Card>
  );
}
